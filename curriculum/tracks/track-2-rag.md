# Track 2: Knowledge & Memory (RAG & Context Engineering)
> Last reviewed: 2026-03-20 | Personas: Jr Dev → Sr Dev
> Owner: [unassigned] | Reviewer: [unassigned]

*The most misunderstood layer. Junior devs get "RAG adds context" — this track gives the full systems picture.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 2.1 | Vector Similarity & Embeddings | Jr Dev → | `stable` | `planned` |
| 2.2 | Vector Stores & Indexing | Jr Dev → | `stable` | `planned` |
| 2.3 | Basic RAG Pipeline | Jr Dev | `stable` | `planned` |
| 2.4 | Chunking Strategy Trade-offs | Sr Dev | `stable` | `planned` |
| 2.5 | Query Augmentation | Sr Dev | `emerging` | `planned` |
| 2.6 | Advanced Retrieval | Sr Dev | `emerging` | `planned` |
| 2.7 | GraphRAG & Knowledge Graphs | Sr Dev | `emerging` | `planned` |
| 2.8 | Context Engineering | Sr Dev | `stable` | `planned` |
| 2.9 | Context Failure Taxonomy | Sr Dev | `stable` | `planned` |
| 2.10 | Hybrid Memory Architecture | Sr Dev | `emerging` | `planned` |
| 2.11 | Multimodal RAG | Sr Dev | `volatile` | `planned` |
| 2.12 | Long-Context vs RAG Decision Framework | Sr Dev / Leader | `stable` | `planned` |
| 2.13 | Data Engineering for AI Systems | Sr Dev / SRE | `emerging` | `planned` |

---

## Module Details

### 2.1 — Vector Similarity & Embeddings
**Personas:** Jr Dev →
**Key concepts:** Cosine similarity, embedding spaces, what makes a good embedding model, dimensionality.
**Note:** Conceptual foundation for 2.2 and 2.3. Do not skip. Layer 2 should show a real embedding call and a cosine similarity calculation.

---

### 2.2 — Vector Stores & Indexing
**Personas:** Jr Dev →
**Key concepts:** Chroma (local), Qdrant/Pinecone/Weaviate/Milvus (production), what an index actually is, insert/query patterns, hosted vs. self-hosted tradeoffs.
**Note:** The conceptual bridge before building a RAG pipeline. Must cover: what a vector index physically is (approximate nearest neighbour search), not just how to call an API.

---

### 2.3 — Basic RAG Pipeline
**Personas:** Jr Dev
**Key concepts:** Chunk → embed → store → retrieve → augment — wiring 2.1 and 2.2 into a working system.
**Note:** The first end-to-end module. Layer 2 must be a complete, runnable pipeline — not a diagram of one.

---

### 2.4 — Chunking Strategy Trade-offs
**Personas:** Sr Dev
**Key concepts:** Small = precise retrieval, large = richer context, semantic vs. fixed-size chunking.
**Production gotcha:** There is no universal answer. The right chunk size depends on the document type, query pattern, and embedding model. Any tutorial that prescribes a fixed chunk size is wrong.

---

### 2.5 — Query Augmentation
**Personas:** Sr Dev
**Key concepts:** Rewriting messy queries before retrieval — HyDE (Hypothetical Document Embeddings), multi-query.
**Production gotcha:** This is consistently skipped in tutorials and often the highest-leverage single improvement to a RAG pipeline. If a RAG system is underperforming, check query augmentation before touching chunking or retrieval.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 2.6 — Advanced Retrieval
**Personas:** Sr Dev
**Key concepts:** ColBERT late interaction, hybrid BM25 + dense retrieval, reranking.
**Note:** Layer 3 should benchmark dense-only vs. hybrid retrieval on a realistic document set.

---

### 2.7 — GraphRAG & Knowledge Graphs
**Personas:** Sr Dev
**Key concepts:** Neo4j, FalkorDB, entity-relationship extraction, when graphs beat vectors.
**Note:** Graphs outperform vectors when the query requires multi-hop reasoning (e.g., "who manages the team that owns this service?"). Cover this explicitly — it is the key decision criterion.

