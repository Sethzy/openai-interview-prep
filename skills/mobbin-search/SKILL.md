---
name: mobbin-search
description: Use Mobbin and the Mobbin MCP server for UI design research with real app screenshots. Applies when the user asks for UI/UX inspiration, pattern research, app references, screen or flow comparisons, examples from real products, Mobbin research, or when the `search_screens` MCP tool would help ground a design answer.
---

# Mobbin Search

Use Mobbin to ground design work in real product screenshots instead of generic UI advice. This is a thin local wrapper around Mobbin's official `mobbin/skills` repo and its `search_screens` MCP workflow.

Source: `https://github.com/mobbin/skills`

## Setup Check

Mobbin requires the Mobbin MCP server:

```json
{
  "mcpServers": {
    "mobbin": {
      "url": "https://api.mobbin.com/mcp"
    }
  }
}
```

If `search_screens` is not available, tell the user the Mobbin MCP is missing. Do not invent screenshots or cite Mobbin examples you cannot inspect.

## Working Loop

1. Translate the user's design question into a broad Mobbin query. Avoid adding unasked-for details that would bias the results.
2. Pick platform from context: use `web` for websites/web apps and `ios` for mobile app flows. If the platform is unclear and important, ask; otherwise state the assumption.
3. Search a small set first, usually 5 screens. Use more only when the user asks for variety, comparison, or a board.
4. Visually inspect every returned screenshot before answering. Ground observations in visible details: layout, hierarchy, fields, copy, navigation, density, colors, affordances, and state handling.
5. Link each referenced screen back to its Mobbin URL. Keep takeaways actionable for the UI being designed.

## Response Modes

- Give a direct answer when 1-3 screenshots are enough. Lead with the most relevant examples and concrete implementation notes.
- Offer to make an evidence board when the task benefits from side-by-side comparison, pattern grouping, or many screenshots. Build the board only after the user wants it.
- For boards, create a self-contained static HTML file under `./.mobbin/`, use Mobbin image URLs directly, include app names and Mobbin links, and keep the page visually quiet so the screenshots carry the analysis.

## Good Uses

- "How do fintech apps handle onboarding?"
- "Find real examples of pricing pages before we design ours."
- "Compare mobile empty states for task apps."
- "Use Mobbin for references for this dashboard."
