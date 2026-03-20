# Track 9: Multimodal AI (Deep Dive)
> Last reviewed: 2026-03-20 | Personas: Sr Dev / SRE / Leader

*Vision, audio, and cross-modal systems. A frontier track — builds on Tracks 1 and 2.*

**Prerequisites:** Track 1 (especially 1.2 and 1.10) and Track 2 basics (2.1–2.3) before starting this track.

---

## Modules

| ID | Module | Personas | Volatility | Status |
|---|---|---|---|---|
| 9.1 | Vision Models in Production | Sr Dev / SRE | `volatile` | `planned` |
| 9.2 | Audio & Speech AI | Sr Dev / SRE | `volatile` | `planned` |
| 9.3 | Multimodal Agents | Sr Dev | `volatile` | `planned` |
| 9.4 | Multimodal Safety | Sr Dev / Leader | `emerging` | `planned` |
| 9.5 | Serving Multimodal Models | SRE | `emerging` | `planned` |

---

## Module Details

### 9.1 — Vision Models in Production
**Personas:** Sr Dev / SRE
**Key concepts:** GPT-4o Vision, Claude's vision API, LLaVA/LLaVA-NeXT for self-hosting; structured extraction from images; when vision beats OCR and vice versa.
**Production gotcha:** Vision models are not drop-in replacements for OCR. They excel at understanding layout and semantics but can hallucinate text content. For compliance-sensitive document extraction, validate vision output against a deterministic OCR pass.
**Volatility note:** Model capabilities change rapidly. Include a "last verified" date for any model-specific claims.

---

### 9.2 — Audio & Speech AI
**Personas:** Sr Dev / SRE
**Key concepts:** Whisper (batch transcription), Parakeet (streaming), TTS pipelines, speaker diarisation, real-time vs. batch transcription tradeoffs.
**Production gotcha:** Real-time transcription pipelines have fundamentally different latency and error-rate characteristics than batch. Do not benchmark a batch system and use those numbers to justify a real-time deployment.
**Volatility note:** Model options and APIs are evolving rapidly.

---

### 9.3 — Multimodal Agents
**Personas:** Sr Dev
**Key concepts:** Agents that see, hear, and act; combining vision + tool use; failure modes specific to multimodal pipelines.
**Production gotcha:** Multimodal pipelines fail in ways that text-only pipelines don't — image preprocessing errors, OCR/vision disagreements, audio chunking artifacts. These failures are silent unless you have specific eval coverage for each modality.

---

### 9.4 — Multimodal Safety
**Personas:** Sr Dev / Leader
**Key concepts:** Image-based prompt injection, audio adversarial attacks, deepfakes as an organisational risk, compliance gaps.
**Production gotcha:** Safety evaluations designed for text inputs do not cover multimodal attack surfaces. Image-encoded instructions can bypass text-layer guardrails. This is an active research area with no complete solution.
**Note:** Layer 1 for Leaders covers deepfake risk and organisational impact. Layer 2 for Sr Devs covers image-based injection mitigations.

---

### 9.5 — Serving Multimodal Models
**Personas:** SRE
**Key concepts:** VRAM budgets for vision models (2–4× text model cost), batching multimodal inputs, cost per image token vs. text token.
**Production gotcha:** Image tokens are variable-size — a high-resolution image may consume 1,000+ tokens. Uniform-batch assumptions from text serving break. vLLM's multimodal batching requires different configuration than text-only serving. See 5.3 for the text-serving baseline.

---

## Unknown Unknowns Surfaced

- Multimodal inputs expand the prompt injection attack surface to images and audio (1.10, 7.2)
- Vision models hallucinate text — validate against OCR for compliance-sensitive extraction (9.1)
- Real-time vs. batch transcription have fundamentally different characteristics (9.2)
- Image-encoded instructions can bypass text-layer guardrails (9.4)
- Image tokens are variable-size and break uniform-batch serving assumptions (9.5)
