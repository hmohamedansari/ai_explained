# MCP (Model Context Protocol): A Deep Dive

## Why MCP Exists

Before MCP, every AI integration was bespoke glue code:
- GitHub Copilot had its own way to call GitHub APIs
- Claude had its own bash tool
- Each agent framework reinvented the wheel

The problem: **N models × M services = N×M custom integrations.**

MCP solves this with a standard protocol: **N models + M servers = N+M things to build.**
Any MCP client (Claude, Cursor, your own agent) talks to any MCP server (GitHub, filesystem, Postgres) the same way.

---

## What MCP Is at the Protocol Level

MCP is **JSON-RPC 2.0** — a dead-simple remote procedure call protocol over JSON.

Every message is either:

```json
// Request (client → server)
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "name": "read_file", "arguments": { "path": "/etc/hosts" } }
}

// Response (server → client)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { "content": [{ "type": "text", "text": "127.0.0.1 localhost\n..." }] }
}

// Notification (either direction, no id, no response expected)
{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": { "progressToken": "abc", "progress": 50 }
}
```

No REST, no GraphQL, no custom framing. Just JSON-RPC.

---

## Transport Mechanisms

JSON-RPC needs a channel to travel over. MCP defines two primary transports:

### stdio (local)

```
Claude Code (process)
    │ stdin/stdout pipes
MCP Server (subprocess)
```

- Claude Code spawns the MCP server as a child process
- Writes JSON-RPC to the server's **stdin**, reads responses from **stdout**
- stderr is for logs only — never parsed
- Lifecycle: server lives and dies with the client process
- **Use this for**: local tools, filesystem access, running CLIs

```json
// .claude/settings.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user"]
    }
  }
}
```

### HTTP + SSE (remote)

```
Claude Code (process)
    │ HTTP POST  (client → server requests)
    │ SSE stream (server → client events)
MCP Server (remote HTTP server)
```

- Client POSTs requests to `/message`
- Server pushes responses and notifications via **Server-Sent Events** on `/sse`
- Two channels: one for sending, one for receiving
- **Use this for**: shared servers, remote infra, multi-client scenarios

> There's also a newer **Streamable HTTP** transport (MCP spec 2025-03-26) — single endpoint, bidirectional streaming over chunked HTTP. Not yet universal but worth knowing.

---

## The Connection Lifecycle

Every MCP session follows the same handshake:

```
Client                          Server
  │                               │
  │──── initialize ──────────────▶│
  │     { protocolVersion,        │
  │       capabilities,           │
  │       clientInfo }            │
  │                               │
  │◀─── initialized ──────────────│
  │     { protocolVersion,        │
  │       capabilities,           │
  │       serverInfo }            │
  │                               │
  │──── notifications/initialized▶│  (client says "ready")
  │                               │
  │  [normal operation]           │
  │                               │
  │──── ping ────────────────────▶│  (keepalive, optional)
  │◀─── pong ─────────────────────│
```

The `capabilities` exchange negotiates what features are supported:

```json
// Server capabilities example
{
  "capabilities": {
    "tools": { "listChanged": true },      // server can notify when tool list changes
    "resources": { "subscribe": true },    // clients can subscribe to resource updates
    "prompts": {},
    "logging": {}
  }
}
```

---

## What MCP Servers Expose

Three primitives. Know them cold.

### Tools — Model-controlled

The LLM decides when to call these. Equivalent to function calling in the base API.

```json
// tools/list response
{
  "tools": [{
    "name": "query_database",
    "description": "Run a read-only SQL query against the production DB",
    "inputSchema": {
      "type": "object",
      "properties": {
        "sql": { "type": "string" },
        "limit": { "type": "number", "default": 100 }
      },
      "required": ["sql"]
    }
  }]
}
```

Calling a tool:

```json
// tools/call request
{ "name": "query_database", "arguments": { "sql": "SELECT * FROM users LIMIT 5" } }

// tools/call response
{
  "content": [{ "type": "text", "text": "[{\"id\": 1, \"name\": \"Alice\"}, ...]" }],
  "isError": false
}
```

Content types can be `text`, `image` (base64), or `resource` (URI reference). Tools can return rich content, not just strings.

### Resources — Application-controlled

The host app decides what to expose. The LLM (or app) reads them like files.

```json
// resources/list response
{
  "resources": [{
    "uri": "postgres://prod/schema",
    "name": "Production DB Schema",
    "mimeType": "application/json",
    "description": "Current table definitions"
  }]
}

// resources/read request
{ "uri": "postgres://prod/schema" }

// resources/read response
{
  "contents": [{
    "uri": "postgres://prod/schema",
    "mimeType": "application/json",
    "text": "{ \"tables\": [...] }"
  }]
}
```

Resources can also be **subscribed to** — the server pushes `notifications/resources/updated` when content changes. Useful for live log tailing, file watching, dashboards.

### Prompts — User-controlled

Reusable prompt templates surfaced to the user, not auto-invoked by the LLM.

