# Resources to Review — ai_explained Coverage Audit

Links evaluated against the actual ai_explained 9-track curriculum.

**Rubric:** published + planned modules both count as coverage. "Planned" means the
module exists in the track spec files — committed curriculum intent, not speculation.
For a published-only view, see `curriculum/external-resources-inbox.md`.

**Coverage key:**
- COVERED: the concept and this specific resource's angle are addressed in a published
  or planned module — use this resource as a primary reference URL for that module
- PARTIAL: the general concept is in the curriculum but this specific tool/angle is
  not mentioned — worth a reference or mention in the relevant module
- GAP: not addressed in the curriculum at all — worth a new module or dedicated section

---

## LLM Gateways / Unified API Layers

### LiteLLM — https://docs.litellm.ai/
**What it is:** Python library (and optional proxy) that normalises 100+ providers to
the OpenAI interface. Swap base URL + model name; LiteLLM translates the request.
Includes retry logic, cost tracking, load balancing.

**Course coverage: COVERED**
Planned as module **3.7 — LiteLLM: API Standardisation** (Track 3: Protocols) and
referenced as the gateway implementation in **5.8 — LLM Gateway Patterns** (Track 5).
No action needed; resource is a primary reference for those two modules.

---

### Portkey — https://portkey.ai/
**What it is:** Commercial LLMOps platform: AI gateway + observability + guardrails +
prompt management. 1,600+ models, PII redaction, cost tracking, team access controls.

**Course coverage: PARTIAL**
The gateway pattern is covered in **5.8**. Portkey's managed-platform features
(guardrails, PII redaction) overlap with **Track 7 — Safety**. No dedicated module
needed, but useful as a "managed alternative to self-hosted LiteLLM" reference in 5.8.

---

### ModelRouter — https://modelrouter.app/docs
**What it is:** Hosted service unifying multiple LLMs with intelligent routing based on
speed, cost, or capability. Drop-in OpenAI-compatible endpoint.

**Course coverage: PARTIAL**
Same pattern as LiteLLM and Portkey. Worth a line in the **5.8** gateway comparison
table alongside LiteLLM (self-hosted) and Portkey (managed commercial).

---

### LLM Gateway — https://llmgateway.io/
**What it is:** 210+ models, 25+ providers. OpenAI-compatible. Cloud or self-hostable.
Enterprise: audit logs, guardrails, SSO.

**Course coverage: PARTIAL**
Same pattern. The self-hosted option is the most relevant angle for the course.
Mention alongside ModelRouter in the **5.8** gateway comparison table.

---

## RAG / Knowledge Retrieval

### RAGFlow — https://ragflow.io/
**What it is:** Open-source enterprise RAG engine. Full pipeline: document ingestion
(ETL), hybrid search (vector + BM25), workflow orchestration, agent integration.
Pre-built templates for finance, legal, and maintenance workflows.

**Course coverage: PARTIAL**
Track 2 (RAG) builds the pipeline from primitives — chunking, embedding, retrieval,
evaluation. RAGFlow is the batteries-included managed alternative that skips the
plumbing. The concept is covered; this specific tool is not mentioned anywhere in the
curriculum. Worth adding as a reference in **2.8 — Production RAG Checklist** (or
whichever module closes the RAG track) under "managed alternatives."

---

## Agent Frameworks / Infrastructure

### DSPy — https://dspy.ai/
**What it is:** Declarative framework where you define input/output signatures and DSPy
optimises the prompts automatically against a metric. Compiles intent into prompts
rather than hand-writing them.

**Course coverage: COVERED**
Planned as module **1.9 — DSPy: Programmatic Prompt Optimisation** (Track 1:
Foundations). Primary reference URL for that module.

---

### Autoresearch — https://github.com/karpathy/autoresearch
**What it is:** Andrej Karpathy's prototype for autonomous ML research. Agent modifies
training code, runs 5-minute GPU experiments, evaluates via validation bits-per-byte,
and iterates. Instructions in a markdown file; agent does the rest.

