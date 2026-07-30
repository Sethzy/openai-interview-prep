---
name: x-kb-capture
description: Capture pasted X/Twitter post links into a personal markdown knowledge base with YAML frontmatter, source metadata, excerpts, and quick study guides. Use when the user pastes X links and asks to save, log, archive, curate, build a Twitter/X knowledge base, or wants headless/non-repo capture of posts for later search.
publisher: "Personal Skills"
source: "[[registry/skills.yaml]]"
---

# X KB Capture

Use this skill to save exact X/Twitter post URLs as local markdown notes. Do not route these requests through `last30days`; this is an exact-link capture workflow, not social research/ranking.

## Storage

Default output directory:

```bash
~/Documents/Knowledge/x-posts
```

Override with `--kb-dir` or `X_KB_DIR`.

## Capture

Run the bundled script with pasted links:

```bash
python3 "$HOME/.codex/skills/x-kb-capture/scripts/x_kb_capture.py" \
  "https://x.com/user/status/123"
```

Or pass a text blob on stdin:

```bash
pbpaste | python3 "$HOME/.codex/skills/x-kb-capture/scripts/x_kb_capture.py"
```

The script defaults to headless X oEmbed capture. This works without Chrome and is suitable for automation, but X Articles may only expose metadata and the `t.co` wrapper link through oEmbed.

For a one-off interactive capture from a logged-in browser, pass `--mode chrome-visible`. This may require macOS Accessibility permission and is not suitable for unattended automations.

## Output Shape

Each note contains:

- YAML frontmatter: `type`, `source`, `url`, `author`, `handle`, `status_id`, `title`, `captured_at`, `status`, `tags`
- source link
- short excerpt
- quick study guide

By default, do not store full page text. If the user explicitly asks for local verbatim capture, pass `--include-verbatim`.

## Headless/Automation Guidance

For automation, prefer a queue file that contains one X URL per line, then run:

```bash
python3 "$HOME/.codex/skills/x-kb-capture/scripts/x_kb_capture.py" \
  --kb-dir "$HOME/Documents/Knowledge/x-posts" \
  < "$HOME/Documents/Knowledge/x-capture-queue.txt"
```

The default `oembed` mode is headless. For full verbatim long-form X Article capture, replace the fetch layer with an official API or authenticated X GraphQL endpoint and keep the markdown writer unchanged.

## Verification

After capture, list the latest notes:

```bash
ls -lt "$HOME/Documents/Knowledge/x-posts" | head
```
