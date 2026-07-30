---
type: domain
title: "OpenAI SDR P0 Rehearsal Execution Log"
created: 2026-06-29
updated: 2026-07-01
address: c-000020
tags:
  - openai-interview-prep
  - strategic-bdr-apac
  - rehearsal
  - mock-interview
  - scorecard
status: archived
related:
  - "[[OpenAI-SDR-master-interview-prep-checklist]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-live-mock-interviewer-script]]"
  - "[[OpenAI-SDR-rapid-fire-mock-and-delivery-drill]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-deal-cards-and-metrics]]"
  - "[[OpenAI-SDR-motivation-answer-bank]]"
  - "[[OpenAI-SDR-VP-career-and-story-bank]]"
  - "[[OpenAI-SDR-APAC-prospecting-account-strategy-pack]]"
  - "[[OpenAI-SDR-Loom-case-package]]"
  - "[[OpenAI-SDR-evidence-and-verification-ledger]]"
sources:
  - "[[OpenAI-SDR-rapid-fire-mock-and-delivery-drill]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-deal-cards-and-metrics]]"
  - "[[OpenAI-SDR-motivation-answer-bank]]"
  - "[[OpenAI-SDR-VP-career-and-story-bank]]"
  - "/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/high-signal-enterprise-sales.md"
  - "/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/ai-native-account-intelligence.md"
  - "/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/agentic-gtm-campaign-workflows.md"
confidence: "execution artifact derived from drafted answer banks and Second Brain sales doctrine; spoken rehearsal still requires Seth to run and log mocks"
---

# OpenAI SDR P0 Rehearsal Execution Log

