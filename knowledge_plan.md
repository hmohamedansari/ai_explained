# AI Academy: Strategic Blueprint & Curriculum Plan
> **Living document.** Last substantive revision: 2026-03-19.

---

## 1. Vision & Core Philosophy

**AI Academy** is the definitive hands-on education platform for AI — from "what is an LLM?" to designing production multi-agent systems. It serves everyone from absolute beginners to infrastructure engineers, without watering down either end.

### The Central Problem We Solve
Most AI education treats AI as a **model consumption problem** (pick a model, write a prompt, call an API). But production AI is a **systems engineering problem** — with typed contracts, observability, failure modes, safety constraints, and organisational integration — that *happens to involve LLMs*. We teach both realities.

### Design Principles
- **Progressive Disclosure:** Simple summaries first. "Deep Dive" toggles reveal production-grade complexity.
- **Persona-Aware Entry Points:** Every topic has a layered entry — executive brief, guided tutorial, and architecture deep-dive.
- **Unknown Unknowns First:** Surface the concepts practitioners discover only after painful production failures.
- **Read Real Things:** After each path, learners should be able to read frontier engineering blogs and understand them fully.
- **Zero Jargon Gates:** No concept is assumed. Every term links to a plain-English definition.

---

## 2. Technical Architecture

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Astro 4.x (SSG) | Speed, SEO, zero-cost hosting |
| Styling | Tailwind CSS | Utility-first, consistent design tokens |
| Interactivity | React + Framer Motion | Deep Dive toggles, animated diagrams |
| Content | Astro Content Collections (typed MDX) | Schema-enforced, queryable |
| Diagrams | Mermaid.js | Architecture flows, no image dependencies |
| Hosting | Cloudflare Pages / Vercel (free tier) | Globally distributed, zero ops |
| Fonts | Geist Sans + JetBrains Mono | Geometric UI + technical code |

---

## 3. Visual Design Language

- **Layout:** Bento Grid + Glassmorphism — structured cards with semi-transparent blurred backgrounds.
- **Theme:** 'Midnight AI' — deep charcoal `#0F172A` backgrounds with cyan/violet neon accents.
- **UX Pattern:** Progressive Disclosure — see Section 8 for the full content spec and schema mapping.
- **Persona Indicators:** Colour-coded pill tags on every module (Leader / Apprentice / Architect / Engineer).
- **Literacy Checkpoints:** "After this, you can read:" callouts linking to real frontier articles.

---

## 4. Target Personas

Five core personas, defined below. See the **Specialisation Extensions** block at the end of this section for cross-cutting paths that don't map to a single persona.

### A. The Curious Beginner
*Student, career-changer, non-technical professional who has used ChatGPT but has no programming background.*
- **Focus:** Concepts, vocabulary, intuition-building. No code.
- **Goal:** Understand what AI can and cannot do; read AI news intelligently; hold informed conversations with technical teams.
- **Style:** Analogies, interactive concept cards, visual explainers.

### B. Tech Leaders (CTO, VP, Director, Manager)
*Technical background but now managing teams and budgets.*
- **Focus:** GRC (Governance, Risk, Compliance), ROI measurement, EU AI Act, team strategy, buy-vs-build.
- **Goal:** Informed decision-making, risk mitigation, strategic AI integration.
- **Style:** Executive briefings, decision frameworks, risk matrices.

### C. Junior / Entry-Level Developers
*Can code but new to AI APIs.*
- **Focus:** LLM API fundamentals, structured outputs, simple RAG, first deployable feature.
- **Goal:** Ship their first AI feature confidently.
- **Style:** Step-by-step guided tutorials with working code.

### D. Mid / Senior Developers (AI Architects)
*Experienced engineers moving into AI system design.*
- **Focus:** Agentic workflows, context engineering, evaluation-driven development, multi-agent system design, DSPy.
- **Goal:** Design reliable, autonomous multi-agent systems at production scale.
- **Style:** Code-first deep dives, architectural pattern libraries, failure mode analysis.

### E. SRE / Platform / DevOps Engineers
*Responsible for running AI workloads in production.*
- **Focus:** Self-hosted inference (vLLM/Ollama), fine-tuning pipelines, GPU orchestration, observability, cost optimisation.
- **Goal:** Production-grade model serving, reliability, and observability.
- **Style:** Benchmarks, config guides, operational runbooks.

### Specialisation Extensions
A Specialisation Extension is a learning path that cuts across one or more existing personas rather than defining a new one. Extensions are not independent personas and do not require new UI persona definitions. Each Extension:
- Inherits the UI persona pill(s) of its primary audience.
- Adds one additional `specialisation` pill (e.g., `multimodal`) to distinguish it in navigation.
- Is optional relative to the core paths — completing it deepens expertise but is not a prerequisite for anything else.

