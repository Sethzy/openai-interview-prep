#!/usr/bin/env python3
"""Run timed OpenAI SDR mock interview drills and emit Markdown log rows.

This tool is intentionally local and simple:
- It does not call any model or network.
- It does not record audio.
- It times spoken answers, asks for self/friend scores, and prints Markdown
  rows that can be pasted into the Obsidian rehearsal log.
"""

from __future__ import annotations

import argparse
import datetime as dt
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass(frozen=True)
class Question:
    text: str
    target_seconds: int
    must_include: str
    red_flag: str
    cue: str = ""


RUNS: dict[str, list[Question]] = {
    "minimum": [
        Question(
            "What is RAG?",
            20,
            "Retrieval plus generation; improves grounding; not perfect.",
            "Claims it eliminates hallucination.",
            "RAG means retrieval-augmented generation.",
        ),
        Question(
            "Can hallucination be avoided 100 percent?",
            15,
            "No; mitigate with grounding, tools, evals, monitoring, and review.",
            "Says yes or sounds embarrassed by the limitation.",
            "No, I would not promise 100 percent avoidance.",
        ),
        Question(
            "How would you pitch OpenAI to a Copilot customer?",
            60,
            "Respect Copilot; find unsolved workflows; no rip-and-replace.",
            "Dismisses Microsoft or leads with generic superiority.",
            "I would treat Copilot adoption as a positive signal.",
        ),
        Question(
            "How would you handle a customer already using Anthropic?",
            60,
            "Respect Anthropic; ask what works; find another workflow wedge.",
            "Attacks Anthropic or forces replacement.",
            "I would treat Anthropic usage as a strong AI maturity signal.",
        ),
        Question(
            "Walk me through your strongest deal.",
            180,
            "Boxo; stakeholders; risk; Seth role; result; lesson.",
            "Chronology dump or unsupported exact ARR for one deal.",
            "My strongest enterprise deal story is Boxo.",
        ),
        Question(
            "What were your metrics?",
            60,
            "Airwallex 200%+ and 22 logos; Boxo USD 450K ARR; Salescraft USD 1M+ pipeline / USD 200K revenue; caveat gaps.",
            "Invents monthly close cadence, close rate, run-rate pipeline, or exact average deal-size basis.",
            "The hard numbers I am comfortable using are...",
        ),
        Question(
            "Why SDR after AE/operator work?",
            45,
            "Slope over title; OpenAI-specific learning room; AD partnership.",
            "Defensive, apologetic, or entitled.",
            "I see this as optimizing for slope, not title.",
        ),
        Question(
            "Describe your prospecting motion.",
            60,
            "TAM to named account list; messageability; stakeholder map; workflow hypothesis; AD-ready handoff.",
            "Sounds like AI spray-and-pray.",
            "I would run prospecting as account strategy, not message volume.",
        ),
    ],
    "r1": [
        Question("Explain OpenAI for enterprises.", 60, "Business-user layer, builder/API layer, trust layer, BDR qualification role.", "Product list with no buyer value."),
        Question("Explain an LLM simply.", 30, "Pattern language model; useful but not perfect.", "Mystical or overtechnical answer."),
        Question("Explain an agent simply.", 45, "Model plus tools, context, permissions, and review.", "Agent does everything autonomously."),
        Question("What is RAG?", 20, "Retrieval plus generation; grounding; not perfect.", "Claims it eliminates hallucination."),
        Question("RAG versus fine-tuning?", 45, "Knowledge grounding versus behavior/style specialization.", "Blurs both together."),
        Question("Can hallucination be avoided 100 percent?", 15, "No; mitigate risk.", "Says yes."),
        Question("How do you reduce hallucination?", 60, "Scope, trusted context, tools, structured outputs, evals, monitoring, human review.", "Only says better prompts."),
    ],
    "r2": [
        Question("How would you pitch a Copilot customer?", 60, "Respect Copilot; identify unsolved workflows; no rip-and-replace.", "Dismisses Microsoft."),
        Question("How do we compare with Anthropic?", 60, "Respect Anthropic; evaluate by workflow and outcome.", "Generic OpenAI is better."),
        Question("If they already use Anthropic, why talk to OpenAI?", 45, "Existing AI use is a maturity signal; land elsewhere in stack.", "Replacement-only framing."),
        Question("Why does OpenAI product breadth matter?", 60, "ChatGPT, API, agents, Codex, governance, knowledge/workflows.", "Random product list."),
        Question("Why take the SDR step?", 45, "Slope over title; OpenAI-specific learning room.", "Defensive or apologetic."),
    ],
    "r3": [
        Question("Walk me through a deal end to end.", 180, "Boxo, stakeholders, pain, challenge, Seth role, result, lesson.", "Chronology dump."),
        Question("What were your metrics?", 60, "Safe numbers plus caveated gaps.", "Invents close rate or monthly cadence."),
        Question("How did you multi-thread?", 60, "CEO/product/engineering/legal/compliance and different risks.", "Champion-only answer."),
        Question("What challenge did you face?", 60, "Early-vendor credibility and technical/compliance skepticism.", "Makes buyer sound foolish."),
        Question("What did you learn?", 30, "Enterprise sales is structured risk removal.", "Vague growth lesson."),
        Question("Was it discount-led?", 30, "Value and risk removal, not price.", "Leads with cheapness."),
    ],
    "r4": [
        Question("What is RAG?", 20, "Crisp definition and limitation.", "Too long."),
        Question("Can hallucination be eliminated?", 15, "Starts with no.", "Says yes or waffles."),
        Question("What campaign would you run first?", 45, "Singapore regulated-enterprise workflow wedge or current territory priority.", "Broad AI transformation campaign."),
        Question("Who would you target first?", 30, "Business owner plus technical/governance validators.", "Only economic buyer."),
        Question("What message would you lead with?", 30, "Workflow and business priority.", "Product superiority."),
        Question("Walk me through your best deal.", 120, "Risk-removal story.", "Autobiography."),
        Question("What are you still learning?", 30, "OpenAI enterprise motion and product-depth calibration.", "Sounds helpless."),
        Question("Why SDR?", 30, "Slope over title.", "Defensive."),
    ],
    "r5": [
        Question("Walk me through each experience.", 120, "Boxo, Airwallex, Salescraft/GTM Workspace, why OpenAI.", "Resume ramble."),
        Question("Why did you leave each role?", 90, "Positive, forward-moving, non-defensive.", "Blame or vagueness."),
        Question("What playbook did you build?", 60, "AI-native account intelligence and review-first workflow.", "Abstract GTM playbook."),
        Question("What systems did you build from scratch?", 60, "Sales systems plus AI workflow systems.", "Tool list without business result."),
        Question("What worked and what did not?", 60, "Mature reflection and behavior change.", "Self-mythologizing."),
        Question("What did you carry forward?", 60, "Boxo risk removal, Airwallex cadence, Salescraft AI systems.", "Disconnected stories."),
    ],
}

