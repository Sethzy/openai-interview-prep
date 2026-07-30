---
name: parallel-web-search
description: "DEFAULT for all research and web queries. Use for any lookup, research, investigation, or question needing current info. Fast and cost-effective. Only use parallel-deep-research if user explicitly requests 'deep' or 'exhaustive' research."
user-invocable: true
argument-hint: <query>
compatibility: Requires the Parallel Search MCP server and internet access.
metadata:
  author: parallel
---

# Web Search

Search the web for: $ARGUMENTS

Use the Parallel Search MCP server, not `parallel-cli`.

Sources: Parallel Search MCP docs at `https://parallel.ai/docs/integrations/mcp/programmatic-use` and `https://parallel.ai/articles/openclaw-best-practices-web-search`.

## Setup Check

Parallel Search MCP server:

```json
{
  "mcpServers": {
    "parallel_web_search": {
      "url": "https://search-mcp.parallel.ai/mcp",
      "headers": {
        "Authorization": "Bearer ${PARALLEL_API_KEY}"
      }
    }
  }
}
```

Typical tool names:

- `web_search` for semantic/current web search
- `web_fetch` for extracting content from specific result URLs

If Parallel Search MCP tools are not available in the current session, say the MCP is missing and give the server URL above. Do not install or invoke `parallel-cli`.

## Workflow

1. Turn `$ARGUMENTS` into a natural-language search objective. Add a few targeted query terms only when the user's question needs named entities, dates, versions, or exact phrases.
2. Call the Parallel Search MCP `web_search` tool with the objective. Use a small result set first, usually 10 results.
3. For time-sensitive questions, apply date, domain, or location filters only when the exposed tool schema supports them. Otherwise include the constraint clearly in the objective.
4. Inspect result titles, URLs, dates, and excerpts. If an excerpt is thin, noisy, or central to the answer, call `web_fetch` for that URL before using it as evidence.
5. Prefer primary sources, official docs, filings, papers, or directly involved parties when available.

## Parsing Results

For each useful result, extract:

- title
- URL
- publish date or accessed/currentness signal when present
- the substantive excerpt or fetched content needed for the answer

Skip boilerplate text such as menus, footers, cookie notices, and "Skip to content" fragments.

## Response format

**CRITICAL: Every claim must have an inline citation.** Use markdown links like [Title](URL) pulling only from the MCP output. Never invent or guess URLs.

Synthesize a response that:

- Leads with the key answer/finding
- Includes specific facts, names, numbers, dates
- Cites every fact inline as [Source Title](url) — do not leave any claim uncited
- Organizes by theme if multiple topics

**End with a Sources section** listing every URL referenced:

```text
Sources:
- [Source Title](https://example.com/article) (Feb 2026)
- [Another Source](https://example.com/other) (Jan 2026)
```

This Sources section is mandatory. Do not omit it.