**Current extensions:**
- **Path F: Multimodal Specialist** — inherits `sr-dev` pill, adds `multimodal` pill. Primary audience: Sr Dev and SRE engineers whose systems handle images, audio, or video.

---

## 5. Curriculum Matrix

Nine tracks. Tracks 1–3 are universal foundations. Tracks 4–9 are specialist depth. Every module maps to one or more personas.

---

### Track 1: How AI Actually Works (Foundations)
*For everyone. No code required until Module 5.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 1.1 | What is an LLM? (Plain English) | All | Neural nets as function approximators, training vs. inference, why scale matters |
| 1.2 | Tokens, Context Windows & Attention | All → Dev | Tokenization, BPE, context window as working memory, **quadratic attention cost** (O(n²) — doubling context = 4× compute, a primary design constraint) |
| 1.3 | How Models Are Made | Curious / Leader | Pre-training, RLHF, Constitutional AI, instruction tuning |
| 1.4 | Prompting Fundamentals | All | System/user/assistant turns, few-shot, chain-of-thought, zero-shot |
| 1.5 | Structured Outputs | Jr Dev → Sr Dev | JSON mode, Pydantic/Instructor, why structured > string parsing |
| 1.6 | Model Families & Trade-offs | Leader / Dev | Frontier vs. open-weight, parameter count, capability vs. cost vs. privacy |
| 1.7 | Quantisation & Local Models | Dev / SRE | GGUF format, INT4/INT8/5-bit, VRAM as hard constraint, GPU offloading, why small quantised models structurally fail at multi-step tool use |
| 1.8 | DSPy: Programmatic Prompt Optimisation | Sr Dev | Moving past manual prompting, declarative LM programs, compiled prompts |
| 1.9 | Multimodal AI | All Devs | Vision models (GPT-4o, Claude, LLaVA/LLaVA-NeXT), audio transcription (Whisper, Parakeet), video understanding; how multimodal inputs change the context engineering problem; when to use vision vs. OCR |

**Unknown Unknowns surfaced here:**
- Quadratic attention cost as a primary design constraint — not a footnote, a cost driver
- Why small quantised models structurally fail at multi-step tool use (instruction-following fidelity at low parameter counts) — not just a hardware problem
- Multimodal inputs expand the prompt injection attack surface to images and audio

---

### Track 2: Knowledge & Memory (RAG & Context Engineering)
*The most misunderstood layer. Junior devs get "RAG adds context" — this track gives the full systems picture.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 2.1 | Vector Similarity & Embeddings | Jr Dev → | Cosine similarity, embedding spaces, what makes a good embedding model, dimensionality |
| 2.2 | Vector Stores & Indexing | Jr Dev → | Chroma (local), Qdrant/Pinecone (production), what an index actually is, insert/query patterns, hosted vs. self-hosted tradeoffs — the conceptual bridge before building a RAG pipeline |
| 2.3 | Basic RAG Pipeline | Jr Dev | Chunk → embed → store → retrieve → augment; wiring 2.1 and 2.2 into a working system |
| 2.4 | Chunking Strategy Trade-offs | Sr Dev | Small = precise retrieval, large = richer context, semantic vs. fixed-size; no universal answer |
| 2.5 | Query Augmentation | Sr Dev | Rewriting messy queries before retrieval (HyDE, multi-query); most skipped, often highest-leverage improvement |
| 2.6 | Advanced Retrieval | Sr Dev | ColBERT late interaction, hybrid BM25 + dense, reranking |
| 2.7 | GraphRAG & Knowledge Graphs | Sr Dev | Neo4j, entity-relationship extraction, when graphs beat vectors |
| 2.8 | Context Engineering | Sr Dev | **Context engineering vs. prompt engineering** — system-level architecture around the context window, not instruction phrasing |
| 2.9 | Context Failure Taxonomy | Sr Dev | **Poisoning** (wrong info compounds), **Distraction** (irrelevant data overwhelms reasoning), **Confusion** (ambiguous instructions), **Clash** (contradictory information) — name them to debug them |
| 2.10 | Hybrid Memory Architecture | Sr Dev | Short-term (context window) + long-term (vector/episodic stores) + working memory (in-flight scratchpad) |
| 2.11 | Multimodal RAG | Sr Dev | Indexing images (CLIP embeddings, captioning pipelines), audio chunking (Whisper + text store), cross-modal retrieval, assembling multimodal context without blowing the context budget |