Navigation: [[OpenAI-SDR-master-interview-prep-checklist]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | [[OpenAI-SDR-live-mock-interviewer-script]] | [[OpenAI-SDR-rapid-fire-mock-and-delivery-drill]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | [[OpenAI-SDR-deal-cards-and-metrics]]

Internal execution log for turning drafted answers into speakable OpenAI SDR interview performance.

## Read This First

- Status: `Execution-ready`, not `Rehearsed`.
- This page does not prove Seth has rehearsed. It defines the exact evidence needed to mark rehearsal P0s complete.
- Use this page internally only. It references private prep artifacts and uncertainty labels.
- Use [[OpenAI-SDR-comprehensive-answer-expansion-bank]] for any visible prep surface.
- Use [[OpenAI-SDR-comprehensive-answer-expansion-bank]] for compact first sentences, anchors, stop lines, and do-not-say guardrails before starting a run.
- Use [[OpenAI-SDR-live-mock-interviewer-script]] when a friend, Codex, or self-timer is running the rehearsal.
- Use `python3 tools/openai_sdr_mock_runner.py --mode minimum` when Seth wants terminal timing and paste-ready Markdown rows.
- Use `python3 tools/openai_sdr_mock_runner.py --mode minimum --append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md` only after a real spoken run if Seth wants the runner to insert rows directly into [[#Run Log]] and [[#Weak Answer Repair Log]].
- Do not mark any rehearsal item `Rehearsed` unless there is a dated run, a timer result, and a weak-answer log.

## Completion Rule

A P0 rehearsal item can move from `Drafted` to `Rehearsed` only when all four conditions are true:

1. Seth answered aloud without reading.
2. The answer finished inside the target time plus a small grace window.
3. The score is at least `4 / 5` for concision, accuracy, Seth proof, customer value, and delivery.
4. Any weak answer has a repair note below.

`Ready` requires one additional clean repeat after repair.

## Methodology Backbone

This rehearsal log borrows three Second Brain rules:

| Rule | Source | How it changes rehearsal |
|---|---|---|
| Every generic touch spends trust in a finite account universe. | `/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/high-signal-enterprise-sales.md` | Prospecting answers must sound selective, sourced, and account-specific. |
| Enterprise selling is buyer-side co-authorship and risk removal. | `/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/high-signal-enterprise-sales.md` | Deal walkthrough must show stakeholder risk, proof criteria, and internal buyer enablement. |
| AI should make the seller more thoughtful, not noisier. | `/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/ai-native-account-intelligence.md` and `/Users/sethlim/Documents/Seth Second Brain/wiki/gtm-sales/agentic-gtm-campaign-workflows.md` | AI-prep and prospecting answers must mention source evidence, confidence labels, human review, and approval boundaries. |

## P0 Rehearsal Dashboard

| P0 item | Source answer | Target evidence | Status |
|---|---|---|---|
| Technical 20-minute block + 10-minute competitor/pitch block | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | One timed run logged in [[#Run Log]] with average score `>=4`. | Not run |
| Rapid-fire RAG answer | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | 20-second and 60-second versions delivered cleanly. | Not run |
| Rapid-fire hallucination answer | [[OpenAI-SDR-comprehensive-answer-expansion-bank]] | 15-second and 60-second versions delivered cleanly. | Not run |
| Deal walkthrough under 3 minutes | [[OpenAI-SDR-deal-cards-and-metrics]] | Boxo walkthrough delivered under `3:15`, no reading. | Not run |
| Metrics without notes | [[OpenAI-SDR-deal-cards-and-metrics]] | Metrics drill delivered with caveats and no invented numbers. | Not run |
| Motivation and why SDR | [[OpenAI-SDR-motivation-answer-bank]] | 30-second intro, why OpenAI, why SDR delivered without rambling. | Not run |
| VP career narrative | [[OpenAI-SDR-VP-career-and-story-bank]] | 2-minute career arc and 90-second transitions delivered cleanly. | Not run |
| Loom defense | [[OpenAI-SDR-Loom-case-package]] | Run only after actual prompt/account is confirmed. | Blocked on prompt |

## Run Sequence

Run these in order. Do not skip to chaos mock until the focused blocks are passable.

| Run | Duration | Questions | Pass threshold |
|---|---:|---|---|
| R1: Product rapid-fire | 20 minutes | OpenAI enterprise overview, LLM, agent, API, RAG, hallucination, RAG versus fine-tuning. | All answers under target; no unsupported claims. |
| R2: Work-surface/platform pitch | 10 minutes | Buying Codex versus alternate engineering surfaces, internal-build/platform leverage, OpenAI breadth, why SDR, product fit signals. | Respectful, no rip-and-replace, buyer-workflow led. |
| R3: Commercial/deal | 20 minutes | Boxo deal, Airwallex metrics, multi-threading, challenge, lesson, value-based selling. | Deal under `3:15`; metrics caveated accurately. |
| R4: VP Lauren rapid-fire | 15 minutes | RAG, hallucination, campaign, target accounts, metrics, why SDR, risk profile. | No answer over 60 seconds except deal walkthrough. |
| R5: VP Marlena narrative | 20 minutes | Walk through career, why each role, what was built, what worked, what did not, transitions. | Coherent arc; no defensive transitions. |
| R6: Chaos mock | 25 minutes | Random questions from all circuits. | No freeze, no private/process leakage, weak answers logged. |

## Answer Key: Product And Technical

### OpenAI Enterprise Overview

**Target:** 60 seconds.

Spine:

1. OpenAI has three enterprise layers: employee work surface, builder and agent surface, and trust layer.
2. The builder layer is concrete: Responses API, built-in tools, File Search, function calling, structured outputs, Realtime, Agents SDK, Apps SDK, Workspace Agents, and Codex.
3. Enterprise adoption starts as scattered usage, pilots, developer experiments, internal automations, and executive curiosity.
4. The BDR job is to turn that signal into a real opportunity: workflow, stakeholder map, governance concern, proof plan, and business outcome.

Pass line:

> Employee work surface, builder and agent surface, trust layer. Then map the account signal into a qualified opportunity.

Common failure:

- Listing products without explaining the buyer workflow.
- Saying "agents" without naming tools, data, actions, approvals, or proof.

Repair:

- Start with "I think about OpenAI in three layers" and include one builder example: internal-doc search, CRM/support tool call, structured CRM handoff, realtime voice, or Codex helping engineering build the workflow.

### RAG

**20-second version:**

> RAG means retrieval-augmented generation. The system searches a trusted knowledge source first, like company documents, internal policies, or a vector store, retrieves the most relevant context using search, embeddings, metadata, or a hybrid of those, and passes that into the model before it answers. It improves grounding, but it does not guarantee perfect accuracy.

**60-second version:**

> RAG is a way to make AI answers more grounded in current or company-specific knowledge. Instead of relying only on the model's training, the system searches an approved knowledge source, retrieves the best context, and passes that into the model before it answers. The reason this matters is that long context does not replace retrieval. Even a 200K-token model can struggle once you stuff in 100 to 200 pages of mixed material, and enterprise repos or document libraries are far bigger than that. So RAG is the routing layer: it chooses the right slices from internal policies, product docs, account notes, or operational procedures. The limitation is that retrieval can still pull stale or wrong context, so enterprise-ready RAG needs permissions, source quality, freshness, metadata, citations, evals, monitoring, and human review.

Pass criteria:

- Says retrieval plus generation.
- Says improves grounding.
- Says not perfect.
- Adds enterprise controls.

### RAG Versus Fine-Tuning

**45-second version:**

> RAG and fine-tuning solve different problems. RAG is for knowledge access: current docs, policies, account notes, filings, legal precedents, clinical guidelines, or support history. Fine-tuning is behavior adaptation. It can teach terminology, style, output format, or a repeated review pattern, but it is not a clean way to inject 50,000 documents into a model. For example, fine-tuning can help a healthcare workflow understand that MI often means myocardial infarction and follow a medical-report rubric, but the current patient file and latest policy should still come from retrieval. In enterprise systems, the answer is usually retrieval plus evals and review first, fine-tuning only when a stable repeated behavior keeps failing.

Pass criteria:

- Separates knowledge grounding from behavior adaptation.
- Says fine-tuning is not knowledge injection.
- Mentions domain quirks without overclaiming.
- Does not promise exact tuning method or availability.

### Workspace Agents Versus Workflow Automation

**20-second version:**

> I would not frame it as Workspace Agents versus n8n. Workflow tools are great for deterministic orchestration: triggers, branches, API calls, retries, logs, and handoffs. Workspace Agents are stronger when the work needs repeatable judgment: reading context, applying a rubric, drafting a recommendation, asking for approval, and improving the SOP over time.

**60-second version:**

> My default is still determinism first. If the process is just "form submitted, create CRM record, send Slack notification," use n8n, Make, Workato, Salesforce Flow, or a script. That is cheaper, faster, and easier to debug.
>
> Workspace Agents become interesting when the workflow is repeatable but still judgment-heavy. For example: read the account context, check CRM history, apply our qualification rubric, draft the follow-up, propose CRM updates, post a Slack brief, and ask for approval before anything goes out. That is not just moving data. That is turning a team SOP into a governed workflow.
>
> The useful frame is "thin harness, fat skills." The valuable part is the skill: the customer's SOP, rubric, source-of-truth map, examples, output format, approval policy, failure modes, and evals. n8n can still handle deterministic triggers and handoffs. Workspace Agents are the team-facing judgment layer in ChatGPT or Slack.

Pass criteria:

- Does not attack n8n or workflow tools.
- Says deterministic orchestration belongs in workflow tools.
- Says Workspace Agents are for repeatable judgment and team-owned SOPs.
- Mentions skills as SOP/rubric/source map/approval policy, not a vague prompt.
- Uses hybrid language: workflow tools can trigger or hand off; Workspace Agents own judgment and review.

### Hallucination

**15-second version:**

> No, I would not promise 100 percent avoidance. The right enterprise answer is mitigation: grounding, tools, structured outputs, evals, monitoring, and human review.

**60-second version:**

> I would answer no. Hallucination risk cannot be reduced to zero in a practical system, especially when the model reasons over ambiguous or incomplete information. The commercial question is whether the workflow can be scoped so errors are less likely, easier to detect, and safe enough for the use case. I would mitigate with trusted context, retrieval and tools, structured outputs where possible, evals, monitoring, source evidence, and human review for regulated or customer-impacting actions.

Pass criteria:

- Starts with "No."
- Does not sound apologetic.
- Says controlled uncertainty, not certainty.

### Buying Codex For Employees And Engineering Teams

**60-second version:**

> I would not claim Codex beats Claude Code or Cursor at every coding task. Developer preference matters, and for a pure IDE or terminal decision, I would run a bake-off. The stronger Codex argument is platform breadth. Since July 9, Chat, Work, and Codex sit in one ChatGPT desktop app. Chat helps you think, Work lets knowledge workers delegate outcomes, and Codex exposes the deeper technical environment for repos, terminals, tests, diffs, and PRs. OpenAI has said code is foundational to both Work and Codex - the difference is largely the experience presented to the user. Around that sits OpenAI's broader estate: apps, plugins, MCP, computer use, documents, data analysis, images, voice, video, memory, and automations. So ChatGPT is becoming the horizontal super app for work, while Codex is its engineering workbench and part of the execution layer. If the customer only needs a coding tool, test the tools. But if it wants governed AI adoption across engineering and the rest of the company, Codex has a much broader enterprise story.

Pass criteria:

- Respect existing developer tools.
- Explain Codex as work surface: coding loop plus knowledge-work loop.
- Explain why standardization matters: shadow AI, one control plane, reusable process.
- Do not claim generic benchmark or pricing superiority.

### Using OpenAI To Build Products And Workflows

**60-second version:**

> I would treat internal AI teams as a buying signal, but I would start with discovery rather than a platform argument. "We have an internal AI team" could mean control, a working prototype, a production blocker, security concern, cost concern, or vendor-dependence concern. I would ask what workflow they are trying to improve, what happens today, what target they are missing, what the cost or risk is if nothing changes, who owns the outcome, and what proof would make it safe to scale. Once that gap is clear, the answer may be build, buy, or hybrid. The customer should own the differentiated workflow, context, systems of record, policy, and change management. OpenAI helps where maintained platform primitives close the gap faster: models, retrieval, tools, structured outputs, agent orchestration, guardrails, review, tracing, evals, and governance.

Pass criteria:

- Treat internal build as a serious signal.
- Lead with discovery and gap diagnosis.
- Customer owns differentiated workflow/IP.
- OpenAI only enters where it helps close a real business gap.
- OpenAI supplies platform leverage, evals, observability, governance, and speed to production.

## Answer Key: Commercial And Metrics

### Boxo Deal Walkthrough

**Target:** under 3 minutes 15 seconds.

Spine:

1. Context: early Boxo selling SDK/miniapp infrastructure to fintech/super-app buyers.
2. Buyer problem: launch embedded services faster; initial ecommerce marketplace; future categories.
3. Stakeholders: CEO Singapore, Product Head Philippines, engineering Ukraine, legal/compliance, Boxo product/internal team.
4. Challenge: young-vendor maturity and technical/compliance skepticism.
5. Seth role: commercial orchestrator; mapped stakeholders, translated objections, led pricing/legal/commercial negotiation.
6. Result: first enterprise proof point; contributed to Boxo's USD 450K ARR across fintech clients.
7. Lesson: enterprise sales is structured risk removal.
8. OpenAI bridge: product signal must become workflow, stakeholder map, proof gaps, and risk questions for the Account Director.

Required phrases:

- "Underwriteable."
- "Structured risk removal."
- "Different stakeholders had different reasons not to say yes yet."

Do not say unless confirmed:

- Exact Unabank public entity details.
- Exact USD 300K figure as hard ARR.
- Unsupported implementation/security details.

### Metrics Without Notes

**Target:** 60 seconds.

Safe sequence:

1. Airwallex: `200%+` annual quota, `22` new logos.
2. Boxo: `USD 450K ARR` across `3` fintech clients; `9` strategic super-app partnerships.
3. Salescraft: `8` startups, `USD 1M+` client pipeline, `USD 200K` revenue over 12 months.
4. Caveat exact gaps: monthly close cadence, run-rate pipeline, close rate, cycle length, exact Airwallex average deal-size basis.

Live answer:

> The hard numbers I am comfortable using are: Airwallex, over 200 percent annual quota and 22 new logos; Boxo, USD 450K ARR across three fintech clients and nine strategic super-app partnerships; Salescraft, eight startup clients, USD 1M+ client pipeline, and USD 200K revenue over 12 months. For exact monthly close cadence, run-rate pipeline, close rate, or cycle length, I would rather confirm than guess. The useful pattern is that Airwallex proves quota and cadence, Boxo proves enterprise stakeholder mapping, and Salescraft proves AI-native GTM systems.

Pass criteria:

- Uses safe numbers.
- Caveats missing numbers without sounding evasive.
- Bridges each metric to the role.

## Answer Key: Motivation And Role Fit

### Tell Me About Yourself

**Target:** spoken long-form base story; cut later for stage timing.

> Yeah, so I did law at Cambridge, and quite early on I realized that corporate law was not really the path for me. The turning point was my dissertation, which was on AI use in sentencing. That was my first serious exposure to how technology could reshape institutions, workflows, and decision-making.
>
> It made me feel that if I wanted to do work with massive leverage, it probably was not going to be through law. So I asked myself what role I wanted to play inside a technology company.
>
> And naturally, I moved toward the commercial operating layer because that was what I actually enjoyed: how you understand customers, create trust, turn client uncertainty into a real opportunity, and help people make decisions when there is risk involved.
>
> My career started at Boxo, a seed-stage startup where I was thrown into the deep end of enterprise sales. The company was early, the product was technical - we sold SDK-based miniapp infrastructure that helped large apps embed third-party services into their own customer experience - and our ICP was very specific: large consumer platforms, fintechs, banks, super apps, and exchanges with at least around 2,000 employees and 50 million monthly active users. Think banks, Grab, GCash, Binance, and other platforms that wanted to create an all-in-one experience across food, delivery, travel, ecommerce, and other services, all connected to their own payment layer.
>
> A lot of the sales motion had to be built while we were selling. I learned by doing: prospecting, discovery, stakeholder mapping, demos, follow-up, and figuring out what actually moved a deal forward.
>
> The biggest thing I learned there was that enterprise sales is not really about persuading one person. It is about helping a group of people make a decision they can defend internally.
>
> In a deal like that, the buyer map includes the commercial team, product, engineering, legal, compliance, finance, and often a champion who likes the product but has to spend political capital to move it forward. So the job is to understand what each stakeholder needs to believe, what risk they are worried about, what proof would make the decision feel safe, and how to keep momentum without overpromising.
>
> That shaped a lot of how I think about enterprise sales. A good seller is not just trying to "close." They are trying to create decision confidence. They are helping the buyer answer: why change, why now, why this product, and why is this safe enough to take through the organization?
>
> Then I went to Airwallex because I wanted to experience the other side of sales: a more mature, quota-carrying environment with stronger operating discipline. Boxo taught me how to sell before the playbook existed. Airwallex taught me how to operate inside a more polished sales org: ICP discipline, qualification, pipeline generation, first-call preparation, follow-up, CRM hygiene, handoffs, and coaching.
>
> The deals were more mid-market, but still with serious commercial buyers, including household names like Lee Hwa Jewellery, EU Holidays, and WeBuy, generally companies with at least around 20 to 50 million in annual revenue. So the sales motion was different from Boxo. It was less about inventing the enterprise narrative from scratch and more about running a clean, repeatable process: finding the right accounts, qualifying hard, understanding the payment or FX workflow, creating urgency, managing next steps tightly, and keeping enough operating cadence to actually hit the number.
>
> My first real touchpoint with AI was GPT-4 in 2023. I remember trying it and feeling like, okay, this is probably going to change the shape of work. Then by late 2024, as I started using frontier models more seriously and speaking with engineers close to the frontier, that conviction became much stronger.
>
> Around that time, I also received a $1,000 grant from OpenAI. It was not a huge amount of capital, but it gave me a concrete push to stop waiting for the perfect AI role and start building something in the space.
>
> There were not many AI roles that fit me at the time, especially in Singapore, so I decided to create my own opportunity. And I did what I knew best, which was sales. I reached out to startups and pitched them on automating the GTM work I had lived manually: researching accounts, opening a million tabs, mapping stakeholders, writing outbound, cleaning CRM notes, and trying to turn messy signals into useful seller action.
>
> The important part was not "use AI to write more emails." That is actually the least interesting version of it. The real work was account intelligence: which accounts are worth attention, which signals actually matter, what evidence supports the outreach angle, what proof point is relevant, and how to package that into something a salesperson can actually use.
>
> In a way, Salescraft came directly from my own frustration as a seller. I had lived the manual GTM loop before automating it.
>
> It also made me realize that AI does not remove the human part of sales. If anything, it raises the bar. AI can help with research, synthesis, and prep, but the judgment still matters: what to prioritize on a discovery call based on what you are hearing in real time, how to connect with a buyer, how to build trust, and how to help someone feel safe enough to move.
>
> Then through a mutual connection, I got referred into a couple of San Francisco work trials: one at Sample Healthcare and one at Wordware, which is now building Sauna. I ended up choosing Sample because I wanted the enterprise GTM exposure. They were closer to messy, real customer workflows, and they had an internal low-code tool that would let me build workflows directly.
>
> That was eye-opening because it showed me the same pattern in a different domain. The hard part was not just calling an LLM. The hard part was understanding the workflow well enough to know what should happen next.
>
> And that actually brought me back to enterprise sales, rather than away from it. You cannot qualify a serious enterprise AI opportunity just by asking whether someone is "interested in AI." You have to understand where the use case sits in the business, who owns the workflow, what system is the source of truth, what risk would block adoption, and what proof would make the buyer comfortable moving from curiosity to a real pilot.
>
> That became my mental model for AI sales: understand the workflow, the stakeholders, the source of truth, the risk, the urgency, and the handoff points. Then use that understanding to create a clearer path from interest to pilot to real opportunity.
>
> When I came back to Singapore, Codex and GPT-5 had just come out, and that expanded my sense of what was possible again. The shift was that AI was no longer just helping technical people code faster. It was starting to let the person closest to the work build the missing tool themselves.
>
> So I did sales again, but with a builder angle. I reached out to startups, sat with the knowledge workers actually doing the work, and built internal tools around their workflows.
>
> I built what was basically an LLM wiki and company second brain for a startup. We pulled in sources like Drive, Notion, Slack, WhatsApp, documents, and transcripts so people could actually find the context they needed. Under the hood, it used RAG, so the agent could retrieve the right material before helping with the work. Then I worked with the operators to turn recurring tasks into skills: draft an SOW, prepare a commercial pricing proposal, build a deck, generate an account brief, or prep a meeting. The important thing was not "chat with docs." It was turning messy company memory into useful business workflows people could review.
>
> I also built an enterprise ABM system for a sales team that turned account research, buying signals, and source material into tailored campaign assets and personalized pages. The impact was that salespeople could build beautiful, account-specific websites to convey their point of view more clearly and improve booking and conversion rates, while keeping the underlying claims grounded back to sources.
>
> I think these use cases are just the start. As models keep getting faster, better, and cheaper, I am really excited to see what new ways of working become possible.
>
> So if I had to summarize it, I started in law, built my foundation in sales, and then explored AI deeply by selling and building AI systems around the problems I had experienced myself. My edge is that I can sit with customers, do discovery, understand the business workflow, map the stakeholders and risks, and go deep enough technically to shape useful AI systems around it.
>
> That is why OpenAI's Strategic BDR role feels specific to me. It is still sales, but it is the kind of sales I care about: technical, consultative, and trust-heavy. It sits at the point where product usage, developer experimentation, pilots, and enterprise curiosity need to become real opportunities.
>
> That is the kind of work I want to do next: helping customers move from interest in AI to real workflows, real buying processes, and opportunities that an Account Director can take forward.

Pass criteria:

- Sales first, AI systems second.
- APAC/regulatory relevance.
- Ends on OpenAI role fit.

### Why SDR

**Target:** 45 seconds.

> I see it as optimizing for slope, not title. I have carried sales responsibility before, but OpenAI's enterprise motion is a different learning room. I would rather enter close to account strategy and Account Director partnership, earn trust, and learn how the best sellers here turn AI demand into durable deployments than force a title match too early. The work itself is not junior to me if it involves product signal, stakeholder mapping, discovery, and enterprise readiness.

Pass criteria:

- Calm under pushback.
- Not entitled.
- Not apologetic.

### How Do You Use Codex Daily?

**Target:** 60-75 seconds.

> Codex is becoming my main workbench, not just a coding assistant. The way I use it is very close to the Codex-maxxing idea: work should have an operating loop, not just a prompt and an answer.
>
> For me that means a large-context, auto-compacting durable thread can become something like a personal chief of staff. It can work from one canonical markdown task list, keep a running tracker, remember preferences and open loops, and check the places where work actually appears.
>
> Voice input matters because it gets more of my actual thinking into Codex. The benefit is not speed. It is that the agent gets the unedited version of my thinking. The same is true with transcripts: a call, meeting, or messy conversation can become starting material, and the plan is often better because the model sees the rough version, not only the polished one.
>
> Steering is the next piece. I can keep adding direction while Codex is already working instead of waiting for the current step to finish. If I am reviewing a page, I can say: make this smaller, the copy is wrong, check this spacing, then send the preview to the person who needs to review it. The unit stops being one prompt and one answer. It becomes a small operating loop.
>
> Memory is the other important piece. A long thread can remember a lot, but that memory is trapped inside the thread unless the useful parts get written somewhere durable. So I keep an Obsidian-style vault with TODOs, people, projects, agent notes, daily notes, decisions, and open loops. The point is to turn what the thread learns into artifacts I can inspect, edit, diff, and reuse.
>
> It also means computer and browser use. The distinction I use is: `$browser` is for local web surfaces I want to inspect and annotate, `@chrome` is for signed-in browser state and multiple tabs, and `@computer` is for work that only exists as a GUI. That matters for life admin and back-office work: taxes, government portals, booking links, vendor forms, expense flows, insurance forms, or account settings often do not have clean APIs. Codex can gather context, click through the boring parts, prepare the draft, and leave me with the decision.
>
> Connectors like Gmail, Calendar, Slack, Sheets, and messaging surfaces matter because a lot of work starts in inboxes, calendars, and conversations. On a one-hour heartbeat, a thread can check what changed, flag conflicts, keep tasks clean, suggest meeting times, update trackers or CRM, research a supplier or partner, and draft the first-pass reply or follow-up for me to review.
>
> Mobile matters too because remote control makes longer loops portable. I can kick off a task, go for a walk or do groceries, and still check in from my phone to review what Codex found, answer a question, approve the next step, or change direction. The work keeps going from the machine with the right files and permissions, and I can unblock it without being back at my desk.
>
> I also think goals are important. A long-running task should have a success criterion: pass the tests, produce the artifact, verify the output, or stop when a condition is met. Otherwise the agent can generate a lot of motion without necessarily finishing the job.
>
> The side panel is the part that makes this feel different from a chatbot. Codex can create or inspect markdown, spreadsheets, PDFs, slides, HTML pages, local apps, or browser surfaces, and I can review the same artifact it is working on.
>
> The learning piece matters too. When I finish a Codex session and there is a real artifact or diff, I can ask Codex to teach me from the work it just did. I have an `explain-diff-html` skill that turns the code change into an HTML lesson with system background, intuition, code walkthrough, diagrams, examples, and a quiz. That is the Geoffrey Litt point I like: agents can write artifacts that help humans understand code. So the overall pattern is: AI helps me move faster, but it does not send things blindly. It proposes, drafts, tracks, teaches, and reminds; I use my judgment to edit, augment, approve, or ignore.

Pass criteria:

- Says Codex is a workbench or operating loop, not only coding.
- Names the Codex-maxxing primitives: durable threads/chief-of-staff loop, voice/transcripts, steering, memory, tools, heartbeats, goals, side panel.
- Mentions review/human judgment.
- Connects daily usage to enterprise adoption pattern.

## Answer Key: Prospecting And APAC

### Prospecting Motion

**Target:** 60 seconds.

Spine:

1. Start with account strategy, not message volume.
2. Move from TAM to named account list and tier by fit/readiness.
3. Separate true signals from messageable signals.
4. Map who has to believe, approve, defend, implement, and use the workflow.
5. Draft the message from workflow hypothesis and proof proximity.
6. Feed replies and objections back into the account thesis for the AD.

Live answer:

> I would run prospecting as account strategy, not message volume. For strategic APAC accounts, I would start with the full account universe, turn it into a named target list, and tier accounts by fit, readiness, urgency, and messageability. Then I would build an account thesis: why this account, why now, what workflow might matter, who has to believe or approve, and what proof is missing. A signal can be true but not messageable, so I would only reach out when I can connect it to a person, workflow, business pressure, proof point, and respectful reason to talk. AI helps with research, scoring, briefs, and first drafts, but human judgment decides what is worth sending. The handoff to the AD should be the real account state: why this account, who matters, what risk or proof gap remains, and what next step is credible.

Pass criteria:

- "More thoughtful, not noisier."
- Source-backed.
- Human review.
- Account Director usefulness.

### APAC Nuance

**Target:** 60 seconds.

Spine:

1. Do not treat APAC as one market.
2. Boxo proof: MoMo/Zalo or ZaloPay, Touch 'n Go, DANA, TrueMoney, GCash; PMF and sales motion do not travel cleanly.
3. Singapore and ANZ: regulated readiness, regional HQ conversations, governance-heavy buyers.
4. SEA: relationship-driven; Vietnam language/channel nuance; Philippines English/ops talent but software value must be tied to revenue or painful-error reduction, not generic automation.
5. Adoption curve: in APAC you may be recruiting first innovators and building an APAC-specific reference base.
6. Better motion: prove you understand the company's identity, act as trusted advisor over time, ask good questions about what is keeping this company up at night.
7. First landing answer: Singapore unless official territory priorities suggest otherwise.

Pass criteria:

- Avoid stereotypes.
- Mention channels only with caveat.
- Tie to first-market logic.

## Run Log

Fill one row per real spoken run.

| Date | Run | Mode | Time | Score | Weak answers | Repair needed | Evidence |
|---|---|---|---:|---:|---|---|---|
| 2026-06-29 | R1 product rapid-fire | Not run | - | - | - | - | - |
| 2026-06-29 | R2 competitor/pitch | Not run | - | - | - | - | - |
| 2026-06-29 | R3 commercial/deal | Not run | - | - | - | - | - |
| 2026-06-29 | R4 VP Lauren rapid-fire | Not run | - | - | - | - | - |
| 2026-06-29 | R5 VP Marlena narrative | Not run | - | - | - | - | - |
| 2026-06-29 | R6 chaos mock | Not run | - | - | - | - | - |

Evidence can be a note like `self-timed aloud`, `recorded audio`, `mock with friend`, or `Codex prompt-run transcript`.

For compact answer starts, use [[OpenAI-SDR-comprehensive-answer-expansion-bank]]. For the question-by-question script, scoring prompts, and run capture template, use [[OpenAI-SDR-live-mock-interviewer-script]]. For terminal timing and paste-ready log rows, use `python3 tools/openai_sdr_mock_runner.py --mode minimum`. To write a real run directly into this page, use `python3 tools/openai_sdr_mock_runner.py --mode minimum --append-log wiki/domains/OpenAI-SDR-P0-rehearsal-execution-log.md`.

## Weak Answer Repair Log

| Question | Failure mode | Repair line | Re-test status |
|---|---|---|---|
| RAG | Too technical or too long. | "Retrieval plus generation; improves grounding; not perfect." | Not run |
| Hallucination | Did not start with "No." | "No. I would not promise 100 percent avoidance." | Not run |
| Boxo deal | Too much chronology. | Use stakeholder-risk spine: buyer, stakeholders, challenge, Seth role, result, lesson. | Not run |
| Metrics | Over-caveated and sounded evasive. | Lead with safe numbers first, then caveat missing exacts. | Not run |
| Why SDR | Sounded defensive. | "Optimizing for slope, not title." | Not run |
| Prospecting | Sounded like AI automation. | "AI makes the seller more thoughtful, not noisier." | Not run |

## Scoring Rubric

Score `1-5`.

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Time control | Over by 50%+ | Slightly over | On time or under |
| Directness | Starts with background | Eventually answers | First sentence answers |
| Seth proof | Generic | One proof point | Specific proof plus OpenAI bridge |
| Customer value | Product-first | Mixed | Workflow, stakeholder, outcome first |
| Accuracy | Overclaims | Mostly careful | Verified or caveated |
| Calmness | Defensive or rushed | Fine | Serious, warm, controlled |

Minimum pass:

- Average score `>=4`.
- No dimension under `3`.
- No unsupported OpenAI/security/model/process claim.

## How To Update The Master Checklist After A Run

Use this rule:

| Evidence | Checklist status |
|---|---|
| No spoken run | Keep `Drafted` or `Not run`. |
| One timed run with score `>=4` and weak-answer log | Mark relevant item `Rehearsed`. |
| Two clean runs with no major weak answers | Mark relevant item `Ready`, if facts are also verified. |
| Uses exact model/account/security/metric claims | Keep `Needs final verification` until current source or Seth confirmation is attached. |

## Next Best Rehearsal

If Seth has 20 minutes:

1. RAG 20s.
2. Hallucination 15s.
3. Buying Codex / engineering surface 60s.
4. OpenAI platform / internal build 60s.
5. Boxo 3-minute walkthrough.
6. Metrics 60s.
7. Why SDR 45s.
8. Score and repair the weakest two.

If Seth has 7 minutes:

1. RAG 20s.
2. Hallucination 15s.
3. Metrics 60s.
4. Why SDR 45s.
5. One clean stop line: "The OpenAI parallel is..."
