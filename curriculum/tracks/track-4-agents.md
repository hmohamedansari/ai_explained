# Track 4: Agentic Brains (Orchestration & Architecture)
> Last reviewed: 2026-03-20 | Personas: All → Sr Dev / SRE
> Owner: [unassigned] | Reviewer: [unassigned]

*Where agents go wrong at scale — and the patterns that prevent it.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 4.1 | What Is an Agent? (Actually) | All | `stable` | `planned` |
| 4.2 | LangGraph: State-Machine Agents | Jr Dev → | `emerging` | `planned` |
| 4.3 | CrewAI: Multi-Agent Role Teams | Jr Dev → | `emerging` | `planned` |
| 4.4 | AutoGen: Conversational Multi-Agent | Jr Dev → | `emerging` | `planned` |
| 4.5 | Multi-Agent Failure Modes | Sr Dev | `stable` | `planned` |
| 4.6 | Typed Contracts at Agent Boundaries | Sr Dev | `stable` | `planned` |
| 4.7 | Subagent Orchestration | Sr Dev | `stable` | `planned` |
| 4.8 | Sandbox Isolation | Sr Dev / SRE | `emerging` | `planned` |
| 4.9 | Cognitive Architectures | Sr Dev | `emerging` | `planned` |
| 4.10 | Internal Coding Agents | Sr Dev / Leader | `volatile` | `planned` |
| 4.11 | Middleware & Deterministic Injection | Sr Dev | `stable` | `planned` |

---

## Module Details

### 4.1 — What Is an Agent? (Actually)
**Personas:** All
**Key concepts:** The "agent as coworker" vs. "agent as chatbot" paradigm shift. The Plan → Act → Observe loop. Agents are not just chatbots with tools — they are autonomous decision-making systems with a feedback loop.
**Note:** This module resets expectations. Most readers arrive with a chatbot mental model. This module replaces it.

---

### 4.2 — LangGraph: State-Machine Agents
**Personas:** Jr Dev →
**Key concepts:** Nodes, edges, state, cyclical workflows, conditional routing.
**Note:** Layer 2 must include a working graph that has at least one conditional edge and one loop — not just a linear chain. That's where LangGraph's value is.

---

### 4.3 — CrewAI: Multi-Agent Role Teams
**Personas:** Jr Dev →
**Key concepts:** Role-based agents, crew composition, task delegation, process modes (sequential vs. hierarchical).
**Note:** Compare and contrast with LangGraph in Layer 3 — cover when you'd pick CrewAI over LangGraph and vice versa.

---

### 4.4 — AutoGen: Conversational Multi-Agent
**Personas:** Jr Dev →
**Key concepts:** Microsoft's framework for multi-agent conversations, group chat patterns, human-in-the-loop integration.
**Note:** Cover the GroupChatManager pattern. Compare with LangGraph and CrewAI — AutoGen's conversational model is architecturally distinct.

---

### 4.5 — Multi-Agent Failure Modes
**Personas:** Sr Dev
**Key concepts:**
- The "bag of agents" anti-pattern (no typed contracts between agents)
- Implicit state assumptions (agents assuming context that was never passed)
- The **17× error trap**: 3 agents at 90% accuracy each = 0.9³ = 73% system accuracy

**Production gotcha:** The 17× error trap is the reason multi-agent systems fail silently. Individual agent accuracy looks fine; system accuracy is not measured. Always measure end-to-end.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 4.6 — Typed Contracts at Agent Boundaries
**Personas:** Sr Dev
**Key concepts:** The discriminated union / action schema pattern — typed action schemas eliminate open-ended agent output ambiguity; machine-checkable contracts stop bad state propagating.
**Production gotcha:** Agents that return free-form text at their boundaries create cascading failures. The fix is typed output schemas enforced at every agent boundary — not prompting the agent to "be consistent."
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 4.7 — Subagent Orchestration
**Personas:** Sr Dev
**Key concepts:** Decomposing complex tasks, supervisor vs. peer architectures, hierarchical delegation.
**Note:** Layer 3 should cover the tradeoffs: supervisor architectures are more predictable but create bottlenecks; peer architectures scale better but are harder to debug.

---

### 4.8 — Sandbox Isolation
**Personas:** Sr Dev / SRE
**Key concepts:** Modal, Daytona, Runloop — purpose-built ephemeral compute for agents with full permissions; not just Docker.
**Production gotcha:** Running agents in a general-purpose container is not the same as sandbox isolation. Purpose-built agent sandboxes provide process-level isolation, network egress control, and automatic teardown that Docker alone does not.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 4.9 — Cognitive Architectures
**Personas:** Sr Dev
**Key concepts:** Memory + planning + tool loops; the ReAct, Plan-and-Execute, and Reflexion pattern families; long-term memory and persistent state.
**Note:** Layer 3 should compare ReAct (interleaved reasoning and action) vs. Plan-and-Execute (separate planning phase) on tasks where one clearly outperforms the other.

---

### 4.10 — Internal Coding Agents
**Personas:** Sr Dev / Leader
**Key concepts:** Slack-first invocation, integrating with Linear/GitHub/CI, rich startup context, AGENTS.md + sandbox stack.
**Volatility note:** Tooling in this space is evolving rapidly. Verify tool names and integrations before publishing.

---

### 4.11 — Middleware & Deterministic Injection
**Personas:** Sr Dev
**Key concepts:** Hybrid architecture mixing rule-based guardrails with LLM reasoning — reliability without losing flexibility. When to use deterministic middleware vs. letting the LLM decide.
**Note:** This is the architectural counterpart to 7.5 (Guardrails as Infrastructure). Cover both: middleware at the orchestration layer (4.11) and external guardrails at the output layer (7.5).

---

## Unknown Unknowns Surfaced

- Discriminated union / action schema pattern — production-hardened but invisible in popular tutorials (4.6)
- The 17× error trap — system accuracy compounds across agents (4.5)
- Sandbox providers as a distinct infrastructure category (4.8)
- Treating agent-to-agent communication as a typed API contract (4.6)
