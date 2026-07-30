---
name: parallel-deep-research
description: "ONLY use when user explicitly says 'deep research', 'exhaustive', 'comprehensive report', or 'thorough investigation'. Slower and more expensive than parallel-web-search. For normal research/lookup requests, use parallel-web-search instead. Supports multi-turn when the Parallel Task MCP exposes prior interaction or run context."
user-invocable: true
argument-hint: <topic>
compatibility: Requires the Parallel Task MCP server and internet access.
metadata:
  author: parallel
---

# Deep Research

Research topic: $ARGUMENTS

Use the Parallel Task MCP server, not `parallel-cli`.

Sources: Parallel Task MCP docs at `https://parallel.ai/docs/integrations/mcp/programmatic-use`.

## When to use (vs parallel-web-search)

ONLY use this skill when the user explicitly requests deep/exhaustive research. Deep research is 10-100x slower and more expensive than parallel-web-search. For normal "research X" requests, quick lookups, or fact-checking, use **parallel-web-search** instead.

## Setup Check

Parallel Task MCP server:

```json
{
  "mcpServers": {
    "parallel_task": {
      "url": "https://task-mcp.parallel.ai/mcp",
      "headers": {
        "Authorization": "Bearer ${PARALLEL_API_KEY}"
      }
    }
  }
}
```

If Parallel Task MCP tools are not available in the current session, say the MCP is missing and give the server URL above. Do not install or invoke `parallel-cli`.

## Workflow

1. Convert `$ARGUMENTS` into a precise research brief. Include scope, date boundaries, geography, output format, and any requested depth.
2. Call the Parallel Task MCP tool that creates or runs a research task. Ask for a markdown report with inline citations unless the user explicitly wants structured JSON.
3. If the MCP exposes processor/depth choices, default to a balanced deep-research tier. Use lighter tiers for follow-ups and higher tiers only when the user explicitly asks for exhaustive coverage.
4. If the first response returns a task/run ID instead of the final report, use the Task MCP status/result tools to poll or retrieve the completed result. If the task is still running after the current tool window, tell the user it is still running server-side and include any run ID or tracking URL returned by the MCP.
5. For follow-up questions, pass the prior interaction/run ID when the MCP exposes that field. If not, include the previous report summary and cited sources in the new brief.

## Prompt Shape

Use a brief like this:

```text
Research topic: <topic>
Depth: deep but concise
Output: markdown report with inline citations and a short executive summary
Coverage: include primary sources where available; note uncertainty and conflicting evidence
Constraints: <dates/geography/domains/user constraints>
```

## Response format

When the MCP returns a completed report:

1. Lead with the executive summary.
2. Include the key findings and cite claims inline using the citations returned by Parallel.
3. Include source links returned by the task result.
4. Share the interaction/run ID if returned, and say it can be used for follow-up research.

If the MCP returns only a queued/running status, tell the user the task is running and provide the run ID or monitoring URL. Do not fabricate a summary before results are available.

**Remember the interaction/run ID** when available. If the user asks a follow-up question that relates to this research, use it as prior context in the next Parallel Task MCP call.
