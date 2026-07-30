import { createEmptyCard, fsrs, Rating } from "ts-fsrs";
import "./styles.css";

const STORAGE_KEY = "openai-interview-grinder-v1";
const scheduler = fsrs();

const state = {
  payload: null,
  records: {},
  customCues: {},
  session: [],
  index: 0,
  revealed: false,
  startedAt: Date.now(),
  elapsed: 0,
  timer: null,
  timerRunning: false,
  mode: "today",
  section: "all",
  priority: "all",
  query: "",
  focusMode: false,
  completed: 0,
  sessionLength: 20,
  sessionRetries: {},
  view: "practice",
};

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    state.records = saved.records ?? {};
    state.customCues = saved.customCues ?? {};
  } catch {
    state.records = {};
    state.customCues = {};
  }
}

function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ records: state.records, customCues: state.customCues }),
  );
}

function hydrateFsrsCard(value) {
  if (!value) return createEmptyCard();
  return {
    ...value,
    due: new Date(value.due),
    last_review: value.last_review ? new Date(value.last_review) : undefined,
  };
}

function currentCard() {
  return state.session[state.index] ?? null;
}

function recordFor(id) {
  return state.records[id] ?? null;
}

function isDue(card) {
  const record = recordFor(card.id);
  return Boolean(record) && new Date(record.card.due).getTime() <= Date.now();
}

function isWeak(card) {
  const record = recordFor(card.id);
  if (!record) return false;
  const recent = record.history?.slice(-3) ?? [];
  return recent.some((entry) => entry.rating <= Rating.Hard) || record.card.lapses > 0;
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function filteredCards() {
  if (!state.payload) return [];
  const query = state.query.trim().toLowerCase();
  return state.payload.cards.filter((card) => {
    const sectionMatch = state.section === "all" || card.section === state.section;
    const priorityMatch = state.priority === "all" || card.priority === Number(state.priority);
    const queryMatch =
      !query ||
      `${card.prompt} ${card.title} ${card.category} ${card.section}`.toLowerCase().includes(query);
    return sectionMatch && priorityMatch && queryMatch;
  });
}

function prioritySort(items) {
  return [...items].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (isDue(a) !== isDue(b)) return isDue(a) ? -1 : 1;
    return a.sourceLine - b.sourceLine;
  });
}

function buildSession() {
  const pool = filteredCards();
  let selected;
  if (state.mode === "new") selected = pool.filter((card) => !recordFor(card.id));
  else if (state.mode === "weak") selected = pool.filter(isWeak);
  else if (state.mode === "random") selected = pool;
  else if (state.mode === "due") selected = pool.filter(isDue);
  else selected = pool.filter((card) => isDue(card) || !recordFor(card.id));

  state.session = (state.mode === "random" ? shuffled(selected) : prioritySort(selected)).slice(0, state.sessionLength);
  state.index = 0;
  state.completed = 0;
  state.sessionRetries = {};
  resetCardState();
}

function resetCardState() {
  state.revealed = false;
  state.startedAt = null;
  state.elapsed = 0;
  state.timerRunning = false;
  clearInterval(state.timer);
}

function toggleTimer() {
  if (state.revealed) return;
  if (state.timerRunning) {
    state.elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
    state.timerRunning = false;
    clearInterval(state.timer);
    renderStage();
    return;
  }
  state.timerRunning = true;
  state.startedAt = Date.now() - state.elapsed * 1000;
  state.timer = setInterval(() => {
    state.elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
    updateTimer();
  }, 250);
  renderStage();
}

