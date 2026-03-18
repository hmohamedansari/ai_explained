# Architecture Overview: Tools, Skills, and MCP

How the three extensibility primitives of Claude Code stack together.

---

## The Three Primitives

### Tools
Functions exposed to Claude via a `tools` array in the API call. Claude emits a `tool_use` content block — the **host app** actually executes it. The result is sent back as `tool_result` and Claude continues.

Claude never directly runs code. It only *requests* tool calls.

```json
// Claude responds with:
{ "type": "tool_use", "name": "bash", "input": { "command": "ls -la" } }

// Host runs it, sends back:
{ "type": "tool_result", "content": "file1.txt\nfile2.txt" }
```

### Skills
Not an Anthropic API concept — a prompt engineering pattern. Stored as markdown files (e.g. `SKILL.md`) in known locations. Claude is instructed to read the relevant `SKILL.md` before doing certain tasks.

This is **just-in-time retrieval-augmented prompting**. Keeps the context window lean while injecting expert knowledge on demand.

Example: a `docx/SKILL.md` with 2000 words of python-docx best practices only loads when making a Word doc.

### MCP (Model Context Protocol)
An open protocol standardizing how AI agents connect to external systems. Think USB-C for AI integrations — one standard instead of custom glue per service.

MCP servers expose:
- **Tools** — callable functions (model-controlled)
- **Resources** — readable data (app-controlled)
- **Prompts** — reusable templates (user-controlled)

---

## How They Stack Together

```
┌─────────────────────────────────────────┐
│              Claude (LLM)               │
│  Reads SKILL.md → expert context        │
│  Calls tools → bash, view, str_replace  │
│  Calls MCP tools → github, filesystem   │
└──────────────┬──────────────────────────┘
               │ tool_use requests
     ┌─────────▼──────────┐
     │   Claude Code Host  │
     │  (Node.js runtime)  │
     └─────┬─────────┬─────┘
           │         │
    Native tools   MCP Servers
    (bash, files)  (github, postgres...)
```

---

## The Core Mental Model

> Claude is a stateless function: text in → text or tool_use out.
> Tools, Skills, and MCP expand what it can **perceive** and **affect** — without changing the model.

| Primitive | What it expands |
|---|---|
| Tools | What actions Claude can request |
| Skills | What knowledge Claude loads before acting |
| MCP | How tools connect to the outside world via a standard protocol |

---

## Deep Dives

- [tools.md](./tools.md) — How tools are defined, how the request/execute/return loop works, parallel calls, error handling
- [mcp.md](./mcp.md) — MCP protocol internals, transports, the three primitives, building a custom server
