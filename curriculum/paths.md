# Learning Paths
> Last reviewed: 2026-03-20 | Volatility: `stable` (structure); individual module references may drift
> Owner: [unassigned] | Reviewer: [unassigned]

Each path has two variants:
- **MVP path** — minimum modules to reach the literacy checkpoint. For learners short on time.
- **Extended path** — full depth, all recommended modules.

**Reading conventions used in this file:**
- **Numbered lists** = core modules — sequential, all recommended within the path.
- **Bullet lists under "Optional Extensions"** = skip freely — read only if the topic applies to your current stack or project. These are never required to reach the literacy checkpoint.

The rendered site must visually distinguish core from optional (e.g., badge, muted style, or explicit "Optional" label). Content authors: do not add optional modules to numbered lists — keep the formatting convention clean.

Evaluation is introduced early in Paths C and D — it drives architecture decisions, not just ops.

---

## Path A: The Curious Beginner
*Zero coding required. Pure comprehension.*

**Personas:** Beginner
**Prerequisites:** None.

### MVP (3 modules)
1. **1.1** — What is an LLM? (Plain English)
2. **7.1** — The AI Safety Landscape
3. **8.1** — AI Landscape 2026

### Extended (5 modules)
1. **1.1** — What is an LLM? (Plain English)
2. **1.3** — How Models Are Made
3. **1.7** — Model Families & Trade-offs
4. **7.1** — The AI Safety Landscape
5. **8.1** — AI Landscape 2026

**Literacy checkpoint:** After this path, you can read AI news intelligently, hold informed conversations with technical teams, and understand why "just asking it nicely" isn't a reliable safety strategy.

---

## Path B: The Executive Briefing (Tech Leaders)
*Decision-making, risk, and strategy.*

**Personas:** Leader
**Prerequisites:** Curious Beginner path (or equivalent context).

### MVP (5 modules)
1. **8.2** — ROI Measurement
2. **8.3** — Buy vs. Build vs. Tune
3. **7.9** — EU AI Act & GRC
4. **7.4** — Supply Chain Vulnerabilities (Layer 1 only)
5. **8.7** — Agent Economics

### Extended (11 modules)
1. **1.2** — Tokens, Context Windows & Attention (conceptual layer only)
2. **3.3** — MCP (the integration problem, not the code)
3. **3.6** — Agent Payments Protocol (the new commercial infrastructure)
4. **8.2** — ROI Measurement
5. **8.3** — Buy vs. Build vs. Tune
6. **8.4** — AI-First Team Structure
7. **7.9** — EU AI Act & GRC
8. **7.4** — Supply Chain Vulnerabilities (executive summary layer)
9. **7.6** — Data Privacy & GDPR
10. **8.7** — Agent Economics
11. **8.5** — The Make-vs-Maintain Trap

