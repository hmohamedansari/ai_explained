# Tools: A Deep Dive

## What a Tool Actually Is

A tool is just a **JSON schema** — a description of a function. The LLM never executes anything. It reads the description, decides to "call" the function, and emits structured JSON saying what it wants called with what arguments. The host app does the actual work.

```json
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": { "type": "string" },
      "units": { "type": "string", "enum": ["celsius", "fahrenheit"] }
    },
    "required": ["city"]
  }
}
```

That's it. That's a tool. A name, a description, and a JSON Schema describing the inputs.

---

## How the LLM Sees Tools

When you call the API, you pass tools in alongside the messages:

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    tools=[get_weather_tool],        # <-- injected here
    messages=[{"role": "user", "content": "What's the weather in Berlin?"}]
)
```

Under the hood, the tools get serialized into the prompt. The model doesn't have a separate "tool pathway" — it's just text. The model was fine-tuned to recognize tool definitions and respond with structured `tool_use` blocks when appropriate.

---

## The Request / Execute / Return Loop

```
User: "What's the weather in Berlin?"

1. API call → model sees tools + messages
2. Model responds with tool_use block:
   { "type": "tool_use", "name": "get_weather", "input": { "city": "Berlin" } }

3. Host app receives this, executes get_weather("Berlin")
4. Host sends back tool_result:
   { "type": "tool_result", "tool_use_id": "abc", "content": "18°C, partly cloudy" }

5. Model sees the result, continues generation:
   "The weather in Berlin is currently 18°C and partly cloudy."
```

This loop can repeat multiple times in a single response — the model keeps emitting `tool_use` blocks until it has enough information to give a final answer.

---

## What a tool_use Block Looks Like

```json
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "get_weather",
  "input": {
    "city": "Berlin",
    "units": "celsius"
  }
}
```

And the corresponding `tool_result`:

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
  "content": "18°C, partly cloudy"
}
```

The `tool_use_id` links the result back to the specific call — important when multiple tools are called in parallel.

---

## Parallel Tool Calls

The model can emit multiple `tool_use` blocks in a single response:

```json
[
  { "type": "tool_use", "id": "1", "name": "get_weather", "input": { "city": "Berlin" } },
  { "type": "tool_use", "id": "2", "name": "get_weather", "input": { "city": "Tokyo" } }
]
```

The host runs both, returns two `tool_result` entries, and the model synthesizes them together. The model decides when calls are independent and can be parallelized.

---

## stop_reason: tool_use

The API response has a `stop_reason` field. When the model wants to call a tool, it stops with:

```json
{ "stop_reason": "tool_use" }
```

This tells the host: "don't show this to the user yet — execute the tools and send results back." The conversation only ends (from the user's perspective) when `stop_reason` is `end_turn`.

---

## Tool Choice

You can control whether the model uses tools:

```python
# Default: model decides
tool_choice = { "type": "auto" }

# Force the model to use at least one tool
tool_choice = { "type": "any" }

# Force a specific tool
tool_choice = { "type": "tool", "name": "get_weather" }

# Never use tools (why pass them then? schema validation use cases)
tool_choice = { "type": "none" }
```

---

## How Models Are Trained to Use Tools

The model wasn't born knowing about tools — it was fine-tuned on examples of:
- Tool definitions in the context
- Correct `tool_use` output format
- Reasoning about *when* to call a tool vs answer directly
- Handling `tool_result` and continuing coherently

This is why description quality matters enormously. The model decides whether to use a tool largely based on the description. A vague description = wrong tool choices.

---

## Writing Good Tool Descriptions

Bad:
```json
{ "name": "query", "description": "Query data" }
```

Good:
```json
{
  "name": "query_database",
  "description": "Run a read-only SQL SELECT query against the production PostgreSQL database. Use this when you need to look up user records, orders, or analytics data. Do NOT use for writes — this will be rejected.",
  "input_schema": {
    "type": "object",
    "properties": {
      "sql": {
        "type": "string",
        "description": "A valid SQL SELECT statement. Must not contain INSERT, UPDATE, DELETE, or DROP."
      },
      "limit": {
        "type": "number",
        "description": "Max rows to return. Defaults to 100. Max 1000.",
        "default": 100
      }
    },
    "required": ["sql"]
  }
}
```

Rules of thumb:
- Say *what* the tool does, *when* to use it, and *when not* to use it
- Describe edge cases and constraints in the field descriptions
- Use enums where possible — they constrain the input space and reduce hallucination

---

## Error Handling

Tools can fail. Return errors as content, not exceptions:

```json
{
  "type": "tool_result",
  "tool_use_id": "abc",
  "content": "Error: city 'Berlinn' not found. Did you mean 'Berlin'?",
  "is_error": true
}
```

With `is_error: true`, the model knows the tool failed and can reason about it — retry with corrected input, ask the user, or try a different approach. Without it, the model might treat an error message as real data.

---

## Key Mental Models

| Concept | Reality |
|---|---|
| Tool | A JSON schema describing a callable function |
| tool_use | The model's request to execute a function |
| tool_result | The host's response after executing it |
| stop_reason: tool_use | "Don't stop yet, run these tools first" |
| The model "calling" a tool | The model emitting JSON; the host doing the actual work |
| Tool descriptions | The primary signal the model uses to decide when/how to use a tool |

---

## The Fundamental Rule

> The model is a stateless text transformer. It never runs code. Tools are the mechanism by which it can *request* that the host run code on its behalf.

Everything else — agentic loops, MCP servers, Claude Code — is built on this single primitive.
