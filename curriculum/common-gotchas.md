# Production Gotchas
> Last reviewed: 2026-03-20 | Volatility: `stable` (concepts); `emerging` (specific tools)
> Owner: [unassigned] | Reviewer: [unassigned]

*Cross-cutting content surfaced prominently — not buried in advanced tracks.*

These are the concepts practitioners discover only after painful production failures. We surface them early and often — not as footnotes in advanced modules, but as named, first-class topics that change how you design systems.

The goal: a learner who has completed any path should be able to *name* these failure modes before they encounter them in production.

---

## Full Table

| Concept | Why It Matters | Where Taught |
|---|---|---|
| Quadratic attention cost (O(n²)) | Doubling context length = 4× compute — primary design constraint, not a footnote | 1.2 |
| Why small quantised models fail at agentic tasks | Instruction-following fidelity problem, not a hardware problem | 1.8 |
| Multimodal inputs expand attack surface | Images and audio are injectable — not just text | 1.10, 7.2 |
| Context failure taxonomy | Named failure modes (Poisoning/Distraction/Confusion/Clash) halve debugging time | 2.9 |
| Query augmentation | Consistently skipped in tutorials; often the highest-leverage RAG improvement | 2.5 |
| Context engineering vs. prompt engineering | System-level vs. instruction-level — different problem, different tools | 2.8 |
| Malicious MCP servers as supply chain risk | Third-party tool servers become a new attack vector as MCP adoption grows | 3.3, 7.4 |
| Agent Payments Protocol (AP2) | Cryptographic authorisation for agentic commerce is an entirely new infrastructure category | 3.6 |
| Capability cards / A2A discovery | The agent equivalent of DNS — most developers have no mental model for agent-to-agent discovery | 3.4 |
| Why curated small tool sets beat large catalogs | Attention dilution during tool selection — counterintuitive, production-validated | 3.8 |
| AGENTS.md as organisational infrastructure | Machine-readable repo config for AI agents — emerging standard most teams don't know exists | 3.9, 4.10 |
| The 17× error trap | System accuracy = product of each agent's accuracy (3 agents at 90% = 73% system) | 4.5 |
| Discriminated union / action schema pattern | Eliminates open-ended agent output ambiguity — production-hardened but invisible in popular tutorials | 4.6 |
| Sandbox isolation providers | Modal/Daytona/Runloop are purpose-built for agent isolation — not just Docker | 4.8 |
| Fine-tuning is often the wrong answer | RAG, DSPy, and prompting frequently outperform fine-tuning at a fraction of the cost | 5.9 |
| Catastrophic forgetting | Narrow fine-tuning degrades general capability in ways that are hard to measure | 5.9 |
| Adapter versioning and serving | Running multiple LoRA adapters on a single base model is an emerging production pattern | 5.10 |
| Evaluation is a design input, not a check | Agents built without an eval harness are unsteerable | 6.1 |
| LLM-as-Judge calibration | Binary > Likert scales; judge drift over time; critique-based labelling vs. just labels | 6.3 |
| Error analysis as a discipline | Open coding → axial coding → prioritisation — borrowed from qualitative research, used by top AI teams | 6.4 |
| Evaluating the evaluator | The meta-loop that closes the production monitoring cycle — most teams skip it | 6.10 |
| LLM supply chain vulnerabilities | OWASP LLM #3 — absent from traditional software supply chain thinking; no CVE for a poisoned weight | 7.4 |
| Indirect prompt injection via RAG | Retrieved content is an attack surface; sanitise before injecting into prompts | 7.3 |
| Jailbreaking is a spectrum | Different attack classes require different defences — there is no single mitigation | 7.3 |
| Vision models hallucinate text | Validate vision extraction against OCR for compliance-sensitive documents | 9.1 |
| Image tokens are variable-size | Breaks uniform-batch serving assumptions; requires different vLLM configuration | 9.5 |
| Reasoning models cost 10–50× more per task | Benchmark cost per correct answer, not cost per token | 1.11 |
| Long context ≠ better RAG | Performance degrades non-linearly in the middle of long inputs ("lost in the middle") | 2.12 |
| AI failures blamed on the model are often data quality failures | Data contracts at ingestion boundaries are the fix most teams skip | 2.13 |
| Non-idempotent agent retries cause duplicate real-world effects | Every side-effecting action must be idempotent or have a compensation transaction | 4.12 |
| Synthetic training data can encode the teacher's failure modes | Validate against held-out real examples; monitor for mode collapse | 5.11 |
| Semantic caches with no TTL on live data are a correctness hazard | Cache TTL must match how quickly underlying facts change | 5.13 |
| Text-based evals don't cover multimodal pipelines | Each modality needs dedicated eval coverage | 6.11 |
| Human reviewer quality degrades silently over time | Without adjudication policy and calibration, retraining on human feedback makes the model worse | 6.12 |
| Model swaps are not like library upgrades | Same model family, different version can break downstream assumptions — always run regression evals | 8.8 |

---

## How to Use This Table

- **Content authors:** Every module that teaches one of these concepts should include an explicit "Unknown Unknown" callout at Layer 1. Don't bury it in Layer 3.
- **Path designers:** At least one gotcha should appear in the MVP variant of every path.
- **Learners:** If you've read this table and don't yet understand why each item matters, find the module that teaches it — that's the module most likely to change how you design systems.