function formatClock(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function formatRelative(dateInput) {
  const milliseconds = new Date(dateInput).getTime() - Date.now();
  const absolute = Math.abs(milliseconds);
  if (absolute < 60_000) return "now";
  if (absolute < 3_600_000) return `${Math.max(1, Math.round(absolute / 60_000))}m`;
  if (absolute < 86_400_000) return `${Math.max(1, Math.round(absolute / 3_600_000))}h`;
  return `${Math.max(1, Math.round(absolute / 86_400_000))}d`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let listType = null;
  let inQuote = false;

  const closeBlocks = () => {
    if (listType) output.push(`</${listType}>`);
    if (inQuote) output.push("</blockquote>");
    listType = null;
    inQuote = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeBlocks();
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      closeBlocks();
      const [, hashes, text] = line.match(/^(#{1,6})\s+(.+)$/);
      const level = Math.min(4, hashes.length + 1);
      output.push(`<h${level}>${inlineMarkdown(text)}</h${level}>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      if (listType) {
        output.push(`</${listType}>`);
        listType = null;
      }
      if (!inQuote) {
        output.push("<blockquote>");
        inQuote = true;
      }
      output.push(`<p>${inlineMarkdown(line.replace(/^>\s?/, ""))}</p>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (inQuote) {
        output.push("</blockquote>");
        inQuote = false;
      }
      if (listType !== "ul") {
        if (listType) output.push(`</${listType}>`);
        output.push("<ul>");
        listType = "ul";
      }
      output.push(`<li>${inlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (/^\d+[.)]\s+/.test(line)) {
      if (inQuote) {
        output.push("</blockquote>");
        inQuote = false;
      }
      if (listType !== "ol") {
        if (listType) output.push(`</${listType}>`);
        output.push("<ol>");
        listType = "ol";
      }
      output.push(`<li>${inlineMarkdown(line.replace(/^\d+[.)]\s+/, ""))}</li>`);
      continue;
    }
    closeBlocks();
    if (line.startsWith("|")) {
      output.push(`<p class="table-row">${inlineMarkdown(line.replaceAll("|", " · "))}</p>`);
    } else {
      output.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }
  closeBlocks();
  return output.join("");
}

function previewIntervals(card) {
  const fsrsCard = hydrateFsrsCard(recordFor(card.id)?.card);
  const preview = scheduler.repeat(fsrsCard, new Date());
  return {
    again: formatRelative(preview[Rating.Again].card.due),
    hard: formatRelative(preview[Rating.Hard].card.due),
    good: formatRelative(preview[Rating.Good].card.due),
    easy: formatRelative(preview[Rating.Easy].card.due),
  };
}

function stats() {
  const cards = filteredCards();
  const learned = cards.filter((card) => recordFor(card.id)?.card.reps > 0).length;
  const fresh = cards.filter((card) => !recordFor(card.id)).length;
  const due = cards.filter(isDue).length;
  const weak = cards.filter(isWeak).length;
  return { total: cards.length, learned, fresh, due, weak, today: fresh + due };
}

function renderShell() {
  const sections = [...new Set(state.payload.cards.map((card) => card.section))];
  const currentStats = stats();
  document.querySelector("#app").innerHTML = `
    <div class="app-shell ${state.focusMode ? "is-focus" : ""}">
      <aside class="sidebar">
        <div class="brand-block">
          <div class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></div>
          <div>
            <p class="eyebrow">OpenAI interview prep</p>
            <h1>Recall Room</h1>
          </div>
        </div>

        <nav class="app-tabs" aria-label="Recall Room pages">
          <button data-view="practice" class="${state.view === "practice" ? "is-active" : ""}">Practice</button>
          <button data-view="instructions" class="${state.view === "instructions" ? "is-active" : ""}">How it works</button>
        </nav>

        <section class="control-block" aria-labelledby="session-heading">
          <p class="control-title" id="session-heading">Session</p>
          <div class="mode-grid" role="group" aria-label="Practice mode">
            ${[
              ["today", "Today", currentStats.today],
              ["weak", "Weak", currentStats.weak],
              ["new", "New", currentStats.fresh],
              ["random", "Shuffle", currentStats.total],
            ]
              .map(
                ([value, label, count]) => `
                <button class="mode-button ${state.mode === value ? "is-active" : ""}" data-mode="${value}">
                  <span>${label}</span><b>${count}</b>
                </button>`,
              )
              .join("")}
          </div>
        </section>

        <section class="control-block">
          <label class="control-title" for="section-filter">Answer bank section</label>
          <select id="section-filter">
            <option value="all">All sections</option>
            ${sections.map((section) => `<option value="${escapeHtml(section)}" ${state.section === section ? "selected" : ""}>${escapeHtml(section)}</option>`).join("")}
          </select>
          <select id="priority-filter" aria-label="Priority filter">
            <option value="all" ${state.priority === "all" ? "selected" : ""}>All priorities</option>
            <option value="1" ${state.priority === "1" ? "selected" : ""}>P1 · Core</option>
            <option value="2" ${state.priority === "2" ? "selected" : ""}>P2 · Depth</option>
            <option value="3" ${state.priority === "3" ? "selected" : ""}>P3 · Full bank</option>
          </select>
          <label class="search-field">
            <span class="sr-only">Search questions</span>
            <input id="question-search" type="search" placeholder="Find a question…" value="${escapeHtml(state.query)}" />
            <kbd>/</kbd>
          </label>
        </section>

        <section class="scoreboard" aria-label="Progress summary">
          <div><strong>${currentStats.learned}</strong><span>Started</span></div>
          <div><strong>${currentStats.due}</strong><span>Due</span></div>
          <div><strong>${currentStats.weak}</strong><span>Weak</span></div>
        </section>

        <div class="sidebar-footer">
          <div class="session-size" role="group" aria-label="Session size">
            ${[[5, "Quick"], [10, "Standard"], [20, "Deep"]].map(([size, label]) => `<button data-session-size="${size}" class="${state.sessionLength === size ? "is-active" : ""}">${label}<b>${size}</b></button>`).join("")}
          </div>
          <button class="quiet-button" id="new-session">Start new ${state.sessionLength}-item session</button>
          <button class="quiet-button" id="reset-progress">Reset progress</button>
          <p><kbd>Space</kbd> reveal · <kbd>1–4</kbd> grade · <kbd>F</kbd> focus</p>
        </div>
      </aside>
      <main class="stage" id="stage"></main>
    </div>
  `;

  bindShellEvents();
  renderStage();
}

function renderStage() {
  const stage = document.querySelector("#stage");
  if (state.view === "instructions") {
    stage.innerHTML = `
      <section class="instructions-page">
        <header class="instructions-hero">
          <p class="eyebrow">How Recall Room works</p>
          <h2>Question. Speak. Check. Grade. Next.</h2>
          <p>The grade buttons are the Next button. After you reveal the answer, choose Again, Hard, Good, or Easy and the next item loads automatically.</p>
          <button class="primary-button" id="start-practising">Start practising</button>
        </header>

        <div class="instruction-grid">
          <article>
            <span>01</span><h3>Choose a session</h3>
            <p><strong>Today</strong> works through everything in priority order. Quick has 5 starting items, Standard has 10, and Deep has 20.</p>
          </article>
          <article>
            <span>02</span><h3>Give your answer</h3>
            <p>Press <strong>Start answer</strong>, then speak naturally. The timer has a target for the current item; it does not begin until you start it.</p>
          </article>
          <article>
            <span>03</span><h3>Use Codex for grading</h3>
            <p>Press <strong>Copy for Codex</strong>, paste into your Codex chat, and dictate after “My dictated answer.” Codex will tell you what you covered, what you missed, and which grade to choose.</p>
          </article>
          <article>
            <span>04</span><h3>Check the reference</h3>
            <p>Return here and press <strong>Show answer</strong> or the Space key. Compare the ideas and proof points—not the exact wording.</p>
          </article>
          <article>
            <span>05</span><h3>Grade to go next</h3>
            <p><strong>Again</strong> means the structure was missing. <strong>Hard</strong> means important points were missed. <strong>Good</strong> means complete and natural. <strong>Easy</strong> means you could handle a follow-up too.</p>
          </article>
          <article>
            <span>06</span><h3>Let repetition work</h3>
            <p>Again and Hard items return later in the session. After that, Recall Room schedules each item based on how well you remembered it.</p>
          </article>
        </div>

        <aside class="priority-explainer">
          <div><b>P1 · Core</b><span>Career narrative, motivation, core sales and product questions</span></div>
          <div><b>P2 · Depth</b><span>Deeper commercial, technical and account-strategy material</span></div>
          <div><b>P3 · Full bank</b><span>Every remaining reference, version, follow-up and long-tail item</span></div>
        </aside>

        <p class="local-note">Your progress is saved in this browser on this device.</p>
      </section>
    `;
    document.querySelector("#start-practising")?.addEventListener("click", () => {
      state.view = "practice";
      renderShell();
    });
    return;
  }
  const card = currentCard();
  if (!card) {
    const currentStats = stats();
    stage.innerHTML = `
      <section class="empty-state">
        <div class="empty-glyph">✓</div>
        <p class="eyebrow">Queue clear</p>
        <h2>${state.completed ? `You finished ${state.completed} cards.` : "Nothing matches this queue."}</h2>
        <p>${currentStats.total ? "Switch mode or start a shuffled session to keep grinding." : "Change the section or search filter to find cards."}</p>
        <button class="primary-button" id="empty-shuffle">Start a shuffled session</button>
      </section>
    `;
    document.querySelector("#empty-shuffle")?.addEventListener("click", () => {
      state.mode = "random";
      buildSession();
      renderShell();
    });
    return;
  }

  const intervals = previewIntervals(card);
  const record = recordFor(card.id);
  const cues = state.customCues[card.id] || card.anchors.join(" → ");
  const priorityLabel = { 1: "P1 · Core", 2: "P2 · Depth", 3: "P3 · Full bank" }[card.priority];
  const timerState = state.timerRunning ? "Pause" : state.elapsed ? "Resume" : "Start answer";
  stage.innerHTML = `
    <header class="stage-header">
      <div>
        <p class="eyebrow">${escapeHtml(card.section)}</p>
        <p class="category-line">${escapeHtml(card.category)}${card.parent ? ` · ${escapeHtml(card.parent)}` : ""}</p>
      </div>
      <div class="session-meter" aria-label="Session progress">
        <span>${state.index + 1} / ${state.session.length}</span>
        <div><i style="width:${((state.index + 1) / state.session.length) * 100}%"></i></div>
      </div>
      <button class="focus-button" id="focus-toggle" aria-label="Toggle focus mode">Focus <kbd>F</kbd></button>
    </header>

    <section class="recall-layout ${state.revealed ? "is-revealed" : ""}">
      <article class="question-panel">
        <div class="timer-wrap">
          <div class="timer ${state.elapsed >= card.targetSeconds ? "is-over" : state.elapsed >= card.targetSeconds * 0.8 ? "is-warn" : ""}" id="timer">${formatClock(state.elapsed)}</div>
          <div class="timer-instruction"><span>Target ${formatClock(card.targetSeconds)}</span><button id="timer-toggle">${timerState}</button></div>
        </div>
        <div class="question-meta">
          <span class="priority p${card.priority}">${priorityLabel}</span>
          <span>${record ? `${record.card.reps} reviews` : "New item"}</span>
          <span>${escapeHtml(card.type)}</span>
          <span>${card.wordCount} answer words</span>
        </div>
        <h2>${escapeHtml(card.prompt)}</h2>
        <div class="recall-prompt">
          <span>Retrieve</span>
          <p>Opening → sequence → proof → OpenAI connection</p>
        </div>
        <div class="answer-actions">
          <button class="codex-button" id="copy-for-codex"><span>Copy for Codex</span><small>Dictate + grade</small></button>
          <button class="reveal-button" id="reveal-answer">
            <span>${state.revealed ? "Answer shown" : "Show answer"}</span>
            <kbd>Space</kbd>
          </button>
        </div>
      </article>

      <aside class="memory-rail" aria-label="Memory landmarks">
        <div class="rail-heading">
          <p class="eyebrow">Memory rail</p>
          <span>${state.revealed ? "Edit your cue line" : "Hidden until reveal"}</span>
        </div>
        ${
          state.revealed
            ? `<textarea id="cue-editor" aria-label="Custom memory cue" placeholder="Write a short cue chain…">${escapeHtml(cues)}</textarea>
               <ol>${card.anchors.map((anchor) => `<li>${escapeHtml(anchor)}</li>`).join("")}</ol>`
            : `<div class="rail-mask" aria-hidden="true">${Array.from({ length: 5 }, (_, index) => `<span style="width:${78 - index * 7}%"></span>`).join("")}</div>`
        }
      </aside>
    </section>

    <section class="answer-drawer ${state.revealed ? "is-open" : ""}" aria-hidden="${!state.revealed}">
      <div class="answer-toolbar">
        <div><p class="eyebrow">Reference answer</p><span>Compare ideas, not wording</span></div>
        <span class="source-location" title="wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md">Source note · line ${card.sourceLine}</span>
      </div>
      <div class="answer-copy">${state.revealed ? renderMarkdown(card.answer) : ""}</div>
      <div class="grade-panel">
        <div>
          <p class="eyebrow">How complete was your recall?</p>
          <p>Grade the answer you gave before looking.</p>
        </div>
        <div class="grade-buttons">
          <button data-rating="1" class="grade again"><kbd>1</kbd><b>Again</b><span>${intervals.again}</span></button>
          <button data-rating="2" class="grade hard"><kbd>2</kbd><b>Hard</b><span>${intervals.hard}</span></button>
          <button data-rating="3" class="grade good"><kbd>3</kbd><b>Good</b><span>${intervals.good}</span></button>
          <button data-rating="4" class="grade easy"><kbd>4</kbd><b>Easy</b><span>${intervals.easy}</span></button>
        </div>
      </div>
    </section>
  `;

  bindStageEvents();
  updateTimer();
}

function reveal() {
  if (state.revealed) return;
  if (state.timerRunning) state.elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
  state.revealed = true;
  state.timerRunning = false;
  clearInterval(state.timer);
  renderStage();
  document.querySelector(".answer-drawer")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function grade(rating) {
  if (!state.revealed) return;
  const card = currentCard();
  if (!card) return;
  const previous = recordFor(card.id);
  const result = scheduler.next(hydrateFsrsCard(previous?.card), new Date(), rating);
  state.records[card.id] = {
    card: result.card,
    history: [
      ...(previous?.history ?? []),
      { rating, reviewedAt: new Date().toISOString(), elapsed: state.elapsed },
    ].slice(-30),
  };
  if (rating <= Rating.Hard && !state.sessionRetries[card.id]) {
    state.sessionRetries[card.id] = true;
    const retryAt = Math.min(state.index + 4, state.session.length);
    state.session.splice(retryAt, 0, { ...card, retry: true });
  }
  saveProgress();
  state.completed += 1;
  state.index += 1;
  resetCardState();
  renderShell();
}

function updateTimer() {
  const timer = document.querySelector("#timer");
  if (!timer) return;
  timer.textContent = formatClock(state.elapsed);
  const target = currentCard()?.targetSeconds ?? 120;
  timer.classList.toggle("is-warn", state.elapsed >= target * 0.8 && state.elapsed < target);
  timer.classList.toggle("is-over", state.elapsed >= target);
}

function codexPrompt(card) {
  return `Grade my dictated answer to this Recall Room prompt:\n\n"${card.prompt}"\n\nUse only the comprehensive SDR answer bank at wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md, especially the source heading "${card.title}" around line ${card.sourceLine}. Grade core ideas, structure, evidence, OpenAI/customer relevance, and concision. Tell me what I covered, what I missed, the single biggest improvement, and recommend Again, Hard, Good, or Easy. Do not grade for matching the wording.\n\nMy dictated answer:\n`;
}

async function copyForCodex() {
  const card = currentCard();
  if (!card) return;
  const button = document.querySelector("#copy-for-codex");
  try {
    await navigator.clipboard.writeText(codexPrompt(card));
    if (button) button.innerHTML = "<span>Copied</span><small>Paste, then dictate</small>";
  } catch {
    if (button) button.innerHTML = "<span>Copy failed</span><small>Try again</small>";
  }
}

function bindShellEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      renderShell();
    });
  });
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      buildSession();
      renderShell();
    });
  });
  document.querySelector("#section-filter")?.addEventListener("change", (event) => {
    state.section = event.target.value;
    buildSession();
    renderShell();
  });
  document.querySelector("#priority-filter")?.addEventListener("change", (event) => {
    state.priority = event.target.value;
    buildSession();
    renderShell();
  });
  document.querySelectorAll("[data-session-size]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sessionLength = Number(button.dataset.sessionSize);
      buildSession();
      renderShell();
    });
  });
  document.querySelector("#question-search")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    buildSession();
    renderShell();
    document.querySelector("#question-search")?.focus();
  });
  document.querySelector("#new-session")?.addEventListener("click", () => {
    buildSession();
    renderShell();
  });
  document.querySelector("#reset-progress")?.addEventListener("click", () => {
    if (!window.confirm("Reset all recall history and custom cue lines?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state.records = {};
    state.customCues = {};
    buildSession();
    renderShell();
  });
}

function bindStageEvents() {
  document.querySelector("#reveal-answer")?.addEventListener("click", reveal);
  document.querySelector("#timer-toggle")?.addEventListener("click", toggleTimer);
  document.querySelector("#copy-for-codex")?.addEventListener("click", copyForCodex);
  document.querySelector("#focus-toggle")?.addEventListener("click", () => {
    state.focusMode = !state.focusMode;
    renderShell();
  });
  document.querySelectorAll("[data-rating]").forEach((button) => {
    button.addEventListener("click", () => grade(Number(button.dataset.rating)));
  });
  const cueEditor = document.querySelector("#cue-editor");
  const fitCueEditor = () => {
    if (!cueEditor) return;
    cueEditor.style.height = "auto";
    cueEditor.style.height = `${cueEditor.scrollHeight}px`;
  };
  fitCueEditor();
  cueEditor?.addEventListener("input", (event) => {
    const card = currentCard();
    if (!card) return;
    state.customCues[card.id] = event.target.value;
    saveProgress();
    fitCueEditor();
  });
}

function bindKeyboard() {
  window.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
    if (event.key === "/" && !typing) {
      event.preventDefault();
      document.querySelector("#question-search")?.focus();
      return;
    }
    if (typing) return;
    if (event.code === "Space") {
      event.preventDefault();
      reveal();
    } else if (["1", "2", "3", "4"].includes(event.key)) {
      grade(Number(event.key));
    } else if (event.key.toLowerCase() === "f") {
      state.focusMode = !state.focusMode;
      renderShell();
    }
  });
}

async function init() {
  loadProgress();
  const response = await fetch("/cards.json");
  if (!response.ok) throw new Error("Could not load the answer bank. Run npm run sync.");
  state.payload = await response.json();
  buildSession();
  bindKeyboard();
  renderShell();
}

init().catch((error) => {
  document.querySelector("#app").innerHTML = `
    <main class="fatal-error"><h1>Recall Room could not start.</h1><p>${escapeHtml(error.message)}</p></main>
  `;
});