```json
// prompts/list response
{
  "prompts": [{
    "name": "code_review",
    "description": "Review code for bugs and style issues",
    "arguments": [
      { "name": "language", "required": true },
      { "name": "focus", "required": false }
    ]
  }]
}

// prompts/get request
{ "name": "code_review", "arguments": { "language": "python", "focus": "security" } }

// prompts/get response
{
  "messages": [{
    "role": "user",
    "content": { "type": "text", "text": "Review this Python code for security issues:\n\n{{code}}" }
  }]
}
```

In Claude Code, prompts from MCP servers surface as slash commands (e.g. `/code_review`).

---

## How Tool Definitions Flow Into Claude

When Claude Code starts with an MCP server configured:

```
1. Claude Code spawns/connects to MCP server
2. Sends initialize handshake
3. Calls tools/list → gets tool definitions
4. Merges these with native tools (bash, read, edit, etc.)
5. Injects ALL tool definitions into Claude's system prompt / tools array
6. User sends message → Claude sees all tools: native + MCP
7. Claude emits tool_use block with MCP tool name
8. Claude Code routes it → calls tools/call on the MCP server
9. Gets result → sends back as tool_result to Claude
10. Claude continues
```

The LLM has **no idea** whether a tool is native or MCP. It just sees tool definitions and calls them. Routing is entirely the host's problem.

---

## Building a Custom MCP Server

Two main SDKs: `@modelcontextprotocol/sdk` (TypeScript) and `mcp` (Python).

### Minimal Python MCP server (stdio)

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

app = Server("my-server")

@app.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_system_info",
            description="Get basic system information",
            inputSchema={
                "type": "object",
                "properties": {
                    "metric": {
                        "type": "string",
                        "enum": ["cpu", "memory", "disk"]
                    }
                },
                "required": ["metric"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "get_system_info":
        metric = arguments["metric"]
        if metric == "cpu":
            import psutil
            return [types.TextContent(type="text", text=f"CPU: {psutil.cpu_percent()}%")]
        elif metric == "memory":
            import psutil
            mem = psutil.virtual_memory()
            return [types.TextContent(type="text", text=f"Memory: {mem.percent}% used")]
    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

Wire it up:
```json
// .claude/settings.json
{
  "mcpServers": {
    "sysinfo": {
      "command": "python",
      "args": ["/path/to/server.py"]
    }
  }
}
```

### Minimal TypeScript MCP server (stdio)

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "echo",
    description: "Echoes input back",
    inputSchema: {
      type: "object",
      properties: { message: { type: "string" } },
      required: ["message"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "echo") {
    return {
      content: [{ type: "text", text: request.params.arguments.message }]
    };
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Error Handling

MCP has two layers of errors:

### Protocol errors — JSON-RPC level

Something went wrong with the call infrastructure:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Method not found: tools/unknown"
  }
}
```

Standard JSON-RPC error codes:
| Code | Meaning |
|---|---|
| -32700 | Parse error |
| -32600 | Invalid request |
| -32601 | Method not found |
| -32602 | Invalid params |
| -32603 | Internal error |

### Tool errors — tool ran but returned failure

```json
{
  "result": {
    "content": [{ "type": "text", "text": "Permission denied: /etc/shadow" }],
    "isError": true
  }
}
```

The distinction matters:
- **Protocol error** → infrastructure broke, LLM can't do much
- **Tool error** (`isError: true`) → tool ran, reported failure → LLM should reason about it (retry, ask user, try different approach)

---

## Security Model

MCP has no built-in auth at the protocol level — that's intentional. Security is the server's responsibility.

- **stdio servers**: trusted by definition (you spawned them, they run as your user)
- **HTTP servers**: should use OAuth 2.0 (recommended by MCP spec), API keys, or mTLS
- **Capability scoping**: servers should only expose what's needed — a git MCP server doesn't need filesystem write access
- **Human-in-the-loop**: Claude Code prompts users before calling tools with side effects
- **Roots**: a mechanism for clients to tell servers which filesystem paths/URIs are in scope, so servers can enforce boundaries

---

## The Full Flow End-to-End

```
User: "Query the prod DB and summarize the top users by activity"

Claude Code
├── sees tools: [bash, read, edit, ..., query_database (from MCP)]
│
Claude (LLM)
├── emits: tool_use { name: "query_database", input: { sql: "SELECT..." } }
│
Claude Code
├── sees tool name matches MCP server "postgres"
├── sends JSON-RPC: tools/call { name: "query_database", arguments: {...} }
│       │
│   MCP Server (postgres-mcp)
│   ├── runs query against DB
│   └── returns: { content: [{ type: "text", text: "[{...rows...}]" }] }
│
├── wraps result as tool_result
│
Claude (LLM)
├── reads rows, summarizes
└── responds to user
```

---

## Key Mental Models

| Concept | What it is |
|---|---|
| JSON-RPC | The message format — request / response / notification |
| stdio transport | Local subprocess, pipe-based, simple |
| HTTP+SSE transport | Remote server, two-channel, scalable |
| Tool | Function the LLM calls autonomously |
| Resource | Data the LLM (or app) reads |
| Prompt | Template the user invokes |
| `isError: true` | Tool ran, returned failure — LLM should reason about it |
| Protocol error | Infrastructure broke — LLM can't do much |

---

## The Fundamental Rule

> MCP is USB-C for AI integrations. One standard protocol means any client works with any server. The LLM never knows or cares — it just sees tool definitions and calls them. The host handles routing.
