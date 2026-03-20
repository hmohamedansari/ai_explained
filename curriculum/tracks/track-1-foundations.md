# Track 1: How AI Actually Works (Foundations)
> Last reviewed: 2026-03-20 | Personas: All
> Owner: [unassigned] | Reviewer: [unassigned]

*For everyone. No code required until Module 1.6.*

The baseline every other track builds on. Leaders read Layers 1 only. Devs go deeper.

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 1.1 | What is an LLM? (Plain English) | All | `stable` | `planned` |
| 1.2 | Tokens, Context Windows & Attention | All → Dev | `stable` | `planned` |
| 1.3 | How Models Are Made | Curious / Leader | `stable` | `planned` |
| 1.4 | Prompting Fundamentals | All | `stable` | `planned` |
| 1.5 | Sampling Parameters | All → Dev | `stable` | `planned` |
| 1.6 | Structured Outputs | Jr Dev → Sr Dev | `stable` | `planned` |
| 1.7 | Model Families & Trade-offs | Leader / Dev | `emerging` | `planned` |
| 1.8 | Quantisation & Local Models | Dev / SRE | `emerging` | `planned` |
| 1.9 | DSPy: Programmatic Prompt Optimisation | Sr Dev | `emerging` | `planned` |
| 1.10 | Multimodal AI | All Devs | `volatile` | `planned` |

---

## Module Details

### 1.1 — What is an LLM? (Plain English)
**Personas:** All
**Key concepts:** Neural nets as function approximators, training vs. inference, why scale matters.
**Note:** This is the gateway module. Layer 1 must be written for someone who has never programmed. Layer 2 introduces the transformer at a conceptual level only. Layer 3 links to the Attention Is All You Need paper.

---

### 1.2 — Tokens, Context Windows & Attention
**Personas:** All → Dev
**Key concepts:** Tokenization, BPE, context window as working memory, quadratic attention cost (O(n²) — doubling context = 4× compute).
**Production gotcha:** The quadratic cost of attention is a primary design constraint — not a footnote. A context that is twice as long costs four times as much to process. This is the single most important cost driver in deployed systems.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 1.3 — How Models Are Made
**Personas:** Curious Beginner / Leader
**Key concepts:** Pre-training, RLHF, Constitutional AI, instruction tuning.
**Note:** Layer 2 and Layer 3 optional for this module — the audience is non-technical. No code.

---

### 1.4 — Prompting Fundamentals
**Personas:** All
**Key concepts:** System/user/assistant turns, few-shot, chain-of-thought, zero-shot, ReAct pattern.

---

### 1.5 — Sampling Parameters
**Personas:** All → Dev
**Key concepts:** Temperature, Top-P, Top-K, frequency/presence penalties.
**Production gotcha:** Most developers leave these at defaults and then are surprised when outputs are either too random or too repetitive. Each parameter has a distinct effect — they are not interchangeable levers.

---

### 1.6 — Structured Outputs
**Personas:** Jr Dev → Sr Dev
**Key concepts:** JSON mode, Pydantic/Instructor, why structured > string parsing.
**Note:** First module with working code. Layer 2 must include a before/after: raw LLM string vs. typed Pydantic model.

---

### 1.7 — Model Families & Trade-offs
**Personas:** Leader / Dev
**Key concepts:** Frontier vs. open-weight, parameter count, capability vs. cost vs. privacy.
**Volatility note:** Model landscape changes rapidly. Review before publishing and add a "last verified" date to the model comparison table.

---

### 1.8 — Quantisation & Local Models
**Personas:** Dev / SRE
**Key concepts:** GGUF format, INT4/INT8/5-bit, VRAM as hard constraint, GPU offloading, why small quantised models structurally fail at multi-step tool use.
**Production gotcha:** The failure of small quantised models at agentic tasks is not a hardware problem — it is an instruction-following fidelity problem. A 7B INT4 model that scores well on benchmarks may still fail reliably at multi-step tool use.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 1.9 — DSPy: Programmatic Prompt Optimisation
**Personas:** Sr Dev
**Key concepts:** Moving past manual prompting, declarative LM programs, compiled prompts.
**Note:** Emphasise that DSPy changes the authoring model — you declare what you want, not how to phrase it. Layer 3 should compare hand-tuned prompts vs. DSPy-optimised prompts on a concrete task.

---

### 1.10 — Multimodal AI
**Personas:** All Devs
**Key concepts:** Vision models (GPT-4o, Claude, LLaVA/LLaVA-NeXT), audio transcription (Whisper, Parakeet), video understanding; how multimodal inputs change the context engineering problem; when to use vision vs. OCR.
**Production gotcha:** Multimodal inputs expand the prompt injection attack surface to images and audio — not just text.
**Volatility note:** Model capabilities change quickly. Link to Track 9 for production depth.

---

## Unknown Unknowns Surfaced

- Quadratic attention cost as a primary design constraint (1.2)
- Why small quantised models structurally fail at multi-step tool use (1.8)
- Multimodal inputs expand the prompt injection attack surface to images and audio (1.10)
