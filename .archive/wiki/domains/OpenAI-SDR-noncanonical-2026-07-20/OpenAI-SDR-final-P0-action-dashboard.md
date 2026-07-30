---
type: domain
title: "OpenAI SDR Final P0 Action Dashboard"
address: c-000025
created: 2026-06-29
updated: 2026-06-29
tags:
  - openai-interview-prep
  - strategic-bdr-apac
  - p0
  - action-dashboard
  - final-sprint
status: archived
related:
  - "[[OpenAI-SDR-master-interview-prep-checklist]]"
  - "[[OpenAI-SDR-Loom-finalization-control-room]]"
  - "[[OpenAI-SDR-Loom-case-package]]"
  - "[[OpenAI-SDR-DoorDash-Loom-case-fallback]]"
  - "[[OpenAI-SDR-P0-rehearsal-execution-log]]"
  - "[[OpenAI-SDR-live-mock-interviewer-script]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-evidence-and-verification-ledger]]"
confidence: "current-state execution dashboard based on remaining unchecked P0 rows in the master checklist; not evidence of completion by itself"
---

# OpenAI SDR Final P0 Action Dashboard

Navigation: [[index]] | [[OpenAI-SDR-master-interview-prep-checklist]] | [[OpenAI-SDR-Loom-finalization-control-room]] | [[OpenAI-SDR-P0-rehearsal-execution-log]] | [[OpenAI-SDR-live-mock-interviewer-script]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]]

## Read This First

This is the last-mile operating page for the remaining P0s.

It is not completion evidence. It tells Seth or a future Codex run exactly what to do next, what evidence to capture, and which rows in [[OpenAI-SDR-master-interview-prep-checklist]] can be updated only after that evidence exists.

Do not check a remaining P0 just because the deck, prompt workflow, cue card, or runner exists. Check it only when Seth has the actual prompt/submission evidence or has spoken the answer aloud and logged the result.

## Two-Track Dashboard

| Track | Current status | Trigger | Next action | Evidence that unlocks checklist movement |
|---|---|---|---|---|
| Track A: Loom prompt and submission | Execution-ready, live prompt pending | Seth receives the actual case prompt or assignment email | Open [[OpenAI-SDR-Loom-finalization-control-room]], paste the prompt, choose the account path, recheck claims, adapt deck/script, record, test sharing, submit | Filled prompt intake, account choice, dated source checks, adapted deck/script, timing rehearsal, final Loom URL, permission test, reviewer/submission status |
| Track B: Spoken P0 rehearsal | Ready to run now | No prompt yet, or any interview is within 24 hours | Run `python3 tools/openai_sdr_mock_runner.py --mode minimum` aloud, then paste generated rows into [[OpenAI-SDR-P0-rehearsal-execution-log]] or use append mode after a real run | Timed run rows, scores, weak-answer repair rows, rerun evidence for anything below threshold |

## Exact Action Order

1. If the actual prompt exists, start Track A immediately.
2. If the prompt does not exist, start Track B immediately.
3. If a spoken answer scores below 4/5, repair the cue card and rerun only that question or block.
4. If the prompt arrives while rehearsal is unfinished, pause rehearsal and capture the prompt first.
5. After any real spoken run or Loom submission step, update [[OpenAI-SDR-P0-rehearsal-execution-log]] or [[OpenAI-SDR-Loom-finalization-control-room]] before touching the master checklist.

## Track A: Loom Finalization

Use this when the prompt arrives.

