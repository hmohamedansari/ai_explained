# Glossary & Concept Card System
> Last reviewed: 2026-03-20 | Volatility: `stable`

---

## Overview

Two complementary reference systems that ensure no learner hits a jargon wall:

- **Glossary** — comprehensive term definitions with persona-appropriate depth.
- **Concept Cards** — bite-sized visual explainers for the most complex concepts, embeddable anywhere in the curriculum.

---

## Glossary

### Scope
~200 terms covering the full curriculum. Every term introduced in a module must have a glossary entry before the module can be published.

### Entry Structure

Each glossary entry contains:

```
term: string                  // canonical name
also_known_as?: string[]      // aliases or abbreviations
plain_english: string         // 1–2 sentences, zero jargon, all personas
layer2_detail?: string        // technical elaboration for Dev/SRE personas
layer3_detail?: string        // implementation detail for Sr Dev persona
related_terms: string[]       // cross-links to other glossary entries
first_used_in: string         // module ID where the term is introduced
```

### Cross-Linking Rule
Every term in every module that has a glossary entry must be hyperlinked inline on first use. Subsequent uses in the same module do not need linking.

### Priority Terms (must be written before Phase 1 content ships)

| Term | Plain English summary |
|---|---|
| LLM | A statistical model trained to predict the next token in a sequence |
| Token | The unit of text an LLM processes — roughly ¾ of a word on average |
| Context window | The maximum amount of text an LLM can "see" at once |
| Embedding | A numerical representation of text that captures semantic meaning |
| RAG | Retrieval-Augmented Generation — grounding LLM responses in retrieved documents |
| Fine-tuning | Continuing training on a pre-trained model with task-specific data |
| LoRA | Low-Rank Adaptation — a parameter-efficient fine-tuning method |
| Quantisation | Reducing model weight precision to lower memory and compute requirements |
| Agent | An LLM that can observe, plan, use tools, and act in a loop |
| Tool calling | The mechanism by which an LLM invokes external functions |
| MCP | Model Context Protocol — a standard for tool and data integration |
| Hallucination | When an LLM generates plausible-sounding but incorrect information |
| Prompt injection | Attacking an LLM system by embedding adversarial instructions in its input |
| RLHF | Reinforcement Learning from Human Feedback — a training technique for alignment |
| Inference | Running a trained model to generate outputs (as opposed to training) |
| VRAM | Video RAM — GPU memory; the hard constraint for running local models |

---

## Concept Cards

### What They Are
Bite-sized, self-contained visual explainers for complex concepts. Cards are embeddable in any module, not just the one where the concept is first introduced.

### Format
Each concept card is a standalone component with:
- **Title:** The concept name.
- **One-line summary:** Plain English, one sentence.
- **Visual:** A Mermaid.js diagram or SVG illustration.
- **Why it matters:** One sentence on the production impact.
- **Further reading:** Link to the full module.

### Priority Concept Cards (first batch)

| Card | Key visual | Embed in |
|---|---|---|
| How Attention Works | Token-to-token attention heatmap | 1.2 |
| The RAG Pipeline | Chunk → Embed → Retrieve → Augment flow | 2.3 |
| The MCP Integration Problem | n×m vs. n+m diagram | 3.3 |
| The 17× Error Trap | Accuracy compounding formula | 4.5 |
| Quantisation Precision Ladder | INT4/INT8/FP16/FP32 memory comparison | 1.8, 5.2 |
| Context Window as Working Memory | Buffer analogy diagram | 1.2 |
| LoRA Adapter Architecture | Base model + adapter layer diagram | 5.10 |
| Prompt Injection Attack Surface | Text + image + audio injection vectors | 7.3 |

### Embedding Rule
A concept card may be embedded in any module where the concept is referenced but not fully explained. The card replaces a lengthy inline explanation — it is not a supplement to one.
