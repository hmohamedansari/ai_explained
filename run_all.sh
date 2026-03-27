#!/usr/bin/env bash
# run_all.sh — runs review_loop.py for every remaining module (tracks 5–9)
# Usage: source .env && bash run_all.sh
# Logs: .review_audit/<module-id>_<timestamp>.json per module

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Sanity checks
if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "ERROR: ANTHROPIC_API_KEY not set. Run: source .env"
  exit 1
fi

if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 not found"
  exit 1
fi

run_module() {
  local id="$1"
  local title="$2"
  local track_slug="$3"
  local track_file="$4"
  local file_slug="$5"

  local output_path="src/content/modules/${track_slug}/${file_slug}.mdx"
  local log_prefix="[${id}]"

  # Skip if already written
  if [[ -f "$output_path" ]]; then
    echo "${log_prefix} SKIP — ${output_path} already exists"
    return 0
  fi

  echo ""
  echo "════════════════════════════════════════════════════════════"
  echo "${log_prefix} ${title}"
  echo "════════════════════════════════════════════════════════════"

  local instruction="Write module ${id}: ${title}.

Read curriculum/tracks/${track_file} and find the entry for module ${id}. Use its key concepts, personas, production gotcha, volatility rating, and any notes as the source of truth — do not add concepts not listed there.

Output file: ${output_path}

Follow CLAUDE.md conventions exactly. The quality benchmark is src/content/modules/agents/what-is-an-agent.mdx — match that depth and style.

Write the quiz file at src/content/quizzes/.json alongside it. Run npm run build to verify no errors. Fix any build errors before committing.

Commit message: feat(track-${id%%.*}): add module ${id} — ${title}"

  python3 review_loop.py "${id}" "$instruction"
}

# ── Track 5 — Infrastructure ──────────────────────────────────────────────────
run_module "5.1"  "Local LLM Stack"                           "infrastructure" "track-5-infrastructure.md" "local-llm-stack"
run_module "5.2"  "VRAM Management and Quantisation"          "infrastructure" "track-5-infrastructure.md" "vram-management-and-quantisation"
run_module "5.3"  "vLLM: Production Serving"                  "infrastructure" "track-5-infrastructure.md" "vllm-production-serving"
run_module "5.4"  "Speculative Decoding"                      "infrastructure" "track-5-infrastructure.md" "speculative-decoding"
run_module "5.5"  "Mixture of Experts"                        "infrastructure" "track-5-infrastructure.md" "mixture-of-experts"
run_module "5.6"  "Small Language Models"                     "infrastructure" "track-5-infrastructure.md" "small-language-models"
run_module "5.7"  "Context Length vs Performance"             "infrastructure" "track-5-infrastructure.md" "context-length-vs-performance"
run_module "5.8"  "LLM Gateway Patterns"                      "infrastructure" "track-5-infrastructure.md" "llm-gateway-patterns"
run_module "5.9"  "Fine-Tuning: When and Why"                 "infrastructure" "track-5-infrastructure.md" "fine-tuning-when-and-why"
run_module "5.10" "LoRA, QLoRA and PEFT"                      "infrastructure" "track-5-infrastructure.md" "lora-qlora-and-peft"
run_module "5.11" "Synthetic Data for Training and Distillation" "infrastructure" "track-5-infrastructure.md" "synthetic-data-for-training"
run_module "5.12" "Sovereign and Air-Gapped AI Architecture"  "infrastructure" "track-5-infrastructure.md" "sovereign-and-air-gapped-ai"
run_module "5.13" "Caching and Latency Engineering"           "infrastructure" "track-5-infrastructure.md" "caching-and-latency-engineering"