| Step | Action | Where to record | Pass condition |
|---:|---|---|---|
| A1 | Paste the exact prompt: customer, time limit, deadline, submission path, required sections, allowed tools | [[OpenAI-SDR-Loom-finalization-control-room]] | Prompt is copied or summarized with date/time and source |
| A2 | Choose account path: assigned DoorDash, open-choice IHH/APAC, or other assigned account | [[OpenAI-SDR-Loom-finalization-control-room]] | Account choice is explicit and no longer inferred from Stanley's prompt |
| A3 | Verify target-account facts from primary/current sources | [[OpenAI-SDR-Loom-finalization-control-room]] and [[OpenAI-SDR-evidence-and-verification-ledger]] | Every account claim in slides/script has a current source or is removed |
| A4 | Recheck exact OpenAI claims only if used: model names, pricing, packaging, region/residency, healthcare, security/compliance | [[OpenAI-SDR-Loom-finalization-control-room]] and [[OpenAI-SDR-evidence-and-verification-ledger]] | No stale specimen wording or unsupported enterprise/security promise remains |
| A5 | Adapt deck and script | [[OpenAI-SDR-Loom-case-package]], [[OpenAI-SDR-DoorDash-Loom-case-fallback]], or final deck file | Deck fits prompt, script fits time, account-specific details are current |
| A6 | Record one timing rehearsal | [[OpenAI-SDR-Loom-finalization-control-room]] | Rehearsal duration is logged, ideally under the prompt limit with buffer |
| A7 | Record final take | [[OpenAI-SDR-Loom-finalization-control-room]] | Final Loom link exists and does not rely on awkward edits |
| A8 | Test sharing permissions | [[OpenAI-SDR-Loom-finalization-control-room]] | Link opens from another browser/session or expected access path |
| A9 | Reviewer pass if timing allows | [[OpenAI-SDR-Loom-finalization-control-room]] | Reviewer feedback is received and critical fixes are applied or consciously skipped |
| A10 | Submit and log | [[OpenAI-SDR-Loom-finalization-control-room]] | Submission path, timestamp, backup email/link, and deck attachment status are recorded |

## Track B: Spoken Rehearsal

Use this now if no prompt is available.

Minimum run:

```bash
python3 tools/openai_sdr_mock_runner.py --mode minimum
```

Minimum run with direct logging after a real spoken run:

```bash
python3 tools/openai_sdr_mock_runner.py --mode minimum --append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md
```

Deeper blocks:

```bash
python3 tools/openai_sdr_mock_runner.py --mode r1
python3 tools/openai_sdr_mock_runner.py --mode r2
python3 tools/openai_sdr_mock_runner.py --mode r3
python3 tools/openai_sdr_mock_runner.py --mode r4
python3 tools/openai_sdr_mock_runner.py --mode r5
```

Pass conditions:

- answer is spoken aloud, not silently read;
- answer lands within target time or with a conscious stop line;
- self-score or reviewer score is at least 4/5;
- no red-flag claim is used;
- weak-answer repair row is written for every miss;
- weak items are rerun before the master checklist is upgraded.
- append mode is used only for real spoken runs, never dry runs or silent review.

## Evidence Matrix

