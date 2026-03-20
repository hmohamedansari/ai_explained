# Target Personas
> Last reviewed: 2026-03-20 | Volatility: `stable`
> Owner: [unassigned] | Reviewer: [unassigned]

Five core personas plus one specialisation extension. Persona definitions drive UI pill colours, content layer defaults, and path sequencing.

---

## A. The Curious Beginner

*Student, career-changer, non-technical professional who has used ChatGPT but has no programming background.*

- **Focus:** Concepts, vocabulary, intuition-building. No code.
- **Goal:** Understand what AI can and cannot do; read AI news intelligently; hold informed conversations with technical teams.
- **Style:** Analogies, interactive concept cards, visual explainers.
- **UI pill:** `beginner`
- **Default layer shown:** Layer 1 only.

---

## B. Tech Leaders (CTO, VP, Director, Manager)

*Technical background but now managing teams and budgets.*

- **Focus:** GRC (Governance, Risk, Compliance), ROI measurement, EU AI Act, team strategy, buy-vs-build.
- **Goal:** Informed decision-making, risk mitigation, strategic AI integration.
- **Style:** Executive briefings, decision frameworks, risk matrices, case studies, compliance checklists.
- **UI pill:** `leader`
- **Default layer shown:** Layer 1. Layer 2 toggled off by default.

---

## C. Junior / Entry-Level Developers

*Can code but new to AI APIs.*

- **Focus:** LLM API fundamentals, structured outputs (Pydantic/Instructor), simple RAG, first deployable feature.
- **Goal:** Ship their first AI feature confidently.
- **Style:** Step-by-step guided tutorials with working, copy-paste code.
- **UI pill:** `junior`
- **Default layer shown:** Layers 1 and 2.

---

## D. Mid / Senior Developers (AI Architects)

*Experienced engineers moving into AI system design.*

- **Focus:** Agentic workflows, context engineering, evaluation-driven development, multi-agent system design, DSPy, cognitive architectures.
- **Goal:** Design reliable, autonomous multi-agent systems at production scale.
- **Style:** Code-first deep dives, architectural pattern libraries, failure mode analysis.
- **UI pill:** `senior`
- **Default layer shown:** All layers.

---

## E. SRE / Platform / DevOps Engineers

*Responsible for running AI workloads in production.*

- **Focus:** Self-hosted inference (vLLM/Ollama), fine-tuning pipelines, GPU orchestration, observability, cost optimisation.
- **Goal:** Production-grade model serving, reliability, and observability.
- **Style:** Benchmarks, config guides, operational runbooks.
- **UI pill:** `sre`
- **Default layer shown:** Layers 1 and 2.

---

## Specialisation Extensions

A Specialisation Extension is a learning path that cuts across one or more existing personas rather than defining a new one. Extensions:

- Inherit the UI persona pill(s) of their primary audience.
- Add one additional `specialisation` pill to distinguish them in navigation.
- Are optional relative to the core paths — completing one deepens expertise but is not a prerequisite for anything else.

### Current Extensions

**Path F: Multimodal Specialist**
- Inherits `senior` pill + adds `multimodal` pill.
- Primary audience: Sr Dev and SRE engineers whose systems handle images, audio, or video.
- See `paths.md` for the full module sequence.
