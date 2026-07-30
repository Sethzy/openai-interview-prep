---
type: source
title: "OpenAI: Harness Engineering, Codex, And Agent-First Software"
address: c-000032
source_type: article
author: "Ryan Lopopolo, OpenAI"
date_published: 2026-02-11
created: 2026-06-30
updated: 2026-07-01
url: "https://openai.com/index/harness-engineering/"
confidence: high
tags:
  - source
  - openai-interview-prep
  - codex
  - harness-engineering
  - agentic-engineering
  - cursor-opencode
  - builder-agent-surface
  - codex-competitive-positioning
status: current
related:
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
  - "[[OpenAI-SDR-comprehensive-answer-expansion-bank]]"
sources:
  - ".raw/articles/openai-harness-engineering-codex-agent-first-2026-06-30.md"
  - "/Users/sethlim/Documents/Seth Second Brain/raw/intentional/pasted/sunder-sync-2026-06-11/154-openai-harness-engineering-codex-agent-first.md"
  - "https://openai.com/index/harness-engineering/"
  - "https://developers.openai.com/codex/codex-manual.md"
  - "https://developers.openai.com/api/docs/guides/agents"
  - "https://developers.openai.com/api/docs/guides/tools"
  - "https://developers.openai.com/api/docs/pricing"
  - "https://developers.openai.com/codex/cloud"
  - "https://developers.openai.com/codex/app/features"
  - "https://developers.openai.com/codex/app/worktrees"
  - "https://developers.openai.com/codex/app/review"
  - "https://developers.openai.com/codex/skills"
  - "https://developers.openai.com/codex/app/automations"
  - "https://developers.openai.com/codex/appshots"
  - "https://developers.openai.com/codex/app/browser"
  - "https://developers.openai.com/codex/enterprise/managed-configuration"
  - "https://developers.openai.com/codex/enterprise/governance"
  - "https://openai.com/business-data/"
  - "https://openai.com/enterprise-privacy/"
  - "https://help.openai.com/en/articles/9261474-openai-compliance-platform-for-enterprise-and-edu-customers"
  - "https://help.openai.com/en/articles/12628342-company-knowledge-in-chatgpt-business-enterprise-and-edu"
  - "https://openai.com/business/pricing/"
  - "https://openai.com/index/openai-launches-the-deployment-company/"
  - "https://openai.com/index/previewing-gpt-5-6-sol/"
  - "https://cursor.com/product"
  - "https://cursor.com/docs.md"
  - "https://cursor.com/help/models-and-usage/available-models.md"
  - "https://opencode.ai/docs/"
  - "https://opencode.ai/docs/models"
  - "https://github.com/anomalyco/opencode/pull/9127"
  - "https://code.claude.com/docs/en/overview"
  - "https://code.claude.com/docs/en/agent-sdk/overview"
  - "https://code.claude.com/docs/en/agent-sdk/subagents"
  - "https://docs.langchain.com/oss/python/deepagents/overview"
  - "https://github.com/QwenLM/qwen-code"
  - "https://docs.anthropic.com/en/docs/about-claude/pricing"
  - "https://docs.anthropic.com/en/docs/about-claude/models/overview"
  - "https://arena.ai/leaderboard/text"
  - "https://arena.ai/leaderboard/code/webdev"
  - "https://docs.z.ai/guides/llm/glm-5.2"
source_confidence: "Official OpenAI article captured in Seth Second Brain on 2026-06-11 and copied into this prep vault on 2026-06-30. Codex surface claims were checked against the current Codex manual on 2026-07-01. Competitor and framework descriptors are light-touch only, checked against public pages and a GitHub PR on 2026-07-01. Pricing/benchmark claims are volatile and should be rechecked live before use."
---

# Source: OpenAI: Harness Engineering, Codex, And Agent-First Software

Navigation: [[index]] | [[sources/_index|Sources]] | [[OpenAI-SDR-comprehensive-answer-expansion-bank]]

## Source Boundary

Use this source for two answer families:

1. Buying Codex for employees and engineering teams versus Cursor, Claude Code,
   OpenCode, open-source models, or internal harnesses.
2. Using OpenAI to build AI into products and workflows versus internal build,
   LangChain-style agent frameworks, Claude Agent SDK-style harnesses, Vercel
   AI tools, or open-source model stacks.

