# OpenAI Interview Prep Vault

Private, local-first interview-preparation workspace built with Obsidian, Git, and agent skills. The repository contains the notes, sources, operating instructions, scripts, Obsidian configuration, and active-recall tool needed to reproduce the same workspace on another computer.

> [!IMPORTANT]
> This is a **private personal repository**. It contains interview material, recruiter-derived notes, career evidence, and other sensitive context. Keep the GitHub repository private. Before cloning it to an employer-managed computer, make sure that storing personal interview material there is permitted and understand that the employer may be able to inspect the device.

## Fast path: set up another computer

### 1. Install the essentials

Required:

- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/) authenticated to the GitHub account that can access this private repository
- [Obsidian](https://obsidian.md/)
- At least one supported agent: Codex, Claude Code, Gemini CLI, Cursor, Windsurf, or OpenCode
- `bash` and `curl` (already available on macOS and most Linux systems)

Useful for the optional tooling:

- Python 3.11 or newer for the test suite and retrieval scripts
- Node.js 20.19+ or 22.12+ for the Recall Room practice app
- `make` for the one-command test suite
- [Ollama](https://ollama.com/) plus `nomic-embed-text` for local semantic reranking

### 2. Clone the private repository

```bash
gh auth login
gh repo clone Sethzy/openai-interview-prep
cd openai-interview-prep
```

If GitHub CLI is already authenticated, the first command is unnecessary. A normal Git clone also works:

```bash
git clone https://github.com/Sethzy/openai-interview-prep.git
cd openai-interview-prep
```

### 3. Rebuild machine-local pieces

Run both setup scripts from the repository root:

```bash
bash bin/setup-vault.sh
bash bin/setup-multi-agent.sh
```

They are idempotent, so rerunning them is safe.

`setup-vault.sh`:

- creates any missing vault directories;
- preserves the tracked Obsidian configuration and seeds defaults only when a configuration file is missing;
- downloads Excalidraw's large `main.js`, which is intentionally not stored in Git;
- leaves the existing knowledge base untouched.

`setup-multi-agent.sh`:

- links this repository's `skills/` directory into the standard skill location for Codex, OpenCode, and Gemini;
- creates workspace-local links for Cursor and Windsurf;
- skips an existing path instead of overwriting it.

The links are deliberately not portable Git artifacts. Each computer recreates them with paths that are correct for that computer.

### 4. Open the vault

In Obsidian:

1. Choose **Manage vaults**.
2. Choose **Open folder as vault**.
3. Select the cloned `openai-interview-prep` folder.
4. Trust and enable the included community plugins when prompted.

The repository includes configuration for Calendar, Dataview, Banners, Excalidraw, Obsidian Git, Templater, and Thino. Excalidraw's large runtime file is restored by `setup-vault.sh`.

### 5. Verify the clone

```bash
git status -sb
python3 scripts/wiki-mode.py get
bash scripts/detect-transport.sh --peek
make test
```

Expected results:

- Git reports `main` tracking `origin/main`.
- The default filing mode is `generic` unless this computer has a local mode override.
- Transport detection prints valid JSON.
- The hermetic test suite passes without API keys or network access.

`make test` is recommended but not required for normal note-taking.

## What this repository actually is

This is not just an Obsidian folder. It has three cooperating layers:

```text
Layer 1 — evidence       .raw/ and committed source material
            ↓ ingest and summarize
Layer 2 — knowledge      wiki/ pages, links, indexes, logs, and hot cache
            ↓ route and retrieve
Layer 3 — agent runtime  AGENTS.md / CLAUDE.md + skills/ + scripts/ + hooks/
```

The human curates sources, reviews conclusions, and practices answers. The agent maintains the knowledge structure around that work.

## Repository map

| Path | Purpose | Portability |
|---|---|---|
| `AGENTS.md` | Codex operating contract, source priority, truth boundaries, and interview rubric | Committed |
| `CLAUDE.md` | Vault overview and Claude-oriented operating instructions | Committed |
| `GEMINI.md` | Gemini bootstrap instructions | Committed |
| `.raw/` | Immutable source material and ingest manifest | Committed unless specifically ignored |
| `wiki/` | Agent-maintained knowledge base | Committed |
| `wiki/hot.md` | Small recent-context cache read at session start | Committed |
| `wiki/index.md` | Master catalog of wiki pages | Committed |
| `wiki/log.md` | Append-oriented operation history | Committed |
| `wiki/domains/` | Synthesized interview and product-prep material | Committed |
| `wiki/sources/` | Source summaries and provenance notes | Committed |
| `skills/` | Local Agent Skills, each defined by a `SKILL.md` | Committed |
| `commands/` | Claude slash-command entry points | Committed |
| `agents/` | Specialized worker/verifier definitions | Committed |
| `scripts/` | Retrieval, locking, addressing, transport, and mode utilities | Committed |
| `bin/` | Human-facing setup scripts | Committed |
| `hooks/` | Agent hook configuration and Git/lock coordination | Committed |
| `.obsidian/` | Obsidian settings and included plugins | Mostly committed |
| `.vault-meta/` | Runtime state for locks, retrieval, addressing, and modes | Mixed; regenerable state is ignored |
| `_templates/` | Obsidian/wiki note templates | Committed |
| `tools/interview-grinder/` | Recall Room browser app generated from the answer bank | Source, lockfile, and production build committed; `node_modules` ignored |
| `.github/workflows/test.yml` | GitHub Actions checks for scripts, skills, agents, and manifests | Committed |

## How a session starts

The repository's agent bootstrap files instruct the agent to load context progressively:

1. Read the repository rules (`AGENTS.md`, plus the agent-specific bootstrap file).
2. Read the `wiki` skill's complete instructions.
3. Read `wiki/hot.md` for the latest active context.
4. For OpenAI interview work, prefer the canonical recruiter-screen material and the source hierarchy in `AGENTS.md`.
5. Read `wiki/index.md`, a domain index, and individual pages only as needed.

This ordering keeps startup fast while preserving the evidence chain. The hot cache is a cache, not the source of truth.

## How knowledge moves through the vault

### Ingest

When a source is ingested, the intended transaction is:

```text
source file or URL
  → immutable source in .raw/
  → source summary in wiki/sources/
  → relevant entity, concept, and domain pages
  → sub-indexes and wiki/index.md
  → new entry at the top of wiki/log.md
  → refreshed wiki/hot.md
```

Generated pages use YAML frontmatter and Obsidian `[[wikilinks]]`. Claims should retain provenance and confidence boundaries. Raw source files are not rewritten after ingestion.

Typical prompts:

```text
ingest [filename]
ingest this URL
what do you know about [topic]?
query deep: [question]
lint the wiki
update hot cache
```

### Query

The default query path is progressive:

```text
hot cache → master index → domain index → relevant pages → answer with citations
```

If optional hybrid retrieval is provisioned, queries can use contextual chunks, BM25 search, and semantic reranking before the agent reads the selected pages.

### Save and maintenance

The local skills route common operations:

| Intent | Skill |
|---|---|
| Set up or inspect the knowledge base | `wiki` |
| Add sources | `wiki-ingest` |
| Answer from the vault | `wiki-query` / `wiki-retrieve` |
| Preserve a conversation or insight | `save` |
| Find dead links, orphans, and stale claims | `wiki-lint` |
| Roll up older log entries | `wiki-fold` |
| Run iterative web research | `autoresearch` |
| Maintain Obsidian canvases or Bases | `canvas` / `obsidian-bases` |

The exact instructions live in each `skills/<name>/SKILL.md`; those files are the executable operating manual, not merely documentation.

## Mutation safety: transport, locks, and hooks

Three pieces protect agent-authored changes:

1. `scripts/detect-transport.sh` chooses the best available write path. The fallback chain is Obsidian CLI, Obsidian MCP, vault MCP, then direct filesystem writes.
2. `scripts/wiki-lock.sh` provides per-file advisory locks so multiple local workers do not write the same page simultaneously. Stale locks expire after 60 seconds by default.
3. The post-tool hook defers automatic Git staging while a wiki lock is held.

These locks coordinate processes on **one computer**. They do not coordinate two computers. Avoid editing the same note on both machines before syncing.

Regenerable transport files, locks, chunks, indexes, embedding caches, and local mode selection live under `.vault-meta/` and are mostly ignored by Git.

## Filing modes

New material can follow one of four organizational modes:

| Mode | Filing behavior |
|---|---|
| `generic` | Current default: `wiki/sources`, `wiki/entities`, `wiki/concepts`, and domain pages |
| `lyt` | Maps of content plus atomic notes |
| `para` | Projects, Areas, Resources, and Archives |
| `zettelkasten` | Flat timestamp-addressed notes with dense links |

Inspect or change the mode on a specific computer:

```bash
bash bin/setup-mode.sh --check
bash bin/setup-mode.sh
```

Mode selection is machine-local by default (`.vault-meta/mode.json` is ignored). Changing modes affects future filing and does not migrate existing notes.

## Optional hybrid retrieval

The base vault works without embeddings, an API key, or Ollama. To build the optional retrieval index:

```bash
# Safe local/synthetic contextual prefixes plus BM25
bash bin/setup-retrieve.sh --no-llm

# Interactive setup; asks before any page body can leave the machine
bash bin/setup-retrieve.sh
```

The pipeline is:

```text
wiki pages
  → contextual chunks
  → BM25 index
  → optional cosine rerank through local Ollama
  → top matching pages/chunks
```

If `ANTHROPIC_API_KEY` or the Claude CLI is available, the setup script still requires explicit consent before using it to contextualize page bodies. Without consent, it stays synthetic/local. Retrieval caches are rebuildable and not committed.

Useful commands:

```bash
bash bin/setup-retrieve.sh --check
python3 scripts/retrieve.py "your question" --top 5
```

## Optional DragonScale layer

DragonScale adds deterministic page addressing, semantic tiling checks, and log-fold support. It is not required for everyday use.

```bash
bash bin/setup-dragonscale.sh
```

See `docs/dragonscale-guide.md` before enabling it.

## Recall Room: active-recall practice app

`tools/interview-grinder/` is a local browser app that turns the broad historical answer bank into a spaced-repetition deck.

```bash
cd tools/interview-grinder
npm install
npm run dev
```

The `dev` command regenerates `public/cards.json` from:

```text
wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md
```

That bank is a deprecated breadth/reference source, not the live canonical final-round surface. Recall Room is useful for broad retrieval practice, but it does not include every current role-play answer, including the final VNG/Zalo–DBS–GCash portfolio and the latest TruTrip material. Use the final role-play pack and live cheat sheet for canonical rehearsal.

Progress and custom cues remain in that browser's local storage, so review history does not automatically follow the Git repository to another computer. Run `npm run build` after broad-bank changes when the committed production build also needs refreshing.

## Companion repositories

This vault is self-contained for its committed interview-prep content. `AGENTS.md` can also consult two optional sibling repositories for deeper evidence:

```text
parent folder/
├── openai-interview-prep/   ← this repository
├── career-ops/              ← optional career and application evidence
└── Seth Second Brain/       ← optional enterprise GTM context
```

If those folders are absent, the agent should continue with the evidence committed here and state the limitation when it matters. Do not copy employer-confidential material into this repository.

## Git and multi-computer workflow

The GitHub remote is the synchronization layer between computers. Obsidian Sync is not required for this vault.

### Before working

```bash
git status -sb
git pull --rebase
```

### After a meaningful session

Confirm that the knowledge transaction is internally consistent: the changed pages, relevant index, log, and hot cache should agree. Then:

```bash
git status
git add <intended-files>
git commit -m "Describe the prep update"
git push
```

On the other computer, pull before opening or editing the same notes.

### What commonly causes conflicts

- Editing the same wiki page on both computers before pulling.
- Obsidian changing `.obsidian/workspace.json` on both computers.
- Regenerating the Recall Room card files from different answer-bank versions.

The workspace file is intentionally tracked so the useful Obsidian layout can be reproduced. Treat workspace-only diffs as UI state: commit them only when the layout change is worth sharing.

### Remotes

- `origin` should point to the private `Sethzy/openai-interview-prep` repository.
- This project began from `AgriciDaniel/claude-obsidian`; an `upstream` remote is optional and is not recreated by `git clone`.
- Do not push personal interview material to the public upstream repository.

To add upstream for read-only comparison:

```bash
git remote add upstream https://github.com/AgriciDaniel/claude-obsidian.git
git remote set-url --push upstream DISABLED
```

## What Git intentionally does not synchronize

The `.gitignore` protects machine-local, generated, heavy, or sensitive files. Important examples:

- `.env`, `.env.local`, private keys, credentials, and auth files;
- `node_modules/` and Python bytecode;
- local agent symlinks for Cursor and Windsurf;
- Obsidian plugin data files and trash;
- retrieval chunks, BM25 indexes, embedding caches, transport state, and lock files;
- video files and several classes of scratch or transcript files;
- new files under `_attachments/` by default.

Files already committed remain tracked even if a later ignore pattern matches them. Check `git status --ignored` when something expected does not appear in Git.

New attachments are ignored to prevent the repository from ballooning. If an attachment is essential and safe to sync, add it deliberately with `git add -f <path>` and review its contents first.

## Privacy and evidence boundaries

- Keep the GitHub repository private.
- Never commit API keys, session tokens, customer-confidential data, or employer-confidential data.
- Do not send outreach, request referrals, submit applications, or claim that any of those actions occurred without explicit review.
- Treat recruiter-derived process details as time-bound and subject to change.
- Preserve the source priority and truth boundaries in `AGENTS.md`.
- Optional retrieval may send text to an external model only after explicit consent; `--no-llm` keeps contextual prefix generation local/synthetic.
- A private repository protects public visibility, but it does not protect files from administrators of a managed work computer.

## Validation and CI

Local validation:

```bash
make test
```

The suite covers deterministic addressing, semantic tiling, boundary scoring, BM25 indexing, retrieval, file locks, concurrent writes, methodology modes, and contextual-prefix cache behavior.

GitHub Actions also validates:

- the hermetic test suite on Python 3.11;
- skill YAML frontmatter;
- agent tool declarations;
- plugin and hook JSON manifests;
- transport detection and wiki-mode command surfaces.

The Recall Room has its own build check:

```bash
cd tools/interview-grinder
npm install
npm run build
```

## Troubleshooting

### The private clone returns 404

Authenticate GitHub CLI with an account that has access:

```bash
gh auth login
gh auth status
```

### An agent cannot see the local skills

Rerun:

```bash
bash bin/setup-multi-agent.sh
```

If it reports that a destination already exists and points elsewhere, inspect and remove or rename that destination manually, then rerun the script. The setup script deliberately does not overwrite it.

### Excalidraw does not load

Rerun:

```bash
bash bin/setup-vault.sh
```

This restores the ignored Excalidraw runtime file.

### Retrieval works but has no semantic reranking

BM25 still works. For local semantic reranking:

```bash
ollama pull nomic-embed-text
bash bin/setup-retrieve.sh --rebuild --no-llm
```

### Obsidian shows setup files in search or graph view

Rerun `bash bin/setup-vault.sh`, then restart Obsidian. The script restores the intended ignore filters and graph configuration.

### A companion repository path is missing

Clone the optional repository beside this one, or continue with the committed vault. Companion repositories are enrichment sources, not boot requirements.

## Provenance

The vault machinery was scaffolded from [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian) and adapted into a private OpenAI interview-preparation system. See `ATTRIBUTION.md`, `LICENSE`, and the guides under `docs/` for upstream provenance and deeper implementation detail.
