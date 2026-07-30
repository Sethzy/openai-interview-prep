---
name: paper-design
description: Use Paper.design, Paper Desktop, or the Paper MCP server for agentic UI design work. Applies when the user asks to use paper.dev, paper.design, Paper MCP, or Paper files to create, inspect, modify, export, or translate UI designs, design systems, selected frames, artboards, screenshots, or web-native HTML/CSS layouts.
---

# Paper Design

Use Paper as a web-native design canvas: designs are made from real HTML/CSS-like structure, and the Paper MCP can read and write the currently open Paper file. Keep this skill thin; use it to choose the right Paper workflow, then do normal product/UI design work with the available tools.

Sources: Paper MCP docs at `https://paper.design/docs/mcp`, downloads at `https://paper.design/downloads`, Snapshot guide at `https://paper.design/snapshot-extension`.

## Setup Check

Before depending on Paper context, confirm the user has Paper Desktop installed and a Paper file open. Paper Desktop starts the local MCP server when a file is open.

For Codex, the documented connection options are:

```bash
codex plugin marketplace add paper-design/agent-plugins
```

Then open `/plugins`, select the `paper-design/agent-plugins` marketplace, and install `paper-desktop`.

Manual Codex setup: add an MCP server named `paper`, choose Streamable HTTP, and use `http://127.0.0.1:29979/mcp`.

If Paper tools are not available in the current session, say what is missing and ask the user to open Paper Desktop and connect the MCP. If tool discovery is available, search for Paper/Paper MCP tools before giving up.

## Working Loop

1. Inspect the current Paper context first: file/page info, selected nodes, artboards, screenshots, tree summaries, JSX, and computed styles when those tools are available.
2. Treat the current Paper selection as the user's intended scope. If nothing is selected and the task is ambiguous, ask the user to select the frame, artboard, or component in Paper.
3. Work in small chunks: one component, section, artboard, or responsive breakpoint at a time. Larger files and broad pages are easier to distort.
4. Preserve web-native structure. Prefer meaningful layer names, frames/artboards, flex/grid-like layout, reusable styles, real CSS values, and editable text. Avoid screenshot-like flattened layers unless exporting assets is the task.
5. When writing into Paper, use HTML/CSS-oriented operations where possible, then refine text, names, positions, and styles with targeted edits.
6. When turning Paper designs into code, pull JSX, screenshots, styles, and dimensions from the relevant nodes; implement in the project's existing stack; verify with screenshots against Paper. Use separate Paper frames as breakpoint references when present.
7. When pulling outside content into Paper, use real project content from approved sources. Remember that Paper MCP can write to the file, so make edits deliberately and keep the user informed for broad changes.

## Useful Paper Workflows

- Create or refine UI mockups in Paper from a product brief, using artboards for screen states and breakpoints.
- Read selected Paper frames and implement them in the local app.
- Sync design tokens, real content, or structured data into a Paper file.
- Export selected nodes as PNG, JPG, SVG, MP4, or other supported formats when the Paper export tool is present.
- Use Paper Snapshot to bring existing web UI into Paper as editable layers: enable the extension with the icon or `Shift` + `Cmd` + `P`, target an element, refine with arrow keys, snapshot with Enter or click, then paste into Paper.

## Troubleshooting

If the MCP shows connected but tools are unavailable, restart the agent session or the MCP host and reopen the Paper file. If `127.0.0.1:29979` is unreachable, verify Paper Desktop is running with a file open before debugging the host configuration.