---

### 2.8 — Context Engineering
**Personas:** Sr Dev
**Key concepts:** Context engineering vs. prompt engineering — system-level architecture around the context window, not instruction phrasing.
**Unknown Unknown:** Listed in `common-gotchas.md`. This distinction changes how you design systems.

---

### 2.9 — Context Failure Taxonomy
**Personas:** Sr Dev
**Key concepts:**
- **Poisoning** — wrong information compounds over multi-turn conversations
- **Distraction** — irrelevant data overwhelms reasoning
- **Confusion** — ambiguous instructions produce inconsistent behaviour
- **Clash** — contradictory information in context causes unpredictable outputs

**Production gotcha:** Name the failure mode before you try to fix it. Developers who don't have this taxonomy typically discover all four experimentally — after shipping.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 2.10 — Hybrid Memory Architecture
**Personas:** Sr Dev
**Key concepts:** Short-term (context window) + long-term (vector/episodic stores) + working memory (in-flight scratchpad).
**Note:** Layer 3 should show a concrete architecture diagram with state transitions between memory tiers.

---

### 2.11 — Multimodal RAG
**Personas:** Sr Dev
**Key concepts:** Indexing images (CLIP embeddings, captioning pipelines), audio chunking (Whisper + text store), cross-modal retrieval, assembling multimodal context without blowing the context budget.
**Production gotcha:** Multimodal RAG requires fundamentally different chunking strategies — images can't be split mid-sentence, and a single high-resolution image may consume as many tokens as several pages of text.
**Volatility note:** Tooling is evolving rapidly. Verify library versions before publishing.

---

### 2.12 — Long-Context vs RAG Decision Framework
**Personas:** Sr Dev / Leader
**Key concepts:** Explicit cost/latency/quality tradeoff matrix across three architecture patterns: pure long-context, pure RAG, and hybrid. When each wins and why.
**Production gotcha:** Long context windows have reached 1M+ tokens but performance degrades non-linearly — especially in the middle of long inputs (the "lost in the middle" problem). A 500K token context is not simply better than a well-designed RAG pipeline. The decision depends on update frequency, query pattern, cost ceiling, and latency SLO — not just context length.
**Note:** This module is a decision tool, not a tutorial. Layer 1 should be a single decision tree. Layer 2 should include worked cost calculations for a realistic document corpus at each architecture. Cross-reference 1.2 (quadratic attention cost) and 5.7 (context length vs. performance).

---

### 2.13 — Data Engineering for AI Systems
**Personas:** Sr Dev / SRE
**Key concepts:** Corpus lifecycle management, data contracts for AI pipelines, ingestion quality SLAs, dataset versioning, data lineage, unstructured ETL at scale.
**Production gotcha:** Most AI failures traced back to "the model is bad" are actually data quality failures. Garbage in, garbage out applies at every stage: training data, fine-tuning data, and RAG retrieval corpora. Data contracts — explicit schema and quality agreements at ingestion boundaries — are the fix that most teams skip.
**Note:** Treat this as the systems-engineering counterpart to Track 5 fine-tuning modules. Cover the full lifecycle: ingest → clean → version → index → monitor drift. Cross-reference 5.9 (Fine-Tuning: When & Why) and 5.11 (Synthetic Data).

---

## Production Gotchas

- Context failure taxonomy — practitioners discover all four experimentally; naming them halves debugging time (2.9)
- Query augmentation — consistently skipped, often the highest-leverage RAG improvement (2.5)
- Context engineering as a distinct discipline from prompt engineering (2.8)
- Multimodal RAG requires fundamentally different chunking strategies (2.11)
- Long context windows degrade non-linearly — the "lost in the middle" problem means 500K tokens ≠ better RAG (2.12)
- Most AI failures blamed on the model are actually data quality failures upstream (2.13)