| Master line on 2026-06-29 | P0 item | Track | Current artifact | Evidence required before checkoff |
|---:|---|---|---|---|
| 166 | Confirm actual Seth prompt | A | [[OpenAI-SDR-Loom-finalization-control-room]] | Actual prompt/customer/time/deadline/submission path captured |
| 167 | Choose account strategy | A | [[OpenAI-SDR-Loom-finalization-control-room]], [[OpenAI-SDR-DoorDash-Loom-case-fallback]] | Account choice gate filled from Seth's actual prompt |
| 185 | Verify target-account facts | A | [[OpenAI-SDR-Loom-finalization-control-room]], [[OpenAI-SDR-evidence-and-verification-ledger]] | Dated primary/current source checks for the final account |
| 187 | Final OpenAI product/security/compliance recheck | A | [[OpenAI-SDR-Loom-finalization-control-room]], [[OpenAI-SDR-evidence-and-verification-ledger]] | Final pre-recording check for exact claims used in the Loom |
| 188 | Record timing rehearsal and final take | A | [[OpenAI-SDR-Loom-finalization-control-room]] | Logged rehearsal duration and final Loom take |
| 189 | Confirm Loom sharing permissions | A | [[OpenAI-SDR-Loom-finalization-control-room]] | Link opens under the intended sharing conditions |
| 191 | Send materials to reviewer if timing allows | A | [[OpenAI-SDR-Loom-finalization-control-room]] | Reviewer packet sent/received, or explicitly skipped due to deadline |
| 225 | Rehearse technical 20-minute and competitor 10-minute blocks | B | [[OpenAI-SDR-P0-rehearsal-execution-log]], [[OpenAI-SDR-live-mock-interviewer-script]], `tools/openai_sdr_mock_runner.py` | R1/R2 or equivalent spoken run rows with pass scores |
| 248 | Rehearse rapid-fire RAG | B | [[OpenAI-SDR-comprehensive-answer-expansion-bank]], `tools/openai_sdr_mock_runner.py` | RAG answer spoken, timed, scored, repaired if weak |
| 249 | Rehearse rapid-fire hallucination | B | [[OpenAI-SDR-comprehensive-answer-expansion-bank]], `tools/openai_sdr_mock_runner.py` | Hallucination answer spoken, timed, scored, repaired if weak |
| 250 | Rehearse deal walkthrough under 3 minutes | B | [[OpenAI-SDR-P0-rehearsal-execution-log]], [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | Boxo or chosen deal spoken under target time with pass score |
| 251 | Rehearse metrics without notes | B | [[OpenAI-SDR-P0-rehearsal-execution-log]], [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | Metrics sequence spoken without notes, with caveats and pass score |

## Sprint Options

### 15-Minute Sprint

If no prompt:

1. Review [[OpenAI-SDR-comprehensive-answer-expansion-bank]] for two minutes.
2. Run `python3 tools/openai_sdr_mock_runner.py --mode minimum`.
3. Paste run rows and repair rows into [[OpenAI-SDR-P0-rehearsal-execution-log]], or rerun with append mode if Seth wants the tool to insert rows directly.

If prompt arrived:

1. Fill prompt intake in [[OpenAI-SDR-Loom-finalization-control-room]].
2. Fill account choice gate.
3. Stop before making unsupported account or OpenAI claims.

### 30-Minute Sprint

If no prompt:

1. Run `--mode minimum`.
2. Repair weak answers in [[OpenAI-SDR-comprehensive-answer-expansion-bank]].
3. Rerun weak questions or `--mode r1` if technical answers are shaky.

If prompt arrived:

1. Fill prompt intake and account gate.
2. Recheck final account facts.
3. Mark slide/script changes needed before recording.

### 60-Minute Sprint

If no prompt:

1. Run `--mode r1`, `--mode r2`, and `--mode r3`.
2. Paste rows into [[OpenAI-SDR-P0-rehearsal-execution-log]].
3. Repair and rerun every answer below 4/5.

If prompt arrived:

1. Adapt deck and script.
2. Run the final verification checklist.
3. Record one timing take.
4. Decide whether reviewer pass is still possible before deadline.

## Paste Block: After Spoken Run

Paste this under the run log if the terminal runner output is not already copied.

```markdown
### 2026-06-29 Minimum Set

| Date | Mode | Duration | Overall score | Pass? | Notes |
|---|---|---:|---:|---|---|
| 2026-06-29 | minimum |  |  |  |  |

| Question | Target | Actual | Score | Weak point | Repair line | Rerun needed? |
|---|---:|---:|---:|---|---|---|
| RAG | 30s |  |  |  |  |  |
| Hallucination | 30s |  |  |  |  |  |
| Boxo deal | 3m |  |  |  |  |  |
| Metrics | 45s |  |  |  |  |  |
```

## Paste Block: After Prompt Arrives

Paste this into [[OpenAI-SDR-Loom-finalization-control-room]] if the prompt comes in during a live session.

```markdown
## Actual Prompt Intake - 2026-06-29

- Source:
- Customer/account:
- Deadline:
- Time limit:
- Submission path:
- Required sections:
- AI/tool policy:
- Deck allowed/required:
- Open questions:
- Account path chosen:
- Final source checks needed:
```

## Do Not Check Yet

Do not check the remaining P0s for these reasons alone:

- prompt workflow exists;
- DoorDash or IHH fallback case is drafted;
- IHH fallback deck exists;
- OpenAI baseline verification was done earlier in the day;
- cue cards exist;
- terminal runner exists;
- a dry-run command passed;
- Seth has mentally reviewed the answer but not spoken it.

Only live prompt evidence and real spoken-run evidence move the last P0s.

## Handoff Prompt

Current evidence shows the last-mile dashboard exists at `wiki/domains/OpenAI-SDR-final-P0-action-dashboard.md` and maps every remaining unchecked P0 row to either Track A Loom execution or Track B spoken rehearsal. The strongest remaining gap is still external/live execution: Seth needs the actual prompt to complete Track A, and Seth needs to run the minimum mock aloud to complete Track B. Next, if no prompt is available, run `python3 tools/openai_sdr_mock_runner.py --mode minimum --append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md` after a real spoken run, then update only the master checklist rows whose evidence gates are satisfied; if the prompt is available, fill [[OpenAI-SDR-Loom-finalization-control-room]] and adapt the deck/script from the chosen account path.
