# Interactive Labs
> Last reviewed: 2026-03-20 | Volatility: `emerging`

*Scoped conservatively. Each lab must justify its maintenance cost before it is built.*

Labs are deferred until initial content proves valuable. Revisit scope after early traffic data is available. The rule: if a lab has a live dependency, it has a maintenance burden — design that burden in from the start.

---

## Planned Labs

### Lab 1 — Local LLM Setup Guide
**What it demonstrates:** End-to-end local model setup — hardware check → model download → running inference → connecting to VS Code via Continue.
**Tech stack:** Static MDX with hardware selector UI (no server required).
**Maintenance scope:** Low. No live dependencies. Update model names and hardware specs as they change.
**Gate:** Can ship independently of other labs.

---

### Lab 2 — MCP Playground
**What it demonstrates:** Connecting one real tool (filesystem or GitHub) to Claude Desktop or a LangGraph agent; observing tool calls in a trace viewer.
**Tech stack:** Pre-built MCP server (TypeScript) + embedded trace viewer (iframe to Langfuse public demo).
**Maintenance scope:** Medium. Uses Langfuse public endpoint to avoid self-hosting. Monitor for API changes.
**Gate:** Requires Track 3 (MCP) content to be published first.

---

### Lab 3 — RAG Chunking Visualiser
**What it demonstrates:** Upload a PDF → see it split into chunks → see which chunks are retrieved for a query → see the final context assembled.
**Tech stack:** Python (FastAPI) + React frontend. Cloudflare Workers with Workers KV (TTL: 30 min) for session state.
- **D1 is explicitly excluded** — it is a persistent database and this lab is stateless by design.
- Each session is keyed by a random UUID and expires automatically after the TTL.
- No user data survives between sessions.

**Maintenance scope:** Medium. Stateless design reduces ops burden but FastAPI server requires deployment and monitoring.
**Gate:** Requires Track 2 (RAG) content to be published first.

---

### Lab 4 — Red Team Lab
**What it demonstrates:** 10 graded prompt injection challenges. Pass the injection to understand how it works, then learn the mitigation.
**Tech stack:** Static MDX challenges + client-side JavaScript judge. No LLM call required.
**Maintenance scope:** Low. Fully static. Update challenges as new attack techniques emerge.
**Gate:** Requires Track 7 (Safety) content to be published first. Must be reviewed by a security-aware author before shipping.

---

### Lab 5 — Agent Trace Explorer
**What it demonstrates:** Pre-recorded LangGraph execution traces with interactive step-through showing agent state at each node.
**Tech stack:** Static JSON trace files + React trace viewer. No live LLM required.
**Maintenance scope:** Low. No live dependencies. Add new traces as new patterns are demonstrated.
**Gate:** Requires Track 4 (Agents) content to be published first.

---

## Lab Principles

- **No live LLM calls in static labs** — latency, cost, and rate limits make for a bad learner experience. Use pre-recorded traces or static data where possible.
- **Stateless by default** — labs that store user data create privacy obligations and operational burden.
- **Each lab needs an owner** — a lab without a named maintainer should not ship.
- **Scope before building** — a lab that demonstrates 5 things teaches 0 things. Pick one learning outcome per lab.
