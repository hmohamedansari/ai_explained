# Track 7: Safety, Red Teaming & Compliance
> Last reviewed: 2026-03-20 | Personas: All → Sr Dev / Leader
> Owner: [unassigned] | Reviewer: [unassigned]

*Offensive and defensive. Required for production, often taught last — should be taught early.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 7.1 | The AI Safety Landscape | All | `stable` | `planned` |
| 7.2 | OWASP Top 10 for LLM Applications | All Devs | `emerging` | `planned` |
| 7.3 | Prompt Injection & Jailbreaking | All Devs | `emerging` | `planned` |
| 7.4 | Supply Chain Vulnerabilities | Sr Dev / Leader | `emerging` | `planned` |
| 7.5 | Guardrails as Infrastructure | Sr Dev | `emerging` | `planned` |
| 7.6 | PII Scrubbing & Data Privacy | All Devs / Leader | `stable` | `planned` |
| 7.7 | Red Teaming Methodology | Sr Dev / Leader | `emerging` | `planned` |
| 7.8 | Kill Switches & Human-in-the-Loop | Sr Dev / SRE | `stable` | `planned` |
| 7.9 | EU AI Act & GRC | Leader | `volatile` | `planned` |
| 7.10 | Constitutional AI & RLHF | Sr Dev | `stable` | `planned` |

---

## Module Details

### 7.1 — The AI Safety Landscape
**Personas:** All
**Key concepts:** Hallucination, bias, misuse — the full threat model beyond "the AI might lie."
**Note:** Layer 1 only for Curious Beginner and Leader. Do not assume threat-modelling familiarity. Use concrete examples, not abstract categories.

---

### 7.2 — OWASP Top 10 for LLM Applications
**Personas:** All Devs
**Key concepts:**
- #1 Prompt Injection
- #2 Insecure Output Handling / Data Exfiltration via Indirect Injection
- #3 Training Data Poisoning / Supply Chain Vulnerabilities

**Volatility note:** OWASP LLM Top 10 is updated periodically. Pin to the version number when authoring and re-validate on update.

---

### 7.3 — Prompt Injection & Jailbreaking
**Personas:** All Devs
**Key concepts:**
- Direct vs. indirect injection
- Jailbreaking taxonomies: roleplay exploits, token manipulation, nested instruction attacks
- Data exfiltration via exfiltration prompts embedded in retrieved content
- Why prompt injection is structurally hard to solve
- Current mitigations and their limits

**Production gotcha:** The RAG pipeline is an attack surface. Any content retrieved from an external source (including your own database) can contain adversarial instructions. Sanitise retrieved content before injecting it into a prompt.
**Unknown Unknown:** Listed in `common-gotchas.md`.

---

### 7.4 — Supply Chain Vulnerabilities
**Personas:** Sr Dev / Leader
**Key concepts:** Compromised model weights, poisoned fine-tuning data, malicious third-party MCP servers and plugins.
**Production gotcha:** LLM supply chain vulnerabilities are entirely absent from traditional software supply chain thinking. A compromised model weight is not a CVE — it doesn't appear in your dependency scanner.
**Unknown Unknown:** Listed in `common-gotchas.md`.
**Authoring note:** ⚠️ Layer 1 must be written for a non-technical Leader audience — business risk framing, no implementation detail. Layer 2 covers technical mitigations for Sr Dev/SRE. Do not collapse these into a single voice.

---

### 7.5 — Guardrails as Infrastructure
**Personas:** Sr Dev
**Key concepts:** External guardrails (NeMo Guardrails, Guardrails.ai, Lakera) vs. in-prompt mitigation.
**Production gotcha:** The LLM should not be its own safety system. Asking the model to "refuse harmful requests" is not a guardrail — it is a request that can be overridden by a sufficiently clever prompt.

---

### 7.6 — PII Scrubbing & Data Privacy
**Personas:** All Devs / Leader
**Key concepts:** What data enters the context window, PII detection and redaction, data residency requirements, sovereign AI options.
**Note:** Layer 1 for Leaders (GDPR obligations, what goes into the prompt). Layer 2 for Devs (implementing PII detection with libraries like `presidio`).

---

### 7.7 — Red Teaming Methodology
**Personas:** Sr Dev / Leader
**Key concepts:** Garak, DeepTeam, refusal-aware red teaming, adversarial testing requirements under the EU AI Act, building a repeatable red team process.
**Note:** Layer 1 for Leaders covers the regulatory requirement and business rationale. Layer 2 for Sr Devs covers running an automated red team with Garak.

---

### 7.8 — Kill Switches & Human-in-the-Loop
**Personas:** Sr Dev / SRE
**Key concepts:** Mandatory intervention points for high-stakes tool calls, approval workflows, graceful degradation.
**Note:** Cover specific trigger conditions — not just "add a human in the loop." What actions require approval? What happens when approval is not granted? How does the agent degrade gracefully?

---

### 7.9 — EU AI Act & GRC
**Personas:** Leader
**Key concepts:** Risk classification tiers, prohibited uses, compliance obligations, audit requirements, timeline, bias detection and hallucination monitoring.
**Volatility note:** ⚠️ The EU AI Act is being implemented in phases. This module will require updates as implementation dates pass. Always include the specific version/date of the regulation being referenced.

---

### 7.10 — Constitutional AI & RLHF
**Personas:** Sr Dev
**Key concepts:** Anthropic's Constitutional AI approach, RLHF mechanics, how safety is baked in at training time vs. applied at inference.
**Note:** This is the "why" behind the guardrails in 7.5. Understanding the training-time safety approach helps explain why inference-time mitigations are still necessary.

---

## Production Gotchas

- Supply chain vulnerabilities — OWASP LLM #3, entirely absent from traditional software supply chain thinking (7.4)
- Indirect prompt injection via retrieved content — the RAG pipeline is an attack surface (7.3)
- Jailbreaking is a spectrum of techniques, not a single problem — different defences needed for different attack classes (7.3)
- Malicious MCP servers — third-party tool servers as a new supply chain risk as MCP adoption grows (3.3 / 7.4)
