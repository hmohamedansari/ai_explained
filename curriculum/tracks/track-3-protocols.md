# Track 3: Interaction & Protocols (Tools, MCP & the Agentic Web)
> Last reviewed: 2026-03-20 | Personas: Jr Dev → Sr Dev, Leader
> Owner: [unassigned] | Reviewer: [unassigned]

*The protocol layer is the fastest-moving area of AI engineering in 2026. Expect frequent updates.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 3.1 | Tool Calling Fundamentals | Jr Dev → | `stable` | `planned` |
| 3.2 | Skills: Atomic Agent Capabilities | Jr Dev → | `stable` | `planned` |
| 3.3 | Model Context Protocol (MCP) | All Devs | `emerging` | `planned` |
| 3.4 | Agent2Agent (A2A) | Sr Dev | `volatile` | `planned` |
| 3.5 | AG-UI: Streaming Protocol | Sr Dev | `volatile` | `planned` |
| 3.6 | Agent Payments Protocol (AP2) | Leader / Sr Dev | `volatile` | `planned` |
| 3.7 | LiteLLM: API Standardisation | Jr Dev / SRE | `emerging` | `planned` |
| 3.8 | Curated Tool Selection | Sr Dev | `stable` | `planned` |
| 3.9 | AGENTS.md Convention | Sr Dev | `emerging` | `planned` |

---

## Module Details

### 3.1 — Tool Calling Fundamentals
**Personas:** Jr Dev →
**Key concepts:** Function calling, tool schemas (JSON Schema), the request-tool-result loop, when agents call tools vs. when they don't.
**Note:** This is the foundation for all agentic modules. Layer 2 must show a complete tool call cycle — not just the function definition.

---

### 3.2 — Skills: Atomic Agent Capabilities
**Personas:** Jr Dev →
**Key concepts:** Composable skill units, separation of capability from orchestration, skill registries.
**Note:** Skills are the reusable building blocks that tool calls execute. The distinction between a *tool* (the interface) and a *skill* (the capability) matters for multi-agent system design.

---

### 3.3 — Model Context Protocol (MCP)
**Personas:** All Devs
**Key concepts:** The n×m integration problem (every tool × every model = custom integration), MCP as the standardisation solution, tool discovery, Linux Foundation ownership.
**Production gotcha:** As MCP adoption grows, third-party MCP servers become a new supply chain risk. Don't connect to MCP servers you don't control without auditing them. See 7.4.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 3.4 — Agent2Agent (A2A)
**Personas:** Sr Dev
**Key concepts:** How agents discover and communicate with other agents via capability cards at well-known URLs — analogous to DNS/service discovery. Google's A2A protocol spec.
**Production gotcha:** Most developers treat multi-agent systems as tightly coupled function calls. A2A introduces loose coupling at the agent boundary — a fundamentally different programming model.
**Unknown Unknown:** Listed in `common-gotchas.md`.
**Volatility note:** Spec is evolving. Pin to a specific version when writing Layer 3.

---

### 3.5 — AG-UI: Streaming Protocol
**Personas:** Sr Dev
**Key concepts:** SSE (Server-Sent Events) standard abstracting framework-specific event formats from the frontend. Decouples agent execution from UI rendering.
**Volatility note:** Very new standard. Verify adoption status before publishing.

---

### 3.6 — Agent Payments Protocol (AP2)
**Personas:** Leader / Sr Dev
**Key concepts:** Cryptographic mandate chains for agent spending authorisation, audit trails, approval workflows.
**Production gotcha:** AP2 is an entirely new infrastructure category. Most organisations have no existing governance framework for agents that spend money autonomously — this needs to be designed before agents are given payment capabilities, not after.
**Unknown Unknown:** Listed in `common-gotchas.md`.
**Authoring note:** Layer 1 must be readable by a non-technical Leader (business risk framing). Layer 2 covers the cryptographic mandate chain for Sr Dev.
**Volatility note:** Protocol is emerging. Treat as forward-looking.

---

### 3.7 — LiteLLM: API Standardisation
**Personas:** Jr Dev / SRE
**Key concepts:** Unified API proxy across 100+ providers, model routing, fallbacks, cost tracking.
**Note:** Covers both the Python library and the self-hosted proxy/gateway mode.

---

### 3.8 — Curated Tool Selection
**Personas:** Sr Dev
**Key concepts:** Why fewer tools outperform large tool catalogs — agents get confused by too many options; curation is an architectural decision, not just a UX one.
**Production gotcha:** This is counterintuitive. Exposing 50 tools to an agent produces worse results than exposing 8 well-chosen tools. The mechanism is attention dilution during tool selection.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 3.9 — AGENTS.md Convention
**Personas:** Sr Dev
**Key concepts:** Repo-level machine-readable config encoding codebase-specific rules for AI agents — emerging standard in engineering organisations. Analogous to `.github/CODEOWNERS` but for AI agents.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

## Production Gotchas

- Agent Payments Protocol (AP2) — cryptographic authorisation for agentic commerce is an entirely new infrastructure category (3.6)
- Capability cards / A2A discovery — the agent equivalent of DNS/service discovery (3.4)
- AGENTS.md as organisational infrastructure (3.9)
- Why curated small tool sets beat large catalogs — counterintuitive, production-validated (3.8)
- Malicious MCP servers as a supply chain risk (3.3) — see also Track 7
