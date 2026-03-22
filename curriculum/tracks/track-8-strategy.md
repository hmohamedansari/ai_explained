# Track 8: AI Strategy & Organisational Integration
> Last reviewed: 2026-03-20 | Personas: Leader / Sr Dev
> Owner: [unassigned] | Reviewer: [unassigned]

*For leaders — but senior devs should read this too.*

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 8.1 | AI Landscape 2026 | Leader / All | `volatile` | `planned` |
| 8.2 | ROI Measurement | Leader | `stable` | `planned` |
| 8.3 | Buy vs. Build vs. Tune | Leader | `emerging` | `planned` |
| 8.4 | AI-First Team Structure | Leader | `emerging` | `planned` |
| 8.5 | The Make-vs-Maintain Trap | Leader / Sr Dev | `stable` | `planned` |
| 8.6 | Data Privacy & GDPR | Leader / Sr Dev | `emerging` | `planned` |
| 8.7 | Agent Economics | Leader | `volatile` | `planned` |
| 8.8 | Migration & Change Management | Leader / Sr Dev | `emerging` | `planned` |

---

## Module Details

### 8.1 — AI Landscape 2026
**Personas:** Leader / All
**Key concepts:** Generative AI, multimodal, autonomous agents, local/SLMs — where we are and where we're going.
**Volatility note:** ⚠️ This is the highest-volatility module in the curriculum. It will need rewriting, not just updating, every 6–12 months. Always include a "last verified" date prominently. Consider structuring it around durable trends rather than specific model names to reduce decay rate.

---

### 8.2 — ROI Measurement
**Personas:** Leader
**Key concepts:** Time-to-Value (TtV), operational efficiency metrics, knowledge velocity — frameworks that hold up in board rooms.
**Note:** Layer 1 only. No code. Use real frameworks (OKR-compatible metrics, payback period calculations). Avoid vague claims like "AI saves time."

---

### 8.3 — Buy vs. Build vs. Tune
**Personas:** Leader
**Key concepts:** Decision matrix, total cost of ownership, open source vs. proprietary, when fine-tuning is actually the answer, when it isn't.
**Note:** Cross-reference 5.9 (Fine-Tuning: When & Why) for the technical decision framework. This module covers the business and organisational layer.

---

### 8.4 — AI-First Team Structure
**Personas:** Leader
**Key concepts:** Roles (AI Architect, ML Engineer, AI Product Manager), culture, responsible AI practice.
**Note:** Layer 1 for Leaders. Cover what each role actually does day-to-day, not just job titles. Include the "who is accountable for AI quality?" question — it's unanswered in most organisations.

---

### 8.5 — The Make-vs-Maintain Trap
**Personas:** Leader / Sr Dev
**Key concepts:** Why forking frameworks is a long-term liability, how to evaluate framework lock-in, the hidden cost of custom infrastructure.
**Note:** This is the strategic counterpart to the framework selection decision in Track 4 (4.2–4.4). Cover the business case for standardisation.

---

### 8.6 — Data Privacy & GDPR
**Personas:** Leader / Sr Dev
**Key concepts:** What data goes into the LLM context, data residency requirements, sovereign AI options.
**Note:** Cross-reference 7.6 (PII Scrubbing) for the technical implementation. This module covers the compliance and organisational layer.
**Volatility note:** GDPR guidance on AI is evolving. Cite specific DPA guidance where referenced and include the guidance date.

---

### 8.7 — Agent Economics
**Personas:** Leader
**Key concepts:** Cost per agent action, billing models for multi-agent systems, the AP2 infrastructure question.
**Note:** Cross-reference 3.6 (AP2) and 6.9 (Cost Management). This module takes the Leader perspective: what does it cost to run an autonomous agent fleet, and how do you budget for it?
**Volatility note:** Agent billing models are new and evolving. Treat cost structures as indicative.

---

### 8.8 — Migration & Change Management
**Personas:** Leader / Sr Dev
**Key concepts:** AI adoption playbooks, model swap strategy (switching providers or model versions without regression), rollback protocols, governance frameworks for evolving providers, communicating model changes to non-technical stakeholders.
**Production gotcha:** Model swaps are not like software library upgrades — a new model version from the same provider can produce measurably different outputs for the same inputs, breaking downstream assumptions that were never formally tested. Every model swap needs a regression eval gate before production cutover. "It's the same model family" is not sufficient due diligence.
**Note:** Layer 1 for Leaders: the change governance framework and stakeholder communication plan. Layer 2 for Sr Dev: the technical runbook for a zero-downtime model swap with eval gating and rollback. Cross-reference 6.7 (CI/CD-Integrated Evals).