The useful claim is not "Codex is always better" or "OpenAI is always cheaper."
The useful claim is that agent performance depends on the model plus the
harness plus workflow controls, and enterprise adoption depends on governance,
evals, observability, and support around the work.

For the builder/internal-team answer, the 2026-07-01 sales-framework pass
changes the live spine: do not lead with platform primitives. Lead with
discovery. Identify the workflow gap, current state, business impact, urgency,
stakeholders, and proof required. Then position OpenAI only where maintained
platform primitives help close that gap faster or more safely.

This source should be used carefully. The OpenAI article describes a specific
internal software project and explicitly warns that the level of autonomy
depends on repository structure and tooling. Do not generalize it into a blanket
promise that any enterprise can get the same results without similar
investment.

## Key Claims

- OpenAI frames the shift as humans steering while agents execute bounded work.
- The engineering role moves upward into specifying intent, designing
  environments, and building feedback loops that make agent work reliable.
- Codex used standard development tools directly, including GitHub tooling,
  local scripts, and repository skills, instead of depending on humans to copy
  context into chat.
- The article's strongest enterprise lesson is "agentability": make the
  codebase, docs, logs, tests, observability, and review loops legible to the
  agent.
- Repository-local knowledge matters. If product decisions, engineering norms,
  security guidance, or operating context live only in docs, Slack, or people's
  heads, the agent cannot reliably use them.
- The practical harness includes worktrees, standard tools, browser/app
  validation, logs, metrics, traces, code review, custom checks, and human
  escalation.
- OpenAI's current Codex manual supports a broader first-party surface map:
  Codex app, CLI, IDE extension, cloud/local/worktree modes, review, skills,
  automations, SDK, MCP server usage, Agents SDK orchestration, sandboxing,
  approvals, governance, analytics, compliance export, and managed
  configuration.
- OpenAI's June 2026 Codex knowledge-work pages strengthen the "work surface"
  wedge: Codex has more than 5 million weekly active users, knowledge workers
  are about 20% of users, and non-developer adoption is growing faster than
  developer adoption. OpenAI explicitly frames non-developer use around reports,
  spreadsheets, presentations, contracts, research, data analysis, workflow
  automation, lightweight internal tools, dashboards, executive materials, and
  creative briefs.
- The buyer reason for standardizing is not centralization for its own sake.
  Use three practical reasons: shadow AI is already happening, so employees need
  an approved surface instead of random tools; companies need one control plane
  for tool access, approvals, sharing, logs, and spend; and scattered prompt
  hacks should become reusable company process through shared skills, agents,
  templates, rubrics, sources of truth, and review paths. Microsoft Work Trend
  Index 2024 is the evidence handle for BYOAI: 78% of AI users were bringing
  their own AI tools to work.
- Codex app quality-of-life details now matter in the live answer: steering,
  side chats/status, Appshots, in-app browser preview and annotation,
  browser-use validation, Git diff review, worktrees, integrated terminal,
  artifact previews, IDE sync, skills, automations, compaction/durable threads,
  voice input, and subagents.
- The daily-driver answer provides Seth's personal version of that wedge:
  durable auto-compacting threads, voice input, steering, file-backed memory,
  browser/computer use, connectors, heartbeats, mobile review, goals, and
  artifact inspection make Codex feel closer to a personal chief of staff than
  a coding-only assistant.
- Second Brain harness notes support a nuanced post-training point: modern
  agent products co-evolve model behavior and harness primitives. The
  OpenCode PR adding an `apply_patch` tool for OpenAI models is a useful proof
  texture, but not a universal rule that only the first-party harness can work.
- The live answer should not rely on stale benchmark or pricing deltas. Current
  pricing and leaderboards change quickly, and some model-provider comparisons
  cut different ways. Use exact numbers only if rechecked immediately before
  the interview.
- Cursor's official product page frames Cursor as an AI coding agent across
  multiple work surfaces, so the answer should respect it as a serious
  developer-product competitor.
- OpenCode's official docs call OpenCode an open-source AI coding agent with
  terminal, desktop app, and IDE extension surfaces. The "open/local/hackable"
  phrasing should stay light unless rechecked before live use.

## 2026-07-01 Verification Addendum

