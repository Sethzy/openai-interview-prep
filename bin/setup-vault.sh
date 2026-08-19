#!/usr/bin/env bash
# claude-obsidian vault setup script
# Run this ONCE before opening Obsidian for the first time.
# Usage: bash bin/setup-vault.sh [optional: /path/to/vault]
# Default: uses the directory where this script lives (the vault root)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT="${1:-$(dirname "$SCRIPT_DIR")}"
OBSIDIAN="$VAULT/.obsidian"

echo "Setting up claude-obsidian vault at: $VAULT"

# ── 1. Create directories ─────────────────────────────────────────────────────
mkdir -p "$OBSIDIAN/snippets"
mkdir -p "$VAULT/.raw"
mkdir -p "$VAULT/wiki/concepts" "$VAULT/wiki/entities" "$VAULT/wiki/sources" "$VAULT/wiki/meta"
mkdir -p "$VAULT/_templates"

# ── 2. Seed graph.json only when missing ──────────────────────────────────────
# A cloned vault already carries its canonical config. Do not overwrite it:
# Obsidian may add version-specific fields, and a rewrite would dirty the clone.
if [ ! -f "$OBSIDIAN/graph.json" ]; then
  GRAPH_TMP=$(mktemp "$OBSIDIAN/.graph.json.tmp.XXXXXX")
cat > "$GRAPH_TMP" << 'EOF'
{
  "collapse-filter": false,
  "search": "path:wiki",
  "showTags": false,
  "showAttachments": false,
  "hideUnresolved": true,
  "showOrphans": false,
  "collapse-color-groups": false,
  "colorGroups": [
    { "query": "path:wiki/entities",    "color": { "a": 1, "rgb": 12945088 } },
    { "query": "path:wiki/concepts",    "color": { "a": 1, "rgb": 5227007  } },
    { "query": "path:wiki/sources",     "color": { "a": 1, "rgb": 6986069  } },
    { "query": "path:wiki/meta",        "color": { "a": 1, "rgb": 5676246  } },
    { "query": "path:wiki",             "color": { "a": 1, "rgb": 5676246  } }
  ],
  "showArrow": true,
  "textFadeMultiplier": -1,
  "nodeSizeMultiplier": 1.8,
  "lineSizeMultiplier": 1.2,
  "centerStrength": 0.5,
  "repelStrength": 30,
  "linkStrength": 1.5,
  "linkDistance": 120,
  "scale": 1.0
}
EOF
  mv -f "$GRAPH_TMP" "$OBSIDIAN/graph.json"
fi

# ── 3. Seed app.json only when missing ────────────────────────────────────────
if [ ! -f "$OBSIDIAN/app.json" ]; then
  APP_TMP=$(mktemp "$OBSIDIAN/.app.json.tmp.XXXXXX")
cat > "$APP_TMP" << 'EOF'
{
  "userIgnoreFilters": [
    "agents/",
    "commands/",
    "hooks/",
    "skills/",
    "_templates/",
    "README.md",
    "CLAUDE.md",
    "WIKI.md",
    "Welcome.md"
  ]
}
EOF
  mv -f "$APP_TMP" "$OBSIDIAN/app.json"
fi

# ── 4. Seed appearance.json only when missing ─────────────────────────────────
if [ ! -f "$OBSIDIAN/appearance.json" ]; then
  APPEARANCE_TMP=$(mktemp "$OBSIDIAN/.appearance.json.tmp.XXXXXX")
cat > "$APPEARANCE_TMP" << 'EOF'
{
  "enabledCssSnippets": [
    "vault-colors",
    "ITS-Dataview-Cards",
    "ITS-Image-Adjustments"
  ]
}
EOF
  mv -f "$APPEARANCE_TMP" "$OBSIDIAN/appearance.json"
fi

# ── 5. Download Excalidraw main.js (8MB, not in git) ─────────────────────────
EXCALIDRAW="$OBSIDIAN/plugins/obsidian-excalidraw-plugin"
if [ -f "$EXCALIDRAW/manifest.json" ] && [ ! -f "$EXCALIDRAW/main.js" ]; then
  echo "Downloading Excalidraw main.js (~8MB)..."
  EXCALIDRAW_TMP=$(mktemp "$EXCALIDRAW/.main.js.tmp.XXXXXX")
  if ! curl --fail --silent --show-error --location \
      "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/latest/download/main.js" \
      --output "$EXCALIDRAW_TMP"; then
    rm -f "$EXCALIDRAW_TMP"
    echo "ERROR: Excalidraw download failed; no runtime file was installed." >&2
    exit 1
  fi
  EXCALIDRAW_BYTES=$(wc -c < "$EXCALIDRAW_TMP" | tr -d '[:space:]')
  if [ "$EXCALIDRAW_BYTES" -lt 1000000 ]; then
    rm -f "$EXCALIDRAW_TMP"
    echo "ERROR: Excalidraw download was unexpectedly small; refusing to install it." >&2
    exit 1
  fi
  mv -f "$EXCALIDRAW_TMP" "$EXCALIDRAW/main.js"
  echo "✓ Excalidraw main.js downloaded"
elif [ -f "$EXCALIDRAW/main.js" ]; then
  echo "✓ Excalidraw main.js already present"
fi

echo ""
echo "✓ Setup complete."
echo ""
echo "Next steps:"
echo "  1. Open Obsidian"
echo "  2. Manage Vaults → Open folder as vault → select: $VAULT"
echo "  3. Enable community plugins when prompted (Calendar, Thino, Excalidraw, Banners are pre-installed)"
echo "  4. Install: Dataview, Templater, Obsidian Git  (Settings → Community Plugins)"
echo "  5. Type /wiki in Claude Code to scaffold your knowledge base"
echo ""
echo "Pre-installed plugins:"
echo "  - Calendar (sidebar calendar with word count + task dots)"
echo "  - Thino (quick memo capture)"
echo "  - Excalidraw (freehand drawing + image annotation)"
echo "  - Banners (add banner: to any note frontmatter for header images)"
echo ""
echo "CSS snippets enabled:"
echo "  - vault-colors: color-codes wiki/ folders in file explorer"
echo "  - ITS-Dataview-Cards: use \`\`\`dataviewjs with .cards for card grids"
echo "  - ITS-Image-Adjustments: append |100 to image embeds for sizing"
echo ""
echo "Views available:"
echo "  - Wiki Map canvas (wiki/Wiki Map.canvas) — knowledge graph"
echo "  - Design Ideas canvas (projects/visual-vault/design-ideas.canvas) — visual reference board"
echo "  - Graph view filtered to wiki/ only, color-coded by type"
echo ""
echo "To switch to the visual layout (Canvas + Calendar + Thino sidebar):"
echo "  Quit Obsidian, then run:"
echo "    cp $OBSIDIAN/workspace-visual.json $OBSIDIAN/workspace.json"
echo "  Then reopen Obsidian."
echo ""
echo "Graph colors: if they reset after closing Obsidian, open Graph settings"
echo "→ Color groups and re-add them once. They persist permanently after that."