**Course coverage: PARTIAL**
Track 4 covers agent planning, memory, multi-agent patterns, and autonomous loops.
**4.10 — Internal Coding Agents** is the closest home. Autoresearch is a compelling
"what autonomous agents can do in research contexts" example for Layer 1 of that
module. Add as a further-reading reference, not a hands-on lab.

---

### OpenFang — https://www.openfang.sh/
**What it is:** Rust-based agent OS. Pre-built autonomous agents, 40+ messaging
integrations, 26 LLM providers, WASM sandboxing for security.

**Course coverage: PARTIAL**
Track 4 covers agent architecture and **4.10 — Internal Coding Agents** covers
tooling in this space. The WASM sandboxing pattern and audit trail architecture are
relevant to **Track 7 — Safety**. Not a hands-on tool for the course (not Python),
but the architecture is worth a mention in 4.10's Layer 3 or Track 7 under sandboxing.

---

### OpenClaw — https://github.com/openclaw/openclaw
**What it is:** TypeScript local-first AI assistant framework with multi-channel
messaging (WhatsApp, Telegram, Slack, Discord) via a local gateway. Isolated agent
workspaces per channel.

**Course coverage: PARTIAL**
**4.10 — Internal Coding Agents** (Slack-first invocation, messaging integrations) is
the direct fit. Not Python, but the channel-integration and workspace-isolation
patterns are directly relevant to Layer 3 architecture discussion in 4.10.

---

### AnythingLLM — https://anythingllm.com/ / https://github.com/Mintplex-Labs/anything-llm
**What it is:** All-in-one desktop app for local LLM interaction. Chat with documents,
run agents, connect to local or cloud models — all on-device. No sign-up required.

**Course coverage: PARTIAL**
Track 5 covers self-hosted inference (5.1 local stack, 5.3 vLLM). AnythingLLM is the
GUI layer above that. Worth a mention in **5.1 — Local LLM Stack** as the "if you want
a UI without writing code" alternative. No dedicated module needed.

---

## AI Coding Agents / Developer Tooling

### Traycer — https://traycer.ai/
**What it is:** Spec-driven planning layer that turns product intent into PRDs/specs,
decomposes them into tasks, and hands off to coding agents (Claude Code, Cursor, etc.)
while verifying generated output.

**Course coverage: PARTIAL**
**4.10 — Internal Coding Agents** explicitly covers coding agent workflows, planning
integration (Linear/GitHub/CI), and the AGENTS.md pattern. Traycer sits at the
planning-to-agent handoff layer — directly relevant to 4.10's Layer 2 or Layer 3
discussion of how teams actually structure coding agent workflows.

---

### OpenCode — https://opencode.ai/docs
**What it is:** Open-source AI coding agent (terminal, desktop, IDE). Answers questions
about codebases, makes code changes via conversation, supports multiple LLM providers.

**Course coverage: PARTIAL**
Same category as Claude Code — directly relevant to **4.10 — Internal Coding Agents**
as a concrete tool example. Module 4.10 notes "tooling in this space is evolving
rapidly" and lists it as volatile. OpenCode is a primary tool to cover there.

---

### Warp — https://www.warp.dev/terminal
**What it is:** Modern terminal with AI agents built in. IDE-like editing, block-based
output navigation, rich agent context from the command line.

**Course coverage: PARTIAL**
**4.10 — Internal Coding Agents** covers Slack-first invocation and tooling for coding
agents. Warp is the terminal-native equivalent and fits the same module as a tooling
example. Layer 1 of 4.10 could use Warp to illustrate how coding agents are invoked
outside an IDE.

---

## Protocols / Architecture Concepts

### Google: Developers Guide to AI Agent Protocols — https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/
**What it covers:** Survey of six protocol layers: MCP (tool/resource), A2A
(agent-to-agent), UCP (commerce), AP2 (payments), A2UI (dynamic UI), AG-UI
(streaming events to frontends).