This pass used four parallel research lanes: official OpenAI product docs,
competitor/tooling sources, pricing/benchmark/model claims, and enterprise
governance/deployment sources. The answer frame survived, but several wording
constraints matter.

### Safe Claims

- Codex is OpenAI's first-party coding agent for code work across app, CLI,
  IDE, and cloud/web surfaces. Avoid implying identical feature parity across
  every surface.
- Codex app features can be described as local/worktree/cloud modes, Git diff
  review, skills, automations, in-app browser, Computer Use, integrated
  terminal, and related workflow surfaces, with plan/admin availability caveats.
- OpenAI platform primitives include Responses API, hosted tools such as web
  search and File Search, function calling, structured outputs, remote MCP/tool
  integrations, Agents SDK orchestration, handoffs, state/sessions,
  guardrails, human review, tracing, and eval paths.
- ChatGPT Enterprise/Business can be described as a governed employee adoption
  surface with admin controls, privacy commitments, analytics/usage visibility,
  Company Knowledge and apps/connectors where enabled, and enterprise support
  paths where eligible.
- Cursor, Claude Code, OpenCode, Qwen Code, LangChain Deep Agents, and Claude
  Agent SDK are serious adjacent tools/frameworks. The live answer should
  respect them and ask where each layer belongs.
- OpenAI has a broad first-party modality surface across text, code, image
  generation/editing, audio/realtime, transcription, and video. Claude's
  current model overview supports image input/understanding with text output;
  GLM-5.2 official docs list text input and text output.

### Caveats To Keep

- Appshots are a macOS Codex app feature. Do not describe them as a general
  cross-platform, CLI, or web feature.
- The in-app browser is for local, file-backed, and public pages. Do not say it
  uses a user's signed-in Chrome profile, cookies, existing tabs, or browser
  extensions.
- Browser Use can operate the in-app browser when the relevant plugin,
  approvals, and allowlists are available. Keep API Computer Use and Codex
  app Computer Use conceptually separate.
- OpenCode PR #9127 is a useful proof texture because it added an
  `apply_patch` path for OpenAI models. Do not claim it proves all OpenAI
  models only work well in Codex or always use that tool.
- Vercel Eve should not be used as an official customer-support template
  example unless a Vercel source is found. Official evidence supports Eve as a
  filesystem-first agent framework and Vercel's AI support work separately;
  the Eve customer-support connection is secondary reporting.
- OpenAI pricing and benchmark claims are mixed by model, tier, benchmark,
  tokenizer, context, cache, batch/flex/priority mode, regional/data-residency
  routing, and workload. Avoid "always cheaper" and "wins every benchmark."
- GPT-5.6 Sol/Terra/Luna were verified as limited preview in this pass. Do not
  imply general availability.
- Frontier, Deployment Company, customer success, solutions/deployment
  engineering, AI advisors, SLAs, residency, compliance features, and support
  levels should be described as eligible, contracted, or account-dependent.

### Sales-Framework Reframe

Second Brain QMD retrieval on 2026-07-01 added a sales-method layer from
`High-Signal Enterprise Sales`, `Founder-Led Enterprise Sales Playbooks`,
`AI-Native Account Intelligence`, `Agentic GTM Campaign Workflows`, `Sales
Leadership And Rep Operating Systems`, and the gap-selling raw source. The
useful synthesis:

- Do not stop at "pain." Find the target state, current reality, shortfall,
  cause, cost, and consequence.
- Treat "we have internal AI teams" as discovery material. It may reveal a
  control need, a prototype stuck before production, a governance blocker, a
  trust gap, or a staffing/cost issue.
- Make the champion safer: identify who must believe, what Finance or
  procurement will ask, and what proof the buyer needs when the seller is not
  in the room.
- Use OpenAI's platform primitives as the bridge only after the business gap is
  clear.

## Interview Use

### Buying Codex For Employees And Engineering Teams

