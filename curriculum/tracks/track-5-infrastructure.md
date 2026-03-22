# Track 5: Engine Room (Infrastructure, Serving & Fine-Tuning)
> Last reviewed: 2026-03-20 | Personas: SRE / Sr Dev / Leader
> Owner: [unassigned] | Reviewer: [unassigned]

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
| 5.11 | Synthetic Data for Training & Distillation | Sr Dev / SRE | `emerging` | `planned` |
| 5.12 | Sovereign & Air-Gapped AI Architecture | Sr Dev / SRE / Leader | `emerging` | `planned` |
| 5.13 | Caching & Latency Engineering | SRE / Sr Dev | `stable` | `planned` |

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
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 5.10 — LoRA, QLoRA & PEFT
**Personas:** Sr Dev / SRE
**Key concepts:** Low-Rank Adaptation mechanics, Quantised LoRA (4-bit base + LoRA adapters), Hugging Face PEFT library, training on consumer hardware, merging and serving adapters, adapter versioning.
**Production gotcha:** Running multiple LoRA adapters on a single base model is an emerging production pattern that most serving infrastructure does not support out of the box. Plan for adapter versioning from day one.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 5.11 — Synthetic Data for Training & Distillation
**Personas:** Sr Dev / SRE
**Key concepts:** Generating training data with LLMs, knowledge distillation pipelines, failure risks (mode collapse, bias amplification), quality filtering, when synthetic data helps vs. hurts.
**Production gotcha:** Synthetic data generated by the same model family you're training on can create circular reinforcement — the student model learns the teacher's biases, including its failure modes. Always validate synthetic training data against a held-out set of real examples, and monitor for mode collapse (the model converging on a narrow distribution of outputs).
**Note:** Distinct from 6.6 (Synthetic Data for Eval). This module covers synthetic data for *training and distillation*, where the stakes of data quality problems are higher because they bake failure modes into the model weights.

---

### 5.12 — Sovereign & Air-Gapped AI Architecture
**Personas:** Sr Dev / SRE / Leader
**Key concepts:** Fully offline secure deployment — local embeddings, local vector DB, on-premise model serving, model provenance and verification, patch and update strategy without internet access.
**Production gotcha:** Air-gapped deployments break the assumption of continuous model updates. Model provenance — verifying that a model weight file is exactly what it claims to be — requires cryptographic verification at download time, not just at deployment. A model that was clean at download can be tampered with before deployment in a compromised environment.
**Note:** Layer 1 for Leaders: the compliance and data-sovereignty case. Layer 2 for Sr Dev/SRE: architecture diagram for a fully offline RAG + inference stack. Cross-reference 7.4 (Supply Chain Vulnerabilities) and 8.6 (Data Privacy & GDPR).

---

### 5.13 — Caching & Latency Engineering
**Personas:** SRE / Sr Dev
**Key concepts:** Semantic caching (cache by embedding similarity, not exact string match), response caching, retrieval caching, prompt prefix caching (KV cache reuse), latency SLO design, p50/p95/p99 targets for AI endpoints.
**Production gotcha:** Semantic caches can return stale responses that were correct when cached but are now outdated. Cache TTL must be set based on how quickly the underlying facts change — not based on storage cost. A semantic cache with no TTL on a RAG system over live data is a correctness hazard.
**Note:** Cover all four caching layers independently (semantic, response, retrieval, prefix) because they operate at different points in the stack and have different invalidation strategies.

---

## Production Gotchas

- Fine-tuning is often the wrong answer — the decision framework matters more than the technique (5.9)
- Catastrophic forgetting — narrow fine-tuning degrades general capability in unmeasured ways (5.9)
- Adapter versioning and serving — running multiple LoRA adapters on a single base model is an emerging production pattern (5.10)
- Synthetic training data can create circular reinforcement — the model learns the teacher's failure modes (5.11)
- Model provenance requires cryptographic verification at download time in air-gapped environments (5.12)
- Semantic caches with no TTL on live data are a correctness hazard, not just a cost optimisation (5.13)