**Course coverage: PARTIAL**
Four of the six protocols are covered or planned in Track 3:
- **3.1** — protocol-landscape (MCP, A2A, AG-UI — all published in the same module)
- **3.6** — Agent Payments Protocol (AP2), planned
- UCP (Universal Commerce Protocol) and A2UI (Agent-to-User Interface Protocol) are
  not in the curriculum. The Google article is valuable as a Track 3 reading list item
  that frames all six protocols as complementary layers.

This article should be linked from **3.1** as further reading.

---

### Disaggregated Inference — https://docs.modular.com/glossary/ai/disaggregated-inference/
**What it is:** LLM serving architecture splitting prefill (compute-optimised GPUs)
from decode (memory-optimised GPUs). Reduces contention, controls latency, allows
independent scaling.

**Course coverage: PARTIAL**
**5.3 — vLLM: Production Serving** covers vLLM's architecture. Disaggregated inference
is the "why vLLM is designed this way" background concept. Add as a Layer 3 note in
5.3 explaining the prefill/decode split and why vLLM's scheduler exists.

---

## Quantisation / Compression Research

### TurboQuant (Google Research) — https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/
Secondary: https://turboquant.net/#overview
**What it is:** KV cache compression algorithm (ICLR 2026). PolarQuant + 1-bit
residual correction compresses KV vectors to 3-4 bits with no accuracy loss. Results:
6x memory reduction, 8x GPU speedup for long-context inference.

**Course coverage: PARTIAL**
**5.2 — VRAM Management & Quantisation** covers quantisation precision tradeoffs.
TurboQuant is directly relevant as a leading-edge research example of KV cache
compression — the exact bottleneck 5.2 addresses. Add as a further-reading reference
in 5.2 Layer 3, alongside the primary quantisation techniques.

Note: `turboquant.net` is not an official Google property — use the Google Research
blog URL as the primary reference.

---

### Terminal-Bench — https://www.tbench.ai/
**What it is:** Benchmark suite for evaluating AI agents in terminal environments.
Tasks span software engineering, ML, security, and data science. Public leaderboard.

**Course coverage: PARTIAL**
**Track 6 — Evaluation** covers LLM eval fundamentals, RAGAS, automated methods,
and CI/CD gates. Terminal-Bench is the agent-specific eval benchmark counterpart.
**6.8 — Red Teaming** or a dedicated agent evaluation module would be the best home.
Also relevant to **4.8 — Agent Evaluation** (published) — add as a further-reading
reference there.

---

## Summary Table

| Resource | Category | Coverage | Action |
|---|---|---|---|
| LiteLLM | Unified LLM SDK | COVERED (3.7 + 5.8) | Primary reference for those modules |
| Portkey | LLMOps platform | PARTIAL | Mention in 5.8 as managed alternative |
| ModelRouter | LLM gateway | PARTIAL | Add to 5.8 gateway comparison table |
| LLM Gateway | LLM gateway | PARTIAL | Add to 5.8 gateway comparison table |
| RAGFlow | RAG engine | PARTIAL | Add reference in Track 2 closing module |
| DSPy | Prompt optimisation | COVERED (1.9) | Primary reference for 1.9 |
| Autoresearch (Karpathy) | Autonomous ML agent | PARTIAL | Further reading in 4.10 |
| OpenFang | Agent OS (Rust) | PARTIAL | Architecture reference in 4.10 / Track 7 |
| OpenClaw | Local AI assistant (TS) | PARTIAL | Channel-integration reference in 4.10 |
| AnythingLLM | Local LLM desktop app | PARTIAL | Mention in 5.1 as GUI alternative |
| Traycer | AI dev workflow | PARTIAL | Planning-layer example in 4.10 |
| OpenCode | AI coding agent | PARTIAL | Primary tool example in 4.10 |
| Warp | AI terminal | PARTIAL | Tooling example in 4.10 |
| Google Agent Protocols | Protocol survey | PARTIAL | Link as Track 3 reading list; UCP/A2UI not planned |
| Disaggregated inference | Serving architecture | PARTIAL | Layer 3 note in 5.3 |
| TurboQuant | KV cache compression | PARTIAL | Further reading in 5.2 |
| Terminal-Bench | Agent eval benchmark | PARTIAL | Further reading in 4.8 |
