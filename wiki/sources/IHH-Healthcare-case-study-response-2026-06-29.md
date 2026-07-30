---
type: source
title: "IHH Healthcare Case Study Response"
address: c-000007
created: 2026-06-29
updated: 2026-06-29
tags:
  - source
  - case-study
  - openai-interview-prep
  - strategic-bdr-apac
  - healthcare
status: current
related:
  - "[[OpenAI-SDR-case-study-playbook]]"
  - "[[OpenAI-Loom-project-prompt-Stanley-2026-06-27]]"
  - "[[OpenAI-SDR-interview-process-and-prep]]"
raw_file: ".raw/case-studies/ihh-healthcare-case-study-response-2026-06-29.txt"
image_file: "_attachments/images/ihh-poc-architecture-2026-06-29.png"
image_description: ".raw/images/ihh-poc-architecture-2026-06-29.md"
source_confidence: "friend-provided passed case-study response; useful as a winning specimen, but product, regulatory, and company claims need verification before live use"
---

# Source: IHH Healthcare Case Study Response

Navigation: [[index]] | [[sources/_index|Sources]] | [[OpenAI-SDR-case-study-playbook]]

## Source Boundary

This source is a friend-provided case-study response that reportedly passed OpenAI's Loom/project stage. It is not an official OpenAI sample answer, not Seth's own case study, and not a verified account-research packet.

Use it for structure, level of specificity, executive tone, and how to combine business value with technical plausibility. Do not reuse factual claims, product names, medical claims, regulatory claims, or model names in a live submission without verification.

The raw text is preserved verbatim at `.raw/case-studies/ihh-healthcare-case-study-response-2026-06-29.txt`. The copied source has 69 lines and SHA-256 `307f61fd2f9ce71981a03e8c5d37f44f7bf5b4c7752a0c0b6946594f3ddd8aaa`.

The architecture screenshot is preserved at `_attachments/images/ihh-poc-architecture-2026-06-29.png` with image description at `.raw/images/ihh-poc-architecture-2026-06-29.md`.

## Raw Source Index

| Lines | Segment | What is covered |
|---:|---|---|
| 1-2 | Account context | IHH Healthcare as Asia's largest private healthcare group by hospital count, 80 hospitals, 10 countries, FY2024 revenue, Singapore/Malaysia revenue exposure, medical tourism, existing AI posture. |
| 4-9 | Use case thesis | Manual medical-tourism coordination as a scaling constraint; proposed OpenAI-enabled multilingual medical-tourism concierge; expansion into domestic engagement, operations intelligence, and revenue cycle management. |
| 11-17 | Technical architecture | Concierge and Follow-up Agents on IHH infrastructure using OpenAI Agents SDK; calls to speech-to-text, reasoning, and text-to-speech models; Frontier positioned as enterprise management plane at scale. |
| 19-23 | Risks and failure points | Cerebral+ integration dependency, premium patient adoption risk, cross-border data transit, and clinical accountability gap. |
| 25-37 | Vendor evaluation | Compliance, clinical outcomes evidence, total cost of ownership, vendor/product stability, SI alignment, reasons IHH might not choose OpenAI, and why IHH could still justify the bet. |
| 43-69 | Prep annotations | Why this use case, why this company, why now, unanswered model-choice questions, and Agents SDK as orchestration framework. |

## Key Extraction

The answer works because it does more than name a flashy AI use case. It frames a concrete enterprise workflow with a buyer-relevant business case, acknowledges why the solution could fail, and shows enough technical architecture to feel credible without becoming an engineering deep dive.

Reusable elements:

- Lead with account-specific business facts and a clear reason the account should care now.
- Pick one workflow where AI changes revenue, conversion, capacity, or operating leverage.
- Explain the user journey in one vivid scenario.
- Name expansion paths after the first use case succeeds.
- Include a simple architecture: channels, agents, tools, customer systems, OpenAI model calls, and governance layer.
- Address failure points directly.
- Explain how the account would evaluate vendors.
- Include "why not OpenAI" objections and a reasoned counter.
- End with why the use case, company, and timing are unusually good.

## Case Thesis

The proposed wedge is a multilingual medical-tourism concierge platform for IHH. The business problem is that medical-tourism coordination is profitable but labor-intensive, with patient coordinators, interpreters, and insurance liaisons scaling roughly with volume.

The case argues OpenAI can help IHH:

- reduce 24-48 hour response delays;
- improve conversion from inbound international patient demand;
- scale across languages and time zones;
- coordinate specialist matching, price estimation, and appointment booking;
- automate post-care follow-up in the patient's language;
- later expand into domestic engagement, operations intelligence, and revenue-cycle workflows.

## Technical Architecture Captured From Screenshot

The screenshot adds detail that the pasted text omits.

Core components:

- Patient channels: phone, email, WhatsApp.
- IHH application layer:
  - Concierge Agent using tools such as `get_availability()`, `get_pricing()`, and `book_appointment()`.
  - Follow-up Agent for T+1, T+7, and T+30 check-ins using tools such as `check_condition()` and `escalate_to_specialist()`.
  - Specialist Directory, Pricing Engine, Scheduling System, Patient DB, Care Plan, and Cerebral+.
- OpenAI API:
  - `gpt-4o-transcribe` for speech to text.
  - `gpt-5.2` for reasoning.
  - `gpt-4o-mini-tts` for text to speech.

Source-reported scale argument:

- OpenAI Frontier becomes relevant when moving from POC to 80 hospitals across 10 countries.
- The proposed enterprise layer includes agent-level governance, scoped permissions, centralized audit trails, human-in-the-loop escalation, and managed hosting.

Verification boundary:

- `gpt-5.2`, OpenAI Frontier, residency/inference location, OpenAI ToS liability language, and any healthcare compliance claims should be verified against current official OpenAI materials before Seth uses them.

## What This Adds To Seth Prep

This is the best current specimen for how to make the Loom case feel executive-ready:

- It is specific enough to avoid generic AI fluff.
- It shows strategic account selection.
- It ties use case to revenue and capacity.
- It includes technical credibility.
- It names risks without sounding negative.
- It answers why OpenAI could still win despite objections.

## Gaps Before Reuse

If Seth's assignment asks for DoorDash, this answer should not be copied as the company choice. Use the structure, not the account.

If Seth is allowed to pick a strategic customer, IHH is a plausible healthcare account, but all facts must be refreshed and the pitch should become Seth's own.

The pasted IHH response does not fully cover the prompt's 30-day executive engagement plan. Before turning it into Seth's submission, add:

- first target personas and why;
- business priorities to lead with;
- credibility plan;
- at least one outbound message;
- a standout approach linked to Seth's strengths.

## Pages Created From This Source

- [[OpenAI-SDR-case-study-playbook]]: reusable Loom case-study operating guide combining this passed response with the actual assignment prompt.