RUN_NAMES = {
    "minimum": "12-minute minimum set",
    "r1": "R1 product rapid-fire",
    "r2": "R2 competitor/pitch",
    "r3": "R3 commercial/deal",
    "r4": "R4 VP rapid-fire",
    "r5": "R5 VP career narrative",
}


def format_seconds(seconds: int) -> str:
    minutes, remainder = divmod(seconds, 60)
    if minutes:
        return f"{minutes}m {remainder}s"
    return f"{remainder}s"


def today() -> str:
    return dt.date.today().isoformat()


def ask(prompt: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{prompt}{suffix}: ").strip()
    return value or default


def ask_score() -> int:
    while True:
        raw = ask("Score 1-5")
        try:
            score = int(raw)
        except ValueError:
            print("Enter a number from 1 to 5.")
            continue
        if 1 <= score <= 5:
            return score
        print("Enter a number from 1 to 5.")


def print_run_list() -> None:
    for key, questions in RUNS.items():
        total = sum(q.target_seconds for q in questions)
        print(f"{key:8} {RUN_NAMES[key]} ({len(questions)} questions, target {format_seconds(total)})")


def print_dry_run(mode: str) -> None:
    questions = RUNS[mode]
    print(f"# {RUN_NAMES[mode]}")
    for idx, q in enumerate(questions, 1):
        print(f"\n{idx}. {q.text}")
        print(f"   Target: {format_seconds(q.target_seconds)}")
        if q.cue:
            print(f"   Cue: {q.cue}")
        print(f"   Must include: {q.must_include}")
        print(f"   Red flag: {q.red_flag}")


def escape_cell(value: str) -> str:
    return value.replace("\n", " ").replace("|", "\\|").strip()


def insert_table_rows(text: str, heading: str, rows: list[str]) -> str:
    if not rows:
        return text
    heading_index = text.find(f"## {heading}")
    if heading_index == -1:
        raise ValueError(f"Could not find heading: ## {heading}")
    table_index = text.find("|", heading_index)
    if table_index == -1:
        raise ValueError(f"Could not find table under: ## {heading}")
    separator_index = text.find("\n|---", table_index)
    if separator_index == -1:
        raise ValueError(f"Could not find table separator under: ## {heading}")
    insert_at = text.find("\n", separator_index + 1)
    if insert_at == -1:
        raise ValueError(f"Could not find insertion point under: ## {heading}")
    insertion = "\n".join(rows) + "\n"
    return text[: insert_at + 1] + insertion + text[insert_at + 1 :]


def append_to_rehearsal_log(path: Path, run_row: str, repair_rows: list[str]) -> None:
    text = path.read_text(encoding="utf-8")
    text = insert_table_rows(text, "Run Log", [run_row])
    text = insert_table_rows(text, "Weak Answer Repair Log", repair_rows)
    path.write_text(text, encoding="utf-8")


def run_interactive(mode: str, evidence: str, append_log: str | None) -> int:
    questions = RUNS[mode]
    run_name = RUN_NAMES[mode]
    run_date = ask("Run date", today())
    run_mode = ask("Mode", "self-timed aloud")
    weak_rows: list[tuple[str, str, str, str]] = []
    scores: list[int] = []
    total_elapsed = 0

    print(f"\nStarting {run_name}. Press Enter to start and stop each answer.")
    print("Keep raw notes closed if this is a screen-share-adjacent run.\n")

    for idx, question in enumerate(questions, 1):
        print("=" * 72)
        print(f"Q{idx}/{len(questions)}: {question.text}")
        print(f"Target: {format_seconds(question.target_seconds)}")
        if question.cue:
            print(f"Cue: {question.cue}")
        print(f"Must include: {question.must_include}")
        print(f"Red flag: {question.red_flag}")
        input("Press Enter to START timing...")
        start = time.monotonic()
        input("Press Enter to STOP timing...")
        elapsed = round(time.monotonic() - start)
        total_elapsed += elapsed
        over_by = elapsed - question.target_seconds
        if over_by > 0:
            print(f"Elapsed: {format_seconds(elapsed)} ({format_seconds(over_by)} over target)")
        else:
            print(f"Elapsed: {format_seconds(elapsed)} (inside target)")
        score = ask_score()
        scores.append(score)
        weak = ask("Weak answer? If yes, describe briefly", "-")
        repair = ask("Repair line", "-")
        if weak != "-" or score < 4:
            weak_rows.append((question.text, weak, repair, "Not retested"))
        print()

    avg = sum(scores) / len(scores)
    weak_summary = "; ".join(row[0] for row in weak_rows) if weak_rows else "-"
    repair_summary = "; ".join(row[2] for row in weak_rows if row[2] != "-") or "-"

    run_row = (
        f"| {escape_cell(run_date)} | {escape_cell(run_name)} | {escape_cell(run_mode)} | "
        f"{escape_cell(format_seconds(total_elapsed))} | {avg:.1f} / 5 | "
        f"{escape_cell(weak_summary)} | {escape_cell(repair_summary)} | {escape_cell(evidence)} |"
    )
    if weak_rows:
        repair_rows = [
            f"| {escape_cell(question)} | {escape_cell(weak)} | {escape_cell(repair)} | {escape_cell(status)} |"
            for question, weak, repair, status in weak_rows
        ]
    else:
        repair_rows = [
            f"| {escape_cell(run_name)} | No weak answers logged. | - | Passed in {escape_cell(run_date)} |"
        ]

    print("\n# Paste into Run Log")
    print("| Date | Run | Mode | Time | Score | Weak answers | Repair needed | Evidence |")
    print("|---|---|---|---:|---:|---|---|---|")
    print(run_row)

    print("\n# Paste into Weak Answer Repair Log")
    print("| Question | Failure mode | Repair line | Re-test status |")
    print("|---|---|---|---|")
    for repair_row in repair_rows:
        print(repair_row)

    if append_log:
        log_path = Path(append_log)
        append_to_rehearsal_log(log_path, run_row, repair_rows)
        print(f"\n# Appended to {log_path}")

    print("\n# Checklist Guidance")
    if avg >= 4 and all(score >= 3 for score in scores):
        print("- This run may support `Rehearsed` for the matching checklist rows if no unsafe claim occurred.")
        print("- Do not mark `Ready` until a second clean run.")
    else:
        print("- Do not mark checklist rows `Rehearsed` yet. Repair and rerun weak answers.")
    return 0


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--list", action="store_true", help="List available runs.")
    parser.add_argument("--mode", choices=sorted(RUNS), default="minimum", help="Run mode.")
    parser.add_argument("--dry-run", action="store_true", help="Print questions without timing.")
    parser.add_argument("--evidence", default="self-timed aloud", help="Evidence label for log row.")
    parser.add_argument(
        "--append-log",
        help="Append real run rows directly to the rehearsal log. Use only after an actual spoken run.",
    )
    return parser.parse_args(list(argv))


def main(argv: Iterable[str] = sys.argv[1:]) -> int:
    args = parse_args(argv)
    if args.list:
        print_run_list()
        return 0
    if args.dry_run:
        print_dry_run(args.mode)
        return 0
    return run_interactive(args.mode, args.evidence, args.append_log)


if __name__ == "__main__":
    raise SystemExit(main())
