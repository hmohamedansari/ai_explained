# Track 5: Engine Room (Infrastructure, Serving & Fine-Tuning)
> Last reviewed: 2026-03-20 | Personas: SRE / Sr Dev / Leader

*Running and customising AI workloads in production.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 5.1 | Local LLM Stack | Jr Dev / SRE | `stable` | `planned` |
| 5.2 | VRAM Management & Quantisation | SRE / Sr Dev | `stable` | `planned` |
| 5.3 | vLLM: Production Serving | SRE | `emerging` | `planned` |
| 5.4 | Speculative Decoding | SRE / Sr Dev | `stable` | `planned` |
| 5.5 | Mixture of Experts (MoE) | SRE / Sr Dev | `stable` | `planned` |
| 5.6 | Small Language Models (SLMs) | All Devs | `emerging` | `planned` |
| 5.7 | Context Length vs. Performance | SRE / Sr Dev | `stable` | `planned` |
| 5.8 | LLM Gateway Patterns | SRE | `emerging` | `planned` |
| 5.9 | Fine-Tuning: When & Why | Sr Dev / SRE / Leader | `stable` | `planned` |
| 5.10 | LoRA, QLoRA & PEFT | Sr Dev / SRE | `emerging` | `planned` |

---

## Module Details

### 5.1 — Local LLM Stack
**Personas:** Jr Dev / SRE
**Key concepts:** Ollama → LM Studio → llama.cpp, hardware requirements, model download and management.
**Note:** Layer 2 must walk through a complete local setup — from hardware check to running a first inference. No assumed CUDA knowledge at Layer 2.

---

### 5.2 — VRAM Management & Quantisation
**Personas:** SRE / Sr Dev
**Key concepts:** VRAM as hard constraint vs. RAM, quantisation precision tradeoffs in practice, GPU offloading strategies.
**Production gotcha:** VRAM is a hard ceiling; exceeding it causes the model to crash or fall back to CPU at a severe performance penalty — not graceful degradation. Plan VRAM headroom explicitly.
**Multimodal note:** Vision models carry 2–4× the VRAM cost of equivalent text models. See 9.5 for multimodal-specific budgeting.

---

### 5.3 — vLLM: Production Serving
**Personas:** SRE
**Key concepts:** PagedAttention, continuous batching, throughput vs. latency tradeoffs.
**Note:** Layer 3 should benchmark vLLM vs. naive serving on a realistic concurrent-request workload to make the performance difference concrete.
**Multimodal note:** Image tokens are variable-size and break uniform-batch assumptions. See 9.5 for multimodal batching specifics.

---

### 5.4 — Speculative Decoding
**Personas:** SRE / Sr Dev
**Key concepts:** Draft model + verifier pattern, where speculative decoding wins (high-entropy tasks) and where it doesn't (already-fast small models).
**Production gotcha:** Speculative decoding adds infrastructure complexity. Only adopt it when throughput is the bottleneck and you have verified it helps on your specific workload.

---

### 5.5 — Mixture of Experts (MoE)
**Personas:** SRE / Sr Dev
**Key concepts:** Sparse activation, why MoE models are memory-hungry but compute-efficient, routing mechanisms.
**Note:** Cover Mixtral as the canonical open-weight MoE example. Layer 3 should explain why MoE models require more VRAM than their "active parameter count" implies.

---

### 5.6 — Small Language Models (SLMs)
**Personas:** All Devs
**Key concepts:** Edge deployment, Phi/Gemma/Qwen families, task-specific vs. general capability.
**Volatility note:** SLM landscape evolves rapidly. Verify model families before publishing. Cross-reference 1.8 (quantisation) for the failure modes of small models at agentic tasks.

---

### 5.7 — Context Length vs. Performance
**Personas:** SRE / Sr Dev
**Key concepts:** "Context rot" — why very long contexts degrade performance, and architectural mitigations (sliding window, summarisation, retrieval fallback).
**Production gotcha:** Many teams assume longer context = better performance. In practice, performance degrades non-linearly with context length on reasoning tasks. Benchmark your specific use case before relying on long context windows.

---

### 5.8 — LLM Gateway Patterns
**Personas:** SRE
**Key concepts:** LiteLLM as gateway, load balancing, model fallbacks, cost ceilings, RBAC for prompt access.
**Note:** Layer 2 should cover a concrete LiteLLM proxy configuration with at least one fallback rule and one cost ceiling. Layer 3 should cover RBAC patterns for multi-team deployments.

---

### 5.9 — Fine-Tuning: When & Why
**Personas:** Sr Dev / SRE / Leader
**Key concepts:** Full fine-tune vs. LoRA vs. RAG vs. prompting — the actual decision framework. Common mistake: fine-tuning when RAG would suffice. Data requirements. Catastrophic forgetting.
**Production gotcha:** Fine-tuning is often the wrong answer. RAG, prompting, and DSPy frequently outperform fine-tuning at a fraction of the cost. The decision framework is the module — not the technique.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

### 5.10 — LoRA, QLoRA & PEFT
**Personas:** Sr Dev / SRE
**Key concepts:** Low-Rank Adaptation mechanics, Quantised LoRA (4-bit base + LoRA adapters), Hugging Face PEFT library, training on consumer hardware, merging and serving adapters, adapter versioning.
**Production gotcha:** Running multiple LoRA adapters on a single base model is an emerging production pattern that most serving infrastructure does not support out of the box. Plan for adapter versioning from day one.
**Unknown Unknown:** Listed in `unknown-unknowns.md`.

---

## Unknown Unknowns Surfaced

- Fine-tuning is often the wrong answer — the decision framework matters more than the technique (5.9)
- Catastrophic forgetting — narrow fine-tuning degrades general capability in unmeasured ways (5.9)
- Adapter versioning and serving — running multiple LoRA adapters on a single base model is an emerging production pattern (5.10)
