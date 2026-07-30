---
name: html-anything
description: Use the nexu-io/html-anything local app, CLI, and template catalog to turn Markdown, notes, CSV, JSON, or raw content into polished single-file HTML deliverables such as articles, decks, reports, posters, cards, docs, and prototypes.
---

# HTML Anything

This skill wraps the `nexu-io/html-anything` repo as a local reference and runnable tool. The upstream repo is preserved as `vendor/html-anything-main-8fd5227.tar.gz` so its internal template `SKILL.md` files do not get discovered as top-level Codex skills.

## Reference Files

Read only what the task needs:

- For the project shape, supported surfaces, and app workflow, read `references/README.md`.
- For command-line conversion, read `references/cli-README.md`.
- For available internal templates, read `references/template-index.txt`.
- For a specific surface template, unpack the archive to a temp directory and read `html-anything/next/src/lib/templates/skills/<template-id>/SKILL.md`.
- If the chosen template includes `example.md` or `example.html`, inspect it before generating or converting content.

## Choose The Path

Use the local app when the user wants an editor, preview, export controls, or template browsing:

```bash
tmpdir=$(mktemp -d)
tar -xzf vendor/html-anything-main-8fd5227.tar.gz -C "$tmpdir"
cd "$tmpdir/html-anything"
pnpm install
pnpm -F @html-anything/next dev
```

Use the CLI when the user wants a file converted directly:

```bash
tmpdir=$(mktemp -d)
tar -xzf vendor/html-anything-main-8fd5227.tar.gz -C "$tmpdir"
cd "$tmpdir/html-anything"
pnpm install
pnpm -F @html-anything/cli build
node cli/dist/run.js auto input.md -o output.html
```

Use the template catalog directly when the user asks for a specific HTML surface and does not need the app running. Pick the closest template, read that template's `SKILL.md`, then create a single self-contained HTML file following its constraints.

## Operating Rules

- Do not import all 75+ internal templates as separate top-level Codex skills unless the user explicitly asks for that catalogue expansion.
- Keep generated deliverables self-contained unless the selected template says otherwise.
- Preserve factual discipline: numbers, claims, and data visualizations must come from the user's source material or verified sources.
- For decks, posters, frames, and visual artifacts, verify the HTML visually before handoff when a browser is available.
- If using the app or CLI, remember that `html-anything` delegates generation to locally installed coding-agent CLIs; it does not require a separate API key.