> I would start by agreeing with part of the premise. If developers already like
> Cursor, Claude Code, OpenCode, Qwen Code, or an internal harness, I would not
> attack that. Developer pull is a good signal.
>
> The reason Codex is different is that it is OpenAI's first-party agentic work
> surface, not just another wrapper around a model or another coding tool. The
> value is the model plus the harness: repo context, file editing, terminal,
> tests, browser validation, worktrees, review, approvals, skills, automations,
> app/CLI/IDE/cloud modes, SDK/MCP surfaces, and enterprise controls.
>
> That matters because coding-agent reliability is not just model intelligence.
> It is whether the agent can read the repo, use the right tools, run tests,
> inspect diffs, validate the app, keep state, ask for approval, and leave
> behind something reviewable. Codex is built as OpenAI's first-party surface
> for that loop.
>
> So the live sales answer is: Cursor may win for some developers as their
> preferred IDE. OpenCode may win when openness or local control is the
> priority. Claude Code is a serious agentic coding peer. Codex is compelling
> when the buyer wants one OpenAI work surface that developers can use for
> repo/test/PR workflows and knowledge workers can use for reports,
> spreadsheets, presentations, contracts, research, data analysis, workflow
> automation, and lightweight internal tools, all under a governed enterprise
> deployment.

### Using OpenAI To Build AI Into Products And Workflows

> I would treat internal AI teams as a buying signal, not something to dismiss.
> But I would not answer it first as a platform argument. I would use discovery
> to understand the gap.
>
> "We have an internal AI team" could mean they want control, they already have
> a prototype, they are blocked getting to production, or they are worried
> about security, cost, or vendor dependence. Those are different problems.
>
> So I would ask: what workflow are you trying to improve, what happens today,
> what target are you missing, what is the cost or risk if nothing changes, who
> owns the outcome, and what proof would make the team comfortable scaling it?
>
> Once that is clear, the answer may be build, buy, or hybrid. The customer
> should own the differentiated parts: workflow logic, proprietary context,
> product UX, systems of record, policy, risk rules, eval criteria, approval
> model, and change management. OpenAI is relevant where maintained platform
> primitives help: models, retrieval, tool use, structured outputs, agent
> orchestration, guardrails, human review, tracing, evals, enterprise controls,
> and deployment patterns.

## Discovery Questions

- What are engineers using today: Cursor, GitHub Copilot, Claude Code, Codex,
  OpenCode, internal tools, or a mix?
- Is the pain simple autocomplete/chat, or longer-running engineering work:
  bug reproduction, tests, review, migration, refactoring, CI failures, or
  maintenance?
- Does the team need individual IDE productivity, or a governed engineering
  workflow across local, cloud, CI, review, and internal tooling?
- What matters most: developer preference, first-party OpenAI model fit,
  openness, local control, enterprise governance, auditability, SDK/MCP
  integration, or cost?
- Where do coding agents fail today: wrong context, tool misuse, poor review,
  lack of tests, security concerns, no traceability, or inability to run
  longer tasks?
- What has the internal AI team already built, and what is production versus
  experimental?
- Where is the bottleneck: model quality, data access, evals, integration,
  governance, security review, cost, staffing, or adoption?
- Which systems of record need to be connected, and what actions require human
  approval?
- Would the right architecture be internal build, OpenAI platform, framework
  layer, SI/partner support, or hybrid?

## Guardrails

- Do not say Cursor or OpenCode are weak products.
- Do not claim Codex wins every benchmark or every developer preference test.
- Do not say OpenAI models only work well in Codex.
- Do not say OpenAI is always cheaper or always wins every benchmark.
- Do not say open source, Anthropic, Cursor, OpenCode, LangChain, Vercel, or
  internal build are invalid choices.
- Do not promise a buyer they will reproduce OpenAI's internal project results.
- Do not pitch full autonomy. Pitch scoped agentic engineering: plan, act,
  verify, repair, review, and escalate.
- Keep the answer tied to enterprise buying criteria: workflow fit, governance,
  integration, reliability, visibility, and developer adoption.

## Pages Updated From This Source

- [[OpenAI-SDR-comprehensive-answer-expansion-bank]]: replaced separate
  internal-build, Codex/Cursor/OpenCode, open-source, and Anthropic objection
  sections with two broader headers: buying Codex/work surfaces, and using
  OpenAI to build products/workflows.
- [[OpenAI-SDR-comprehensive-answer-expansion-bank]]: collapsed the old objection
  cluster into the same two product-fluency sections and updated rapid-fire and
  evidence-ledger rows.
- [[OpenAI-SDR-comprehensive-answer-expansion-bank]]: added a screen-share-safe version
  of the two-header answer.