**Unknown Unknowns surfaced here:**
- Context failure taxonomy (poisoning/distraction/confusion/clash) — practitioners discover experimentally; naming them halves debugging time
- Query augmentation — consistently skipped in tutorials, often the highest single-module ROI improvement
- Context engineering as a distinct discipline from prompt engineering
- Multimodal RAG requires fundamentally different chunking strategies (images can't be split mid-sentence)

---

### Track 3: Interaction & Protocols (Tools, MCP & the Agentic Web)
*The protocol layer is the fastest-moving area of AI engineering in 2026.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 3.1 | Tool Calling Fundamentals | Jr Dev → | Function calling, tool schemas, when agents call tools |
| 3.2 | Model Context Protocol (MCP) | All Devs | The n×m integration problem, MCP as a standard, tool discovery, Linux Foundation ownership |
| 3.3 | Agent2Agent (A2A) | Sr Dev | How agents discover and communicate with other agents via capability cards at well-known URLs — analogous to DNS/service discovery |
| 3.4 | AG-UI: Streaming Protocol | Sr Dev | SSE (Server-Sent Events) standard abstracting framework-specific event formats from the frontend |
| 3.5 | Agent Payments Protocol (AP2) | Leader / Sr Dev | Cryptographic mandate chains for agent spending authorisation, audit trails, approval workflows — an entirely new infrastructure category |
| 3.6 | LiteLLM: API Standardisation | Jr Dev / SRE | Unified API proxy across 100+ providers, model routing, fallbacks, cost tracking |
| 3.7 | Curated Tool Selection | Sr Dev | **Why fewer tools outperform large tool catalogs** — agents get confused by too many options; curation is an architectural decision |
| 3.8 | AGENTS.md Convention | Sr Dev | Repo-level machine-readable config encoding codebase-specific rules for AI agents — emerging standard in engineering orgs |

**Unknown Unknowns surfaced here:**
- Agent Payments Protocol (AP2) — cryptographic authorisation for agentic commerce is an entirely new infrastructure category
- Capability cards / agent discovery (A2A) — the agent equivalent of DNS/service discovery
- AGENTS.md as organisational infrastructure
- Why curated small tool sets beat large catalogs (counterintuitive, production-validated)

---

### Track 4: Agentic Brains (Orchestration & Architecture)
*Where agents go wrong at scale — and the patterns that prevent it.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 4.1 | What Is an Agent? (Actually) | All | The "agent as coworker" vs. "agent as chatbot" paradigm shift |
| 4.2 | LangGraph: State-Machine Agents | Jr Dev → | Nodes, edges, state, cyclical workflows, conditional routing |
| 4.3 | CrewAI: Multi-Agent Role Teams | Jr Dev → | Role-based agents, crew composition, task delegation |
| 4.4 | Multi-Agent Failure Modes | Sr Dev | The "bag of agents" anti-pattern, implicit state assumptions, the **17× error trap** (3 agents at 90% accuracy = 73% system accuracy) |
| 4.5 | Typed Contracts at Agent Boundaries | Sr Dev | **Discriminated union / action schema pattern** — typed action schemas eliminate open-ended agent output ambiguity; machine-checkable contracts stop bad state propagating |
| 4.6 | Subagent Orchestration | Sr Dev | Decomposing complex tasks, supervisor vs. peer architectures, hierarchical delegation |
| 4.7 | Sandbox Isolation | Sr Dev / SRE | Modal, Daytona, Runloop — purpose-built ephemeral compute for agents with full permissions; not just Docker |
| 4.8 | Cognitive Architectures | Sr Dev | Memory + planning + tool loops; ReAct/Plan-and-Execute/Reflexion pattern family |
| 4.9 | Internal Coding Agents | Sr Dev / Leader | Slack-first invocation, integrating with Linear/GitHub/CI, rich startup context, AGENTS.md + sandbox stack |
| 4.10 | Middleware & Deterministic Injection | Sr Dev | Hybrid architecture mixing rule-based guardrails with LLM reasoning — reliability without losing flexibility |

**Unknown Unknowns surfaced here:**
- Discriminated union / action schema pattern — production-hardened but invisible in popular tutorials
- The 17× error trap — system accuracy compounds across agents
- Sandbox providers as a distinct infrastructure category
- Treating agent-to-agent communication as a typed API contract

---

### Track 5: Engine Room (Infrastructure, Serving & Fine-Tuning)
*Running and customising AI workloads in production.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 5.1 | Local LLM Stack | Jr Dev / SRE | Ollama → LM Studio → llama.cpp, hardware requirements |
| 5.2 | VRAM Management & Quantisation | SRE / Sr Dev | VRAM as hard constraint vs. RAM, quantisation precision tradeoffs in practice, GPU offloading strategies. *Multimodal note: vision models carry 2–4× the VRAM cost of equivalent text models; see 9.5 for multimodal-specific budgeting.* |
| 5.3 | vLLM: Production Serving | SRE | PagedAttention, continuous batching, throughput vs. latency tradeoffs. *Multimodal note: image tokens are variable-size and break uniform-batch assumptions; see 9.5 for multimodal batching specifics.* |
| 5.4 | Speculative Decoding | SRE / Sr Dev | Draft model + verifier, where it wins and where it doesn't |
| 5.5 | Mixture of Experts (MoE) | SRE / Sr Dev | Sparse activation, why MoE models are memory-hungry but compute-efficient |
| 5.6 | Small Language Models (SLMs) | All Devs | Edge deployment, Phi/Gemma/Qwen families, task-specific vs. general capability |
| 5.7 | Context Length vs. Performance | SRE / Sr Dev | "Context rot" — why very long contexts degrade performance, and architectural mitigations |
| 5.8 | LLM Gateway Patterns | SRE | LiteLLM as gateway, load balancing, model fallbacks, cost ceilings |
| 5.9 | Fine-Tuning: When & Why | Sr Dev / SRE / Leader | Full fine-tune vs. LoRA vs. RAG vs. prompting — the actual decision framework; common mistake: fine-tuning when RAG would suffice; data requirements; catastrophic forgetting |
| 5.10 | LoRA, QLoRA & PEFT | Sr Dev / SRE | Low-Rank Adaptation mechanics, Quantised LoRA (4-bit base + LoRA adapters), Hugging Face PEFT library, training on consumer hardware, merging and serving adapters, adapter versioning |

**Unknown Unknowns surfaced here:**
- Fine-tuning is often the wrong answer — RAG, prompting, and DSPy frequently outperform it at a fraction of the cost; the decision framework matters more than the technique
- Catastrophic forgetting — fine-tuning on a narrow dataset degrades general capability in ways that are hard to measure
- Adapter versioning and serving — running multiple LoRA adapters on a single base model is an emerging production pattern

---

### Track 6: Control Room (Evaluation & LLMOps)
*The most under-taught, most production-critical track. Evaluation drives architecture — not just ops.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 6.1 | Why Evaluation Is Hard | All Devs | The Three Gulfs: Comprehension (can't review at scale), Specification (prompts don't fully capture intent), Generalisation (models fail inconsistently on edge cases) — **read this before building agents** |
| 6.2 | Code-Based Evals | Jr Dev → | Deterministic checks for deterministic tasks — cheap, CI/CD-friendly, the eval you should always start with |
| 6.3 | LLM-as-Judge | Sr Dev | When to use it, **why binary PASS/FAIL outperforms Likert scales**, hand-labelling with written critiques (not just labels), judge drift over time |
| 6.4 | Error Analysis Workflow | Sr Dev | **Open coding → axial coding → quantitative prioritisation** (adapted from grounded theory). This is how production companies actually debug — invisible in curricula |
| 6.5 | RAGAS & RAG Evaluation | Jr Dev → | Faithfulness, context recall, answer relevancy |
| 6.6 | Synthetic Data for Eval | Sr Dev | Bootstrapping evaluation before real production traffic exists |
| 6.7 | CI/CD-Integrated Evals | Sr Dev / SRE | Eval as a test gate, regression detection, model upgrade validation |
| 6.8 | Observability Stack | All Devs | Langfuse, LangSmith, Arize Phoenix — trace-level visibility vs. log-level visibility |
| 6.9 | Evaluating the Evaluator | Sr Dev | Production monitoring that validates your evals themselves remain trustworthy — the meta-loop most teams skip |

**Unknown Unknowns surfaced here:**
- LLM-as-Judge calibration details (binary > Likert, judge drift, critique-based labelling)
- Error analysis as a discipline (open coding → axial coding) — borrowed from qualitative research
- "Evaluating the evaluator" — the meta-loop that closes the production monitoring cycle
- Evaluation is a design input, not a post-hoc check — agents built without an eval harness are unsteerable

---

### Track 7: Safety, Red Teaming & Compliance
*Offensive and defensive. Required for production, often taught last — should be taught early.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 7.1 | The AI Safety Landscape | All | Hallucination, bias, misuse — the full threat model beyond "the AI might lie" |
| 7.2 | OWASP Top 10 for LLM Applications | All Devs | Prompt injection (#1), insecure output handling, **data exfiltration via indirect injection** (#2), training data poisoning, **supply chain vulnerabilities (#3)** |
| 7.3 | Prompt Injection & Jailbreaking | All Devs | Direct vs. indirect injection, **jailbreaking taxonomies** (roleplay, token manipulation, nested instruction), why it's structurally hard to solve, **data exfiltration via exfiltration prompts in retrieved content**, current mitigations and their limits |
| 7.4 | Supply Chain Vulnerabilities | Sr Dev / Leader | Compromised model weights, poisoned fine-tuning data, malicious third-party MCP servers/plugins — entirely absent from traditional software supply chain thinking. ⚠️ **Authoring note:** Layer 1 must be written for a non-technical Leader audience (business risk framing, no implementation detail). Layer 2 covers technical mitigations for Sr Dev/SRE. |
| 7.5 | Guardrails as Infrastructure | Sr Dev | External guardrails (NeMo Guardrails, Guardrails.ai, Lakera) vs. in-prompt mitigation — the LLM should not be its own safety system |
| 7.6 | Red Teaming Methodology | Sr Dev / Leader | Garak, DeepTeam, refusal-aware red teaming, adversarial testing requirements under EU AI Act, building a repeatable red team process |
| 7.7 | Kill Switches & Human-in-the-Loop | Sr Dev / SRE | Mandatory intervention points for high-stakes tool calls, approval workflows, graceful degradation |
| 7.8 | EU AI Act & GRC | Leader | Risk classification tiers, prohibited uses, compliance obligations, audit requirements, the timeline |
| 7.9 | Constitutional AI & RLHF | Sr Dev | Anthropic's Constitutional AI approach, RLHF mechanics, how safety is baked in at training time vs. applied at inference |

**Unknown Unknowns surfaced here:**
- Supply chain vulnerabilities — OWASP LLM #3, entirely absent from traditional software supply chain thinking
- Indirect prompt injection via retrieved content — the RAG pipeline is an attack surface
- Jailbreaking is a spectrum of techniques, not a single problem — different defences are needed for different attack classes
- Malicious MCP servers — as MCP adoption grows, third-party tool servers become a new supply chain risk

---

### Track 8: AI Strategy & Organisational Integration
*For leaders — but senior devs should read this too.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 8.1 | AI Landscape 2026 | Leader / All | Generative AI, multimodal, autonomous agents, local/SLMs — where we are and where we're going |
| 8.2 | ROI Measurement | Leader | Time-to-Value, operational efficiency, knowledge velocity — frameworks that work in board rooms |
| 8.3 | Buy vs. Build vs. Tune | Leader | Decision matrix, total cost of ownership, when fine-tuning is actually the answer, when it isn't |
| 8.4 | AI-First Team Structure | Leader | Roles (AI Architect, ML Eng, AI PM), culture, responsible AI practice |
| 8.5 | The Make-vs-Maintain Trap | Leader / Sr Dev | Why forking frameworks is a long-term liability; how to evaluate framework lock-in |
| 8.6 | Data Privacy & GDPR | Leader / Sr Dev | What data goes into the LLM context, data residency, sovereign AI options |
| 8.7 | Agent Economics | Leader | Cost per agent action, billing models for multi-agent systems, AP2 infrastructure question |

---

### Track 9: Multimodal AI (Deep Dive)
*Vision, audio, and cross-modal systems. A frontier track — builds on Tracks 1 and 2.*

| # | Module | Personas | Key Concepts |
|---|---|---|---|
| 9.1 | Vision Models in Production | Sr Dev / SRE | GPT-4o Vision, Claude's vision API, LLaVA for self-hosting; structured extraction from images; when vision beats OCR and vice versa |
| 9.2 | Audio & Speech AI | Sr Dev / SRE | Whisper (transcription), Parakeet (streaming), TTS pipelines; speaker diarisation; real-time vs. batch transcription |
| 9.3 | Multimodal Agents | Sr Dev | Agents that see, hear, and act; combining vision + tool use; failure modes specific to multimodal pipelines |
| 9.4 | Multimodal Safety | Sr Dev / Leader | Image-based prompt injection, audio adversarial attacks, deepfakes as an organisational risk, compliance gaps |
| 9.5 | Serving Multimodal Models | SRE | VRAM budgets for vision models, batching multimodal inputs, cost per image token vs. text token |

---

## 6. Learning Paths

Curated module sequences for each persona. Prerequisites listed. Evaluation is introduced early in Architect path — it drives architecture decisions.

---

### Path A: The Curious Beginner
*Zero coding required. Pure comprehension.*

**Prerequisites:** None.

1. **1.1** — What is an LLM? (Plain English)
2. **1.3** — How Models Are Made
3. **1.6** — Model Families & Trade-offs
4. **7.1** — The AI Safety Landscape
5. **8.1** — AI Landscape 2026

**Literacy checkpoint:** After this path, you can read AI news intelligently, hold informed conversations with technical teams, and understand why "just asking it nicely" isn't a reliable safety strategy.

---

### Path B: The Executive Briefing (Tech Leaders)
*Decision-making, risk, and strategy.*

**Prerequisites:** Curious Beginner path (or equivalent context).

1. **1.2** — Tokens, Context Windows & Attention (conceptual layer only)
2. **3.2** — MCP (the integration problem, not the code)
3. **3.5** — Agent Payments Protocol (the new commercial infrastructure)
4. **8.2** — ROI Measurement
5. **8.3** — Buy vs. Build vs. Tune
6. **8.4** — AI-First Team Structure
7. **7.8** — EU AI Act & GRC
8. **7.4** — Supply Chain Vulnerabilities (executive summary layer)
9. **8.6** — Data Privacy & GDPR
10. **8.7** — Agent Economics
11. **8.5** — The Make-vs-Maintain Trap

**Literacy checkpoint:** After this path, you can read Google's Developers Guide to AI Agent Protocols and understand the business implications — not just the protocols themselves.

---

### Path C: The AI Apprentice (Junior Devs)
*First deployable AI feature. Deliberately paced — no conceptual gaps.*

**Prerequisites:** Basic Python/JS. API familiarity.

1. **1.1** — What is an LLM?
2. **1.2** — Tokens & Context Windows
3. **1.4** — Prompting Fundamentals
4. **1.5** — Structured Outputs
5. **6.1** — Why Evaluation Is Hard *(introduced early — build with evals in mind from the start)*
6. **6.2** — Code-Based Evals *(write your first eval before your first feature)*
7. **2.1** — Vector Similarity & Embeddings
8. **2.2** — Vector Stores & Indexing *(the conceptual bridge — don't skip this)*
9. **2.3** — Basic RAG Pipeline
10. **3.1** — Tool Calling Fundamentals
11. **3.2** — MCP (hands-on)
12. **3.6** — LiteLLM
13. **6.5** — RAGAS & RAG Evaluation
14. **6.8** — Observability Stack (Langfuse basics)
15. **7.2** — OWASP Top 10 for LLM Applications

**Literacy checkpoint:** After this path, you can read the InfoWorld article on running Qwen3.5 locally and understand *why* the local 9B model failed at agentic tasks — not just that it did.

---

### Path D: The AI Architect (Mid/Senior Devs)
*Production multi-agent systems. Evaluation introduced early — it drives architecture.*

**Prerequisites:** Apprentice path (or equivalent experience).

**Phase 1 — Evaluation-First Foundation**
1. **6.1** — Why Evaluation Is Hard *(re-read with fresh eyes — now it changes your architecture decisions)*
2. **6.3** — LLM-as-Judge
3. **6.4** — Error Analysis Workflow

**Phase 2 — Advanced Knowledge**
4. **1.7** — Quantisation & Local Models
5. **1.8** — DSPy
6. **2.4** — Chunking Strategy Trade-offs
7. **2.5** — Query Augmentation
8. **2.6** — Advanced Retrieval
9. **2.7** — GraphRAG
10. **2.8** — Context Engineering
11. **2.9** — Context Failure Taxonomy
12. **2.10** — Hybrid Memory Architecture

**Phase 3 — Protocols & Tooling**
13. **3.3** — Agent2Agent (A2A)
14. **3.4** — AG-UI Streaming Protocol
15. **3.7** — Curated Tool Selection
16. **3.8** — AGENTS.md Convention

**Phase 4 — Agent Architecture**
17. **4.2** — LangGraph
18. **4.3** — CrewAI
19. **4.4** — Multi-Agent Failure Modes
20. **4.5** — Typed Contracts at Agent Boundaries
21. **4.6** — Subagent Orchestration
22. **4.7** — Sandbox Isolation
23. **4.8** — Cognitive Architectures
24. **4.9** — Internal Coding Agents
25. **4.10** — Middleware & Deterministic Injection

**Phase 5 — Production Eval & Safety**
26. **6.6** — Synthetic Data for Eval
27. **6.7** — CI/CD-Integrated Evals
28. **6.9** — Evaluating the Evaluator
29. **7.3** — Prompt Injection & Jailbreaking
30. **7.4** — Supply Chain Vulnerabilities
31. **7.5** — Guardrails as Infrastructure

**Fine-Tuning (Optional Extension)**
32. **5.9** — Fine-Tuning: When & Why
33. **5.10** — LoRA, QLoRA & PEFT

**Literacy checkpoint:** After this path, you can fully read and implement from the Open SWE framework article and the Google Agent Protocols guide — understanding not just the what but the engineering trade-offs behind each decision.

---

### Path E: The LLM Engineer (SRE/DevOps)
*Running AI workloads reliably and cheaply, including custom model adaptation.*

**Prerequisites:** Linux, Docker, networking basics.

1. **1.2** — Tokens & Context Windows (the cost implications)
2. **1.7** — Quantisation & Local Models
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
13. **3.6** — LiteLLM (gateway configuration)
14. **6.7** — CI/CD-Integrated Evals
15. **6.8** — Observability Stack
16. **4.7** — Sandbox Isolation
17. **7.7** — Kill Switches & Human-in-the-Loop
18. **7.4** — Supply Chain Vulnerabilities (model weights and plugins)

**Literacy checkpoint:** After this path, you can read the Qwen3.5 local inference article and immediately identify the VRAM headroom mistakes, the quantisation tradeoffs chosen, and what production serving changes you'd make.

---

### Path F: The Multimodal Specialist
*For engineers building systems that see, hear, and act. A focused extension path — not a prerequisite for other paths.*

**Persona tag:** Inherits `sr-dev` pill + additional `multimodal` specialisation pill. Not a standalone persona — see Section 4 note on Specialisation Extensions.

**Prerequisites:** Apprentice path (or equivalent). Ideally, familiarity with basic RAG (Track 2 modules 2.1–2.3).

**Note:** Track 9 exists as a standalone specialisation track. Multimodal content is deliberately *not* embedded deep in Paths D and E — it would bloat those paths for learners who don't need it. This path is the entry point for anyone whose system handles images, audio, or video.

**Phase 1 — Foundations**
1. **1.9** — Multimodal AI *(overview of the full landscape — vision, audio, video)*
2. **2.11** — Multimodal RAG *(indexing and retrieving non-text content)*

**Phase 2 — Production Systems**
3. **9.1** — Vision Models in Production
4. **9.2** — Audio & Speech AI
5. **9.3** — Multimodal Agents
6. **9.5** — Serving Multimodal Models

**Phase 3 — Safety**
7. **9.4** — Multimodal Safety *(image injection, audio adversarial attacks, deepfakes)*
8. **7.3** — Prompt Injection & Jailbreaking *(multimodal attack surface extension)*

**Optional: Infrastructure depth**
9. **5.2** — VRAM Management & Quantisation *(vision models carry 2–4× the VRAM cost of equivalent text models — the principles in 5.2 apply, but the numbers are different; 9.5 covers the multimodal-specific deltas)*
10. **5.3** — vLLM: Production Serving *(multimodal batching is covered in 5.3 for text; note that image tokens are variable-size and break uniform-batch assumptions — 9.5 covers the multimodal-specific handling)*

**Literacy checkpoint:** After this path, you can read a production engineering post on deploying multimodal pipelines — for example, a specific post from the LlamaIndex or Weaviate engineering blogs on multimodal RAG — and evaluate whether the system has adequately addressed its retrieval strategy, VRAM budget, and expanded safety attack surface.

> **TODO (content team):** Replace this placeholder with a link to a specific published article before Path F ships. Suggested sources: LlamaIndex blog, Weaviate blog, or modal.com engineering posts (2024–2026). This path must not go live with an unlinked checkpoint.

---

## 7. The "Unknown Unknowns" Modules
*Cross-cutting content surfaced prominently — not buried in advanced tracks.*

These are the concepts practitioners discover only after painful production failures. We surface them early and often — not as footnotes in advanced modules, but as named, first-class topics that change how you design systems.

| Concept | Why It Matters | Where Taught |
|---|---|---|
| Quadratic attention cost (O(n²)) | Doubling context length = 4× compute — primary design constraint | 1.2 |
| Context failure taxonomy | Named failure modes halve debugging time | 2.9 |
| Query augmentation | Often highest-leverage RAG improvement, consistently skipped | 2.5 |
| Context engineering vs. prompt engineering | System-level vs. instruction-level — different problem, different tools | 2.8 |
| Discriminated union / action schema pattern | Eliminates open-ended agent output ambiguity | 4.5 |
| The 17× error trap | System accuracy = product of each agent's accuracy | 4.4 |
| Sandbox isolation providers | Modal/Daytona/Runloop — purpose-built, not just Docker | 4.7 |
| AGENTS.md convention | Machine-readable repo config for AI agents | 3.8, 4.9 |
| Agent Payments Protocol (AP2) | Cryptographic authorisation for agentic commerce | 3.5 |
| Capability cards / A2A discovery | Agent equivalent of DNS | 3.3 |
| LLM supply chain vulnerabilities | OWASP LLM #3 — absent from traditional supply chain thinking | 7.4 |
| LLM-as-Judge calibration | Binary > Likert, judge drift, critique-based labelling | 6.3 |
| Error analysis discipline | Open coding → axial coding → prioritisation | 6.4 |
| Evaluating the evaluator | The meta-loop most teams skip | 6.9 |
| Fine-tuning is often wrong | RAG/DSPy/prompting frequently outperform fine-tuning at a fraction of cost | 5.9 |
| Catastrophic forgetting | Narrow fine-tuning degrades general capability in unmeasured ways | 5.9 |
| Indirect prompt injection via RAG | The retrieval pipeline is an attack surface | 7.3 |
| Multimodal inputs expand attack surface | Images and audio are injectable — not just text | 1.9, 7.2 |

---

## 8. Content Specifications

### Progressive Disclosure: Full Spec

Every module is authored in three explicit layers. The content schema encodes which layer each section belongs to. Authors must write all three; the UI renders them conditionally.

**Layer 1 — Surface (always visible)**
- 2–3 sentence plain-English summary of what the concept is and why it matters.
- A single Mermaid.js diagram (or illustration placeholder).
- A "Production Gotcha" callout — the one thing that bites people in practice.
- Persona tags and prerequisite links.
- Target reading time: < 3 minutes.

**Layer 2 — Guided (visible by default for Dev personas; toggle for others)**
- Step-by-step walkthrough with working, annotated code.
- "Before vs. After" comparisons where applicable.
- Common mistakes and how to identify them.
- Target reading time: 10–20 minutes.

**Layer 3 — Deep Dive (behind toggle for all personas)**
- Architecture-level analysis: why this design was chosen over alternatives.
- Production failure modes with named taxonomy.
- Performance benchmarks or cost analysis where relevant.
- Links to primary sources (papers, RFCs, official docs).
- Target reading time: 30+ minutes.

**Content Schema Mapping (Astro Content Collections)**
```
difficulty: 'conceptual' | 'guided' | 'deep-dive'  // maps to Layer 1/2/3
persona: ('beginner' | 'leader' | 'junior' | 'senior' | 'sre')[]
layer1_summary: string           // required
layer2_walkthrough?: string      // required if difficulty >= 'guided'
layer3_analysis?: string         // required if difficulty == 'deep-dive'
production_gotcha: string        // required on all modules
mermaid_diagram?: string         // optional but strongly encouraged
```

**Author Guidelines**
- Write Layer 1 first, always. If you can't explain it in 3 sentences, you don't understand it yet.
- Layer 2 code must run. No pseudocode.
- Layer 3 must cite a primary source (paper, RFC, official changelog). No secondary-source-only deep dives.
- The toggle label is "Show Deep Dive ↓" / "Hide Deep Dive ↑" — not "Advanced" (labels create anxiety).

---

### Anatomy of a Module (rendered output)
1. **Header:** Title, persona tags, prerequisites, estimated time per layer.
2. **Layer 1:** Summary + diagram + Production Gotcha.
3. **"Deep Dive" toggle** — renders Layers 2 and 3 on click.
4. **Layer 2:** Guided walkthrough with code.
5. **Layer 3:** Architecture analysis + benchmarks + sources.
6. **Literacy Checkpoint:** "After this module, you can read: [article link]."
7. **Glossary Links:** Every new term hyperlinked inline.

### Content Tone
- Direct. Architectural. Focus on *why* as much as *how*.
- No "in this tutorial we will learn..." preamble.
- Assume the reader is intelligent, not experienced.

---

## 9. Glossary & Concept Card System

- **Glossary:** ~200 terms with plain-English definitions + persona-appropriate elaborations.
- **Concept Cards:** Bite-sized visual explainers (MCP, attention, quantisation, LoRA, etc.) — embeddable anywhere.
- **Cross-linking:** Every term in every module links to its glossary entry.

---

## 10. Implementation Phases

### Phase 1: Content Foundation
- Draft Track 1 (Foundations) + Track 7 (Safety) first — universal, high-leverage content.
- Build Glossary and Concept Card system.
- Publish Path A (Curious Beginner) and Path B (Executive Briefing) as first complete paths.
- All content written to the three-layer spec before Phase 2 begins.

### Phase 2: Technical Architecture
- Bento-Grid landing page with persona selector.
- Faceted navigation (filter by persona, track, difficulty).
- Module pages with Progressive Disclosure toggle (see Section 8 for full spec).
- Mermaid.js diagram pipeline.

### Phase 3: Dev Paths Live
- Complete Tracks 2–4 (Knowledge, Interaction, Agentic) + Track 9 (Multimodal).
- Publish Path C (Apprentice) and Path D (Architect).
- Add "Literacy Checkpoint" links per module.

### Phase 4: Infrastructure, Fine-Tuning & Ops
- Complete Tracks 5–6 (Engine Room, LLMOps) including fine-tuning modules.
- Publish Path E (LLM Engineer).
- CI/CD-integrated eval content.

### Phase 5: Interactive Labs
*Scoped conservatively. Each lab must justify its maintenance cost.*

| Lab | What It Demonstrates | Tech Stack | Scope |
|---|---|---|---|
| **Local LLM Setup Guide** | End-to-end: hardware check → download → run → Connect to VS Code via Continue | Static MDX with hardware selector, no server needed | Low maintenance |
| **MCP Playground** | Connect one real tool (filesystem or GitHub) to Claude Desktop or a LangGraph agent; see tool calls in a trace viewer | Pre-built MCP server (TypeScript), embedded trace viewer (iframe to Langfuse public demo) | Medium; use Langfuse public endpoint to avoid self-hosting |
| **RAG Chunking Visualiser** | Upload a PDF; see it split into chunks; see which chunks are retrieved for a query; see the final context assembled | Python (FastAPI) + React; Cloudflare Workers with **Workers KV (TTL: 30 min)** for session state — D1 is a persistent database and is explicitly excluded; each session is keyed by a random UUID and expires automatically | Medium; stateless by design — no data survives the TTL |
| **Red Team Lab** | 10 graded prompt injection challenges; pass the injection, then learn the fix | Static MDX challenges + client-side JS judge; no LLM call required | Low; fully static |
| **Agent Trace Explorer** | Pre-recorded LangGraph execution traces; interactive step-through showing state at each node | Static JSON trace files + React trace viewer (no live LLM) | Low; no live dependencies |

*Labs deferred to Phase 5 explicitly to avoid under-building interactive features before content is proven valuable. Revisit scope after Phase 3 traffic data.*