**Optional Extensions**
- **1.11** — Reasoning Models & Test-Time Compute *(when to pay the reasoning premium — and when it's waste)*
- **8.8** — Migration & Change Management *(model swap governance, rollback protocols, communicating changes to non-technical stakeholders)*

**Literacy checkpoint:** After this path, you can read Google's Developers Guide to AI Agent Protocols and understand the business implications — not just the protocols themselves.

---

## Path C: The AI Apprentice (Junior Devs)
*First deployable AI feature. Deliberately paced — no conceptual gaps.*

**Personas:** Junior
**Prerequisites:** Basic Python or JavaScript. API familiarity.

### MVP (8 modules)
1. **1.1** — What is an LLM?
2. **1.4** — Prompting Fundamentals
3. **1.6** — Structured Outputs
4. **6.2** — Code-Based Evals *(write your first eval before your first feature)*
5. **2.3** — Basic RAG Pipeline
6. **3.1** — Tool Calling Fundamentals
7. **3.3** — MCP (hands-on)
8. **7.2** — OWASP Top 10 for LLM Applications

### Extended (16 modules)
1. **1.1** — What is an LLM?
2. **1.2** — Tokens & Context Windows
3. **1.4** — Prompting Fundamentals
4. **1.5** — Sampling Parameters
5. **1.6** — Structured Outputs
6. **6.1** — Why Evaluation Is Hard *(introduced early — build with evals in mind from the start)*
7. **6.2** — Code-Based Evals *(write your first eval before your first feature)*
8. **2.1** — Vector Similarity & Embeddings
9. **2.2** — Vector Stores & Indexing *(the conceptual bridge — don't skip this)*
10. **2.3** — Basic RAG Pipeline
11. **3.1** — Tool Calling Fundamentals
12. **3.3** — MCP (hands-on)
13. **3.7** — LiteLLM
14. **6.5** — RAGAS & RAG Evaluation
15. **6.8** — Observability Stack (Langfuse basics)
16. **7.2** — OWASP Top 10 for LLM Applications

**Literacy checkpoint:** After this path, you can read the InfoWorld article on running Qwen3.5 locally and understand *why* the local 9B model failed at agentic tasks — not just that it did.

---

## Path D: The AI Architect (Mid/Senior Devs)
*Production multi-agent systems. Evaluation introduced early — it drives architecture.*

**Personas:** Senior
**Prerequisites:** Apprentice path (or equivalent experience).

### MVP (10 modules)
1. **6.1** — Why Evaluation Is Hard
2. **6.3** — LLM-as-Judge
3. **2.8** — Context Engineering
4. **2.9** — Context Failure Taxonomy
5. **4.2** — LangGraph
6. **4.5** — Multi-Agent Failure Modes
7. **4.6** — Typed Contracts at Agent Boundaries
8. **4.8** — Sandbox Isolation
9. **7.3** — Prompt Injection & Jailbreaking
10. **7.5** — Guardrails as Infrastructure

### Extended (37 modules)

> **Architect's note:** 37 modules is the full depth — not the minimum viable path. The MVP above (10 modules) is the completion checkpoint. Within the extended path, **Phases 1, 4, and 5** are the highest-priority phases for production readiness. Phases 2 and 3 can be read in parallel or deferred by topic area.

**Phase 1 — Evaluation-First Foundation**
1. **6.1** — Why Evaluation Is Hard *(re-read with fresh eyes — now it changes your architecture decisions)*
2. **6.3** — LLM-as-Judge
3. **6.4** — Error Analysis Workflow

**Phase 2 — Advanced Knowledge**
4. **1.8** — Quantisation & Local Models
5. **1.9** — DSPy
6. **2.4** — Chunking Strategy Trade-offs
7. **2.5** — Query Augmentation
8. **2.6** — Advanced Retrieval
9. **2.7** — GraphRAG
10. **2.8** — Context Engineering
11. **2.9** — Context Failure Taxonomy
12. **2.10** — Hybrid Memory Architecture
13. **2.12** — Long-Context vs RAG Decision Framework *(when retrieval beats context stuffing — and when it doesn't)*
14. **2.13** — Data Engineering for AI Systems *(data contracts at ingestion boundaries — the fix most teams skip)*

**Phase 3 — Protocols & Tooling**
13. **3.4** — Agent2Agent (A2A)
14. **3.5** — AG-UI Streaming Protocol
15. **3.8** — Curated Tool Selection
16. **3.9** — AGENTS.md Convention

**Phase 4 — Agent Architecture**
17. **4.2** — LangGraph
18. **4.3** — CrewAI
19. **4.4** — AutoGen
20. **4.5** — Multi-Agent Failure Modes
21. **4.6** — Typed Contracts at Agent Boundaries
22. **4.7** — Subagent Orchestration
23. **4.8** — Sandbox Isolation
24. **4.9** — Cognitive Architectures
25. **4.10** — Internal Coding Agents
26. **4.11** — Middleware & Deterministic Injection
27. **4.12** — Reliability Patterns for Agent Systems *(idempotency, compensation transactions, circuit breakers)*

**Phase 5 — Production Eval & Safety**
27. **6.6** — Synthetic Data for Eval
28. **6.7** — CI/CD-Integrated Evals
29. **6.10** — Evaluating the Evaluator
30. **7.3** — Prompt Injection & Jailbreaking
31. **7.4** — Supply Chain Vulnerabilities
32. **7.5** — Guardrails as Infrastructure

**Optional Extensions**
- **5.9** — Fine-Tuning: When & Why
- **5.10** — LoRA, QLoRA & PEFT
- **5.11** — Synthetic Data for Training & Distillation *(validate against real examples to avoid mode collapse)*
- **5.12** — Sovereign & Air-Gapped AI Architecture *(only if operating under data-sovereignty constraints)*
- **6.11** — Multimodal Evaluation & Observability *(only if building multimodal pipelines)*
- **6.12** — Human Feedback Operations *(only if running a human reviewer workforce)*
- **8.8** — Migration & Change Management *(model swap runbook, eval gating, zero-downtime cutover)*

**Literacy checkpoint:** After this path, you can fully read and implement from the Open SWE framework article and the Google Agent Protocols guide — understanding not just the what but the engineering trade-offs behind each decision.

---

## Path E: The LLM Engineer (SRE/DevOps)
*Running AI workloads reliably and cheaply, including custom model adaptation.*

**Personas:** SRE
**Prerequisites:** Linux, Docker, networking basics.

### MVP (7 modules)
1. **5.1** — Local LLM Stack
2. **5.2** — VRAM Management & Quantisation
3. **5.3** — vLLM: Production Serving
4. **5.8** — LLM Gateway Patterns
5. **6.8** — Observability Stack
6. **6.9** — Cost Management
7. **7.4** — Supply Chain Vulnerabilities

### Extended (19 modules)
1. **1.2** — Tokens & Context Windows (the cost implications)
2. **1.8** — Quantisation & Local Models
3. **5.1** — Local LLM Stack
4. **5.2** — VRAM Management & Quantisation
5. **5.3** — vLLM: Production Serving
6. **5.4** — Speculative Decoding
7. **5.5** — Mixture of Experts
8. **5.6** — Small Language Models
9. **5.7** — Context Length vs. Performance
10. **5.8** — LLM Gateway Patterns
11. **5.9** — Fine-Tuning: When & Why
12. **5.10** — LoRA, QLoRA & PEFT
13. **3.7** — LiteLLM (gateway configuration)
14. **6.7** — CI/CD-Integrated Evals
15. **6.8** — Observability Stack
16. **6.9** — Cost Management
17. **4.8** — Sandbox Isolation
18. **7.8** — Kill Switches & Human-in-the-Loop
19. **7.4** — Supply Chain Vulnerabilities (model weights and plugins)

**Optional Extensions**
- **4.12** — Reliability Patterns for Agent Systems *(idempotency and circuit breakers for SRE-owned agent pipelines)*
- **5.11** — Synthetic Data for Training & Distillation *(if running fine-tuning pipelines)*
- **5.12** — Sovereign & Air-Gapped AI Architecture *(air-gapped deployments, cryptographic model provenance)*
- **5.13** — Caching & Latency Engineering *(semantic caching, all four caching layers, p50/p95/p99 SLO design)*

**Literacy checkpoint:** After this path, you can read the Qwen3.5 local inference article and immediately identify the VRAM headroom mistakes, the quantisation tradeoffs chosen, and what production serving changes you'd make.

---

## Path F: The Multimodal Specialist
*For engineers building systems that see, hear, and act. A focused extension — not a prerequisite for other paths.*

**Personas:** Senior + `multimodal` specialisation tag
**Prerequisites:** Apprentice path (or equivalent). Ideally Track 2 modules 2.1–2.3.

### MVP (4 modules)
1. **1.10** — Multimodal AI
2. **9.1** — Vision Models in Production
3. **9.4** — Multimodal Safety
4. **7.3** — Prompt Injection & Jailbreaking (multimodal attack surface)

### Extended (9 modules)

**Phase 1 — Foundations**
1. **1.10** — Multimodal AI *(overview of the full landscape — vision, audio, video)*
2. **2.11** — Multimodal RAG *(indexing and retrieving non-text content)*

**Phase 2 — Production Systems**
3. **9.1** — Vision Models in Production
4. **9.2** — Audio & Speech AI
5. **9.3** — Multimodal Agents
6. **9.5** — Serving Multimodal Models

**Phase 3 — Safety & Evaluation**
7. **9.4** — Multimodal Safety *(image injection, audio adversarial attacks, deepfakes)*
8. **7.3** — Prompt Injection & Jailbreaking *(multimodal attack surface extension)*
9. **6.11** — Multimodal Evaluation & Observability *(dedicated eval coverage for each modality — text evals give no signal here)*

**Optional: Infrastructure depth**
- **5.2** — VRAM Management & Quantisation *(vision models carry 2–4× the VRAM cost of equivalent text models)*
- **5.3** — vLLM: Production Serving *(image tokens are variable-size and break uniform-batch assumptions)*

**Literacy checkpoint:** After this path, you can read a production engineering post on deploying multimodal pipelines and evaluate whether the system has adequately addressed its retrieval strategy, VRAM budget, and expanded safety attack surface.

> **TODO:** Replace this placeholder with a link to a specific published article before Path F ships. Suggested sources: LlamaIndex blog, Weaviate blog, modal.com engineering posts (2024–2026). **This path must not go live with an unlinked checkpoint.** See publication gates in `index.md`.
