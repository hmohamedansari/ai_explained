# External Resources Inbox

Date: 2026-04-18 (UTC)

Method used:
- Checked the current repo's curriculum and published module content for conceptual overlap.
- Separated "explicit mention" from "conceptual coverage".

**Rubric:** published modules only. Planned modules in track spec files do not count
as coverage here. For a published + planned view, see `resources_to_review.md`.

Definitions:
- `Explicit`: the product/protocol name appears directly in current content/planning docs.
- `Coverage`: how well currently *published* modules teach the same underlying concepts.
  - `Strong`: dedicated published module(s) already cover the concept deeply.
  - `Partial`: related published modules exist, but not this specific shape/use case.
  - `Gap`: little/no meaningful current coverage in published modules.

## Snapshot

- Total resources checked: 19
- Explicitly named in published modules/pages: 0
- Explicitly named in planning docs: LiteLLM, DSPy, LLM Gateway
- Conceptual coverage:
  - Strong: 7
  - Partial: 10
  - Gap: 2

## Resource Log (Repo Knowledge Mapping)

| # | URL | Explicit | Coverage | Repo evidence (module IDs) | Notes |
|---|---|---|---|---|---|
| 1 | https://docs.litellm.ai/ | Planning docs only | Strong | 3.4, 3.7, 5.8, 6.5 | Gateway/routing/fallback/cost patterns are taught; LiteLLM brand is not in published modules. |
| 2 | https://traycer.ai/ | No | Partial | 4.3, 4.7, 8.6 | Planning/decomposition is covered; spec-driven product-planning workflow tooling is not covered directly. |
| 3 | https://modelrouter.app/docs | No | Strong | 3.4, 3.7, 5.8, 6.5 | Unified model-gateway concepts are covered; specific product not named. |
| 4 | https://ragflow.io/ | No | Strong | 2.1, 2.4, 2.6, 2.8, 4.7 | End-to-end RAG architecture/ops/eval is already taught. |
| 5 | https://portkey.ai/ | No | Strong | 3.7, 6.4, 6.5, 7.5, 8.7 | Gateway + observability + governance + vendor-eval concepts are covered. |
| 6 | https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/ | No | Partial | 3.1 | MCP published (3.1); A2A (3.4), AG-UI (3.5), AP2 (3.6) are planned-only; UCP and A2UI not in curriculum. |
| 7 | https://llmgateway.io/ | No | Strong | 3.4, 3.7, 5.8, 6.5 | Same conceptual bucket as model gateways/proxies. |
| 8 | https://dspy.ai/ | Planning docs only | Gap | (planned in curriculum docs) | DSPy is planned in curriculum planning docs, but no dedicated published module currently teaches it. |
| 9 | https://www.tbench.ai/ | No | Partial | 4.8, 6.1, 6.6 | Agent eval is covered; terminal-agent benchmark specifics are not. |
| 10 | https://www.warp.dev/terminal | No | Gap | N/A | Terminal product workflow is not currently a course module topic. |
| 11 | https://www.openfang.sh/ | No | Partial | 4.1, 4.4, 4.7 | Agent OS/runtime ideas overlap with agent architecture modules, but no dedicated runtime/platform module. |
| 12 | https://github.com/openclaw/openclaw | No | Partial | 4.1, 4.4, 4.7 | Personal-assistant implementation is not covered as a product case study, but architecture overlaps. |
| 13 | https://docs.modular.com/glossary/ai/disaggregated-inference/ | No | Partial | 5.3, 5.4, 5.5 | Inference internals are strong; explicit disaggregated prefill/decode architecture is not covered as its own topic. |
| 14 | https://github.com/karpathy/autoresearch | No | Partial | 4.3, 4.5, 4.8 | Autonomous loop planning/failure/evaluation is covered; automated research-training loop pattern is not a dedicated module. |
| 15 | https://opencode.ai/docs | No | Partial | 3.1, 3.2, 3.3, 4.7 | Tool-use/agent architecture foundations are covered; coding-agent product workflows are not directly covered. |
| 16 | https://anythingllm.com/ | No | Strong | 2.1, 2.8, 5.1, 5.7 | Local/self-hosted RAG + deployment concepts are covered strongly. |
| 17 | https://github.com/Mintplex-Labs/anything-llm | No | Strong | 2.1, 2.8, 5.1, 5.7 | Same as above; platform implementation details are external. |
| 18 | https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/ | No | Partial | 5.2, 5.3 | Quantization/compression + KV-cache constraints are covered; TurboQuant-specific method is not. |
| 19 | https://turboquant.net/#overview | No | Partial | 5.2, 5.3 | Same as above; secondary analysis source for a method not yet taught directly. |

## Recommended follow-ups

- Add as concrete examples (no new module needed): 1, 3, 5, 7, 16, 17.
- Add as "advanced sidebar/read more": 9, 13, 14, 15, 18, 19.
- Consider new focused module/lab: 10 (developer terminal-agent workflow patterns).
- Already planned — no new module needed: 8 (DSPy is planned as module 1.9; use this resource as the primary reference URL).