# ── Track 6 — Evaluation ──────────────────────────────────────────────────────
run_module "6.1"  "Why Evaluation Is Hard"                    "evaluation" "track-6-evaluation.md" "why-evaluation-is-hard"
run_module "6.2"  "Code-Based Evals"                          "evaluation" "track-6-evaluation.md" "code-based-evals"
run_module "6.3"  "LLM-as-Judge"                              "evaluation" "track-6-evaluation.md" "llm-as-judge"
run_module "6.4"  "Error Analysis Workflow"                   "evaluation" "track-6-evaluation.md" "error-analysis-workflow"
run_module "6.5"  "RAGAS and RAG Evaluation"                  "evaluation" "track-6-evaluation.md" "ragas-and-rag-evaluation"
run_module "6.6"  "Synthetic Data for Eval"                   "evaluation" "track-6-evaluation.md" "synthetic-data-for-eval"
run_module "6.7"  "CI/CD-Integrated Evals"                    "evaluation" "track-6-evaluation.md" "cicd-integrated-evals"
run_module "6.8"  "Observability Stack"                       "evaluation" "track-6-evaluation.md" "observability-stack"
run_module "6.9"  "Cost Management"                           "evaluation" "track-6-evaluation.md" "cost-management"
run_module "6.10" "Evaluating the Evaluator"                  "evaluation" "track-6-evaluation.md" "evaluating-the-evaluator"
run_module "6.11" "Multimodal Evaluation and Observability"   "evaluation" "track-6-evaluation.md" "multimodal-evaluation-and-observability"
run_module "6.12" "Human Feedback Operations"                 "evaluation" "track-6-evaluation.md" "human-feedback-operations"

# ── Track 7 — Safety ─────────────────────────────────────────────────────────
run_module "7.1"  "The AI Safety Landscape"                   "safety" "track-7-safety.md" "the-ai-safety-landscape"
run_module "7.2"  "OWASP Top 10 for LLM Applications"         "safety" "track-7-safety.md" "owasp-top-10-for-llm-applications"
run_module "7.3"  "Prompt Injection and Jailbreaking"         "safety" "track-7-safety.md" "prompt-injection-and-jailbreaking"
run_module "7.4"  "Supply Chain Vulnerabilities"              "safety" "track-7-safety.md" "supply-chain-vulnerabilities"
run_module "7.5"  "Guardrails as Infrastructure"              "safety" "track-7-safety.md" "guardrails-as-infrastructure"
run_module "7.6"  "PII Scrubbing and Data Privacy"            "safety" "track-7-safety.md" "pii-scrubbing-and-data-privacy"
run_module "7.7"  "Red Teaming Methodology"                   "safety" "track-7-safety.md" "red-teaming-methodology"
run_module "7.8"  "Kill Switches and Human-in-the-Loop"       "safety" "track-7-safety.md" "kill-switches-and-human-in-the-loop"
run_module "7.9"  "EU AI Act and GRC"                         "safety" "track-7-safety.md" "eu-ai-act-and-grc"
run_module "7.10" "Constitutional AI and RLHF"                "safety" "track-7-safety.md" "constitutional-ai-and-rlhf"

# ── Track 8 — Strategy ───────────────────────────────────────────────────────
run_module "8.1"  "AI Landscape 2026"                         "strategy" "track-8-strategy.md" "ai-landscape-2026"
run_module "8.2"  "ROI Measurement"                           "strategy" "track-8-strategy.md" "roi-measurement"
run_module "8.3"  "Buy vs Build vs Tune"                      "strategy" "track-8-strategy.md" "buy-vs-build-vs-tune"
run_module "8.4"  "AI-First Team Structure"                   "strategy" "track-8-strategy.md" "ai-first-team-structure"
run_module "8.5"  "The Make-vs-Maintain Trap"                 "strategy" "track-8-strategy.md" "the-make-vs-maintain-trap"
run_module "8.6"  "Data Privacy and GDPR"                     "strategy" "track-8-strategy.md" "data-privacy-and-gdpr"
run_module "8.7"  "Agent Economics"                           "strategy" "track-8-strategy.md" "agent-economics"
run_module "8.8"  "Migration and Change Management"           "strategy" "track-8-strategy.md" "migration-and-change-management"

# ── Track 9 — Multimodal ─────────────────────────────────────────────────────
run_module "9.1"  "Vision Models in Production"               "multimodal" "track-9-multimodal.md" "vision-models-in-production"
run_module "9.2"  "Audio and Speech AI"                       "multimodal" "track-9-multimodal.md" "audio-and-speech-ai"
run_module "9.3"  "Multimodal Agents"                         "multimodal" "track-9-multimodal.md" "multimodal-agents"
run_module "9.4"  "Multimodal Safety"                         "multimodal" "track-9-multimodal.md" "multimodal-safety"
run_module "9.5"  "Serving Multimodal Models"                 "multimodal" "track-9-multimodal.md" "serving-multimodal-models"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "All modules complete. Check .review_audit/ for per-module logs."
echo "════════════════════════════════════════════════════════════"
