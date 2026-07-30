---
type: domain
title: "OpenAI SDR Live Mock Interviewer Script"
created: 2026-06-29
updated: 2026-06-29
address: c-000022
tags:
  - openai-interview-prep
  - strategic-bdr-apac
  - mock-interview
  - rehearsal
  - scorecard
status: archived
related:
  - "[[OpenAI-SDR-master-interview-prep-checklist]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-P0-rehearsal-execution-log]]"
  - "[[OpenAI-SDR-rapid-fire-mock-and-delivery-drill]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-deal-cards-and-metrics]]"
  - "[[OpenAI-SDR-motivation-answer-bank]]"
  - "[[OpenAI-SDR-APAC-prospecting-account-strategy-pack]]"
  - "[[OpenAI-SDR-VP-career-and-story-bank]]"
  - "[[OpenAI-SDR-Loom-case-package]]"
confidence: "execution script derived from prepared answer banks and process intelligence; it does not prove rehearsal until Seth runs it aloud and logs scores"
---

# OpenAI SDR Live Mock Interviewer Script

Navigation: [[OpenAI-SDR-master-interview-prep-checklist]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | [[OpenAI-SDR-P0-rehearsal-execution-log]] | [[OpenAI-SDR-rapid-fire-mock-and-delivery-drill]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]]

Internal script for turning drafted OpenAI SDR prep into live spoken evidence.

## Read This First

- This page is for the person running the mock, not for screen share.
- Do not mark anything `Rehearsed` just because this script exists.
- Use [[OpenAI-SDR-comprehensive-answer-expansion-bank]] as the pre-run memory aid before starting the timer.
- A P0 rehearsal only counts after Seth answers aloud, inside time, without reading, with a dated run log in [[OpenAI-SDR-P0-rehearsal-execution-log]].
- If Seth uses exact product, security, model, residency, healthcare, or account claims, keep the answer at `Needs final verification` until current sources are attached.
- If Seth names exact monthly close cadence, run-rate pipeline, close rate, cycle length, or average deal-size basis, confirm the metric before treating it as verified.

## Fast Setup

Use one of these modes.

