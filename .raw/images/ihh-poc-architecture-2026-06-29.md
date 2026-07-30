---
type: raw-image-description
title: "IHH POC Architecture Screenshot"
created: 2026-06-29
source_image: "_attachments/images/ihh-poc-architecture-2026-06-29.png"
image_sha256: "279c467f9300e7d1964a890caea21f1fc72a54d37985e184be3d5d109710332e"
related_source:
  - ".raw/case-studies/ihh-healthcare-case-study-response-2026-06-29.txt"
---

# IHH POC Architecture Screenshot

This image is a screenshot of the technical architecture portion of Stanley's IHH Healthcare case-study response.

## Visible Text

Heading: "How might the solution work technically?"

Body text:

In the proof-of-concept, Concierge and Follow-up Agents run on IHH's infrastructure using the OpenAI Agents SDK, and query gpt-4o-transcribe, gpt-4o-mini-tts, and gpt-5.2:

Diagram caption: "Simplified POC architecture diagram"

Below the diagram:

OpenAI Frontier becomes essential as the solution scales from the proof-of-concept stage to 80 hospitals across 10 countries by adding the enterprise management plane: agent-level governance with enterprise-wide scoped permissions (e.g., Concierge Agent reads Cerebral+ but cannot write), centralized audit trails across every agent action at every hospital, and human-in-the-loop escalation for complex cases; and managed hosting so IHH does not need to build, maintain, and scale agent infrastructure internally.

## Diagram Elements

- Patient Channels: Phone, Email, WhatsApp.
- IHH Application Layer:
  - Concierge Agent.
  - Concierge tools: `get_availability()`, `get_pricing()`, `book_appointment()`, and others.
  - Follow-up Agent.
  - Follow-up cadence: T+1, T+7, T+30 check-ins.
  - Follow-up tools: `check_condition()`, `escalate_to_specialist()`, and others.
  - Specialist Directory, Pricing Engine, Scheduling System, Patient DB.
  - Patient DB, Care Plan.
  - Cerebral+.
- OpenAI API (US):
  - `gpt-4o-transcribe` for speech to text.
  - `gpt-5.2` for reasoning.
  - `gpt-4o-mini-tts` for text to speech.
  - `gpt-5.2` for reasoning.

## Indexing Note

The image supplies the architecture detail missing from line 15 of the pasted text source, where the diagram appears only as "Simplified POC architecture diagram."