| Mode | Best when | Instructions |
|---|---|---|
| Friend mock | Seth has another person available | Give the mocker only this page plus [[OpenAI-SDR-comprehensive-answer-expansion-bank]] if they need context. Do not share raw process notes. |
| Codex mock | Seth wants an interactive drill | Paste the prompt in [[#Codex Mock Prompt]] into a new Codex turn and answer one question at a time aloud before typing a short summary. |
| Self-timer | Seth has 20 minutes alone | Use [[#Self-Timer Script]] and fill [[#Run Capture Template]]. |
| Local CLI runner | Seth wants terminal timing and paste-ready log rows | Run `python3 tools/openai_sdr_mock_runner.py --mode minimum` from the repo root. Use `--list` to see run modes and `--dry-run` to preview questions. Add `--append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md` only after a real spoken run if Seth wants rows inserted directly. |

## Local CLI Runner

Use the local runner when the goal is to produce evidence for [[OpenAI-SDR-P0-rehearsal-execution-log]].

Commands:

```bash
python3 tools/openai_sdr_mock_runner.py --list
python3 tools/openai_sdr_mock_runner.py --mode minimum --dry-run
python3 tools/openai_sdr_mock_runner.py --mode minimum
python3 tools/openai_sdr_mock_runner.py --mode minimum --append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md
python3 tools/openai_sdr_mock_runner.py --mode r1
python3 tools/openai_sdr_mock_runner.py --mode r3
```

Use append mode only for a real spoken run. Do not use it for dry runs, silent review, or fake timing because it writes evidence rows into the rehearsal log.

What it does:

- shows the question, target time, cue, must-include, and red flag;
- waits for Enter to start and stop timing;
- asks for a `1-5` score, weak-answer note, and repair line;
- prints a Markdown run-log row and weak-answer repair rows.

What it does not do:

- it does not record audio;
- it does not judge answer quality by itself;
- it does not mark any checklist item complete.

## Non-Negotiable Scoring Rules

Score each answer `1-5`.

| Score | Meaning |
|---:|---|
| 5 | Direct, on time, Seth-specific, customer-led, verified or caveated, calm. |
| 4 | Strong enough for live use, with one small repair. |
| 3 | Understandable but too long, too generic, or missing proof. |
| 2 | Weak: evasive, rambling, product-first, or unsupported. |
| 1 | Unsafe: wrong claim, invented metric, private-process leak, or visible freeze. |

Pass rules:

- A rehearsal row can move to `Rehearsed` only if the average score is `>=4`, no answer scores below `3`, and weak answers are logged.
- A row can move to `Ready` only after a second clean run.
- Any unsafe claim keeps the relevant row below `Ready` even if delivery is good.

## Codex Mock Prompt

Paste this into Codex when Seth is ready to rehearse:

```text
Act as a serious OpenAI Strategic BDR APAC interviewer. Ask me one question at a time from the mock script below. Use a rapid-fire style. Do not show me the answer key until after I answer. After each answer, score me 1-5 for time control, directness, Seth-specific proof, customer value, accuracy, and calmness. Flag any unsupported OpenAI/security/model/process claim, invented metric, or private detail. Keep pushing until we finish the selected run, then give me a run-log row and a weak-answer repair log I can paste into my prep vault.

Selected run: <R1 product rapid-fire / R2 competitor-pitch / R3 commercial-deal / R4 VP rapid-fire / R5 VP career narrative / R6 chaos mock>.
My target role: OpenAI Strategic Business Development Representative - APAC, Singapore.
Do not let me ramble. Interrupt politely if I go more than 20% over target time.
```

## Friend Mock Instructions

Tell the mocker:

1. Ask the questions in order.
2. Time the answers.
3. Do not coach during the answer.
4. If Seth rambles, say: "Pause. Give me the shorter version."
5. If Seth makes an unsupported claim, say: "What source would you verify that from?"
6. After each run, give only three pieces of feedback: strongest answer, weakest answer, and one repair line.

The mocker should not evaluate OpenAI product correctness beyond obvious overclaims unless they are using current official sources.

## Self-Timer Script

Set a timer and speak answers aloud.

| Segment | Time | Action |
|---|---:|---|
| Warm start | 2m | Say the 30-second intro, why OpenAI, and why SDR once each. |
| Core technical | 6m | RAG 20s, hallucination 15s, LLM 30s, agent 45s, Copilot 60s, Anthropic 60s. |
| Commercial | 6m | Boxo deal under 3:15, metrics 60s, multi-threading 60s. |
| APAC | 4m | Prospecting motion 60s, APAC nuance 60s, first market 45s, first campaign 60s. |
| Repair | 2m | Write down the two answers that felt weakest and one sharper opening line for each. |

## R1 Product Rapid-Fire

Ask in this order. Keep it moving.

| Question | Target | Must include | Red flag |
|---|---:|---|---|
| Explain OpenAI for enterprises. | 60s | Business-user layer, builder/API layer, trust/governance layer, BDR qualification role. | Product list with no buyer value. |
| Explain an LLM simply. | 30s | Pattern language model, useful but not perfect. | Mystical or overtechnical answer. |
| Explain an agent simply. | 45s | Model plus tools, context, permissions, review. | "Agent does everything autonomously." |
| What is RAG? | 20s | Retrieval plus generation, grounding, not perfect. | Claims it eliminates hallucination. |
| RAG versus fine-tuning? | 45s | Knowledge grounding versus behavior/style specialization. | Blurs both together. |
| Can hallucination be avoided 100%? | 15s | No, mitigate risk. | Says yes. |
| How do you reduce hallucination? | 60s | Scope, trusted context, tools, structured outputs, evals, monitoring, human review. | Only says "better prompts." |

Run evidence required:

- One timed run.
- Weak answer repair for any answer below `4`.
- No unsupported product or security claims.

## R2 Competitor And Pitch

| Question | Target | Must include | Red flag |
|---|---:|---|---|
| How would you pitch a Copilot customer? | 60s | Respect Copilot, identify unsolved workflows, no rip-and-replace. | Dismisses Microsoft. |
| How do we compare with Anthropic? | 60s | Respect Anthropic, evaluate by workflow and outcome. | Generic "OpenAI is better." |
| If they already use Anthropic, why talk? | 45s | Existing AI use is a maturity signal; land elsewhere in stack. | Replacement-only framing. |
| Why OpenAI product breadth matters? | 60s | ChatGPT, API, agents, Codex, governance, knowledge/workflows. | Random product list. |
| Why take SDR step? | 45s | Slope over title, OpenAI-specific learning room. | Defensive or apologetic. |

Run evidence required:

- One timed 10-minute block.
- Competitor answers must be respectful and workflow-led.

## R3 Commercial And Deal

| Question | Target | Must include | Red flag |
|---|---:|---|---|
| Walk me through a deal end to end. | 3m | Boxo, stakeholders, pain, challenge, Seth role, result, lesson. | Chronology dump. |
| What were your metrics? | 60s | Airwallex 200%+ and 22 logos; Boxo USD 450K ARR; Salescraft USD 1M+ pipeline / USD 200K revenue; caveat exact gaps. | Invents close rate or monthly cadence. |
| How did you multi-thread? | 60s | CEO/product/engineering/legal/compliance and different risks. | Says "I stayed close to the champion" only. |
| What challenge did you face? | 60s | Early-vendor credibility, technical/compliance skepticism. | Makes buyer sound stupid. |
| What did you learn? | 30s | Enterprise sales is structured risk removal. | Vague growth lesson. |
| Was it discount-led? | 30s | Value and risk removal, not price. | Leads with cheapness. |

Run evidence required:

- Deal walkthrough under `3:15`.
- Metrics answer under `60s`.
- No unconfirmed metrics presented as exact.

## R4 VP Rapid-Fire

Use a sharper tone. Ask quickly.

| Question | Target | Pass condition |
|---|---:|---|
| What is RAG? | 20s | Crisp and limited. |
| Can hallucination be eliminated? | 15s | Starts with no. |
| What campaign would you run first? | 45s | Singapore regulated enterprise wedge or current territory priority. |
| Who would you target first? | 30s | Business owner plus technical/governance validators. |
| What message would you lead with? | 30s | Workflow and business priority. |
| Walk me through your best deal. | 2m | Risk-removal story, not full autobiography. |
| What was your average deal size? | 30s | Exact if known, caveat if not. |
| How many deals did you close? | 30s | Safe numbers only. |
| What are you still learning? | 30s | OpenAI enterprise motion and product-depth calibration. |
| Why SDR? | 30s | Slope over title. |
| What is the risk with your profile? | 45s | Fit the mold, learn the motion, avoid overbuilding. |

Run evidence required:

- No answer over `60s` except deal walkthrough.
- Any repeated question gets shorter, not longer.

## R5 VP Career Narrative

| Question | Target | Must include | Red flag |
|---|---:|---|---|
| Walk me through each experience. | 2m | Boxo, Airwallex, Salescraft/GTM Workspace, why OpenAI. | Resume ramble. |
| Why did you leave each role? | 90s | Positive, forward-moving, non-defensive. | Blame or vagueness. |
| What playbook did you build? | 60s | AI-native account intelligence and review-first workflow. | Abstract "GTM playbook." |
| What systems did you build from scratch? | 60s | Sales systems plus AI workflow systems. | Tool list without business result. |
| What worked and what did not? | 60s | Mature reflection and behavior change. | Self-mythologizing. |
| What did you carry forward? | 60s | Boxo risk removal, Airwallex cadence, Salescraft AI systems. | Disconnected stories. |

Run evidence required:

- Career arc under `2m`.
- Transitions sound calm and non-negative.

## R6 Chaos Mock

Pick 12 questions randomly across R1-R5.

Rules:

- Do not let Seth see the list beforehand.
- Include at least two repeated questions.
- Include one product question after a commercial question.
- Include one metrics question after a career question.
- Include one "I do not know" moment where Seth must use a verification line.

Pass condition:

- No freeze.
- No private-process leakage.
- No invented metric.
- No unsupported OpenAI claim.
- At least two answers get shorter and sharper on repeat.

## Run Capture Template

Copy one row into [[OpenAI-SDR-P0-rehearsal-execution-log#Run Log]] after a real run:

| Date | Run | Mode | Time | Score | Weak answers | Repair needed | Evidence |
|---|---|---|---:|---:|---|---|---|
| 2026-06-29 | R1 product rapid-fire | Self-timed aloud / friend mock / Codex mock | __m __s | _ / 5 |  |  |  |

Copy weak answers here:

| Question | Failure mode | Repair line | Re-test status |
|---|---|---|---|
|  |  |  | Not retested |

## Checklist Update Rules

After a successful run:

| Successful run | Update in [[OpenAI-SDR-master-interview-prep-checklist]] |
|---|---|
| R1 + R2 pass | Mark "Rehearse technical answers under a 20-minute product-fluency block and 10-minute competitor/pitch block" as `Rehearsed`, not `Ready`. |
| R1 rapid RAG passes twice | Mark "Rehearse rapid-fire RAG answer" as `Ready` if no claim needs verification. |
| R1 hallucination passes twice | Mark "Rehearse rapid-fire hallucination answer" as `Ready` if no claim needs verification. |
| R3 deal passes once | Mark "Rehearse deal walkthrough in under 3 minutes" as `Rehearsed`. |
| R3 metrics passes once | Mark "Rehearse metrics without notes" as `Rehearsed`, unless exact metrics still need Seth confirmation. |
| R4/R6 pass | Add evidence to the run log; only upgrade rows tied to the specific answers that passed. |

Do not update:

- actual Loom prompt;
- account strategy choice;
- target-account verification;
- Loom final recording;
- Loom sharing permissions;
- reviewer submission.

Those require real external state or Seth action.

## Minimum Next Run

If Seth can only do one thing, run this 12-minute set:

1. [[OpenAI-SDR-comprehensive-answer-expansion-bank#RAG|RAG]], 20 seconds.
2. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Hallucination|Hallucination]], 15 seconds.
3. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Buying Codex For Employees And Engineering Teams|Buying Codex / engineering surface]], 60 seconds.
4. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Using OpenAI To Build Products And Workflows|OpenAI platform / internal build]], 60 seconds.
5. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Primary Deal Frame Boxo Unabank|Boxo deal]], under 3 minutes.
6. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Metrics Caveat|Metrics]], 60 seconds.
7. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Why This Strategic BDR Role Why SDR|Why SDR]], 45 seconds.
8. [[OpenAI-SDR-comprehensive-answer-expansion-bank#Core Answer Prospecting Motion|Prospecting motion]], 60 seconds.
9. Score the weakest two and write repair lines.

This is the smallest run that meaningfully touches every remaining spoken P0 cluster.
