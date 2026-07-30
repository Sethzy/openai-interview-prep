import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const sourcePath = resolve(
  appRoot,
  "../../wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md",
);
const outputPath = resolve(appRoot, "public/cards.json");

const source = await readFile(sourcePath, "utf8");
const lines = source.split(/\r?\n/);

const headings = [];
for (let index = 0; index < lines.length; index += 1) {
  const match = lines[index].match(/^(#{2,5})\s+(.+?)\s*$/);
  if (!match) continue;
  headings.push({
    level: match[1].length,
    title: match[2].trim(),
    line: index,
  });
}

function cleanTitle(title) {
  return title
    .replace(/^Question:\s*/i, "")
    .replace(/^If Asked:\s*/i, "")
    .replace(/^Interview question:\s*/i, "")
    .replace(/^Prompt:\s*/i, "")
    .trim();
}

function isQuestionTitle(title) {
  return /\?$/.test(title) || /^(?:tell me|why |how |what |when |which |explain |describe |give me|walk me|have you|do you|does |is |are |can |could |would |where )/i.test(title);
}

function classifyType(title) {
  if (isQuestionTitle(title)) return "question";
  if (/story snapshot|case table|story|answer$/i.test(title)) return "story";
  if (/15-second|30-second|ninety-second|two-minute|version|setup/i.test(title)) return "version";
  if (/faq|follow-up|interrogation/i.test(title)) return "followup";
  if (/matrix|cheat sheet|decision rules|framework|ladder|router|map|ledger|drill/i.test(title)) return "reference";
  return "topic";
}

function makePrompt(title, category, parent, type) {
  if (type === "question") return title;
  const context = parent || category;
  if (/^Story Snapshot$/i.test(title)) return `Give the story snapshot for ${context}.`;
  if (/^(?:15-Second Setup|30-Second Version|Ninety-Second Interview Answer|Two-Minute STAR Answer)$/i.test(title)) {
    return `Deliver the ${title.toLowerCase()} for ${context}.`;
  }
  if (/Likely Follow-Ups/i.test(title)) return `What follow-ups should you expect for ${context}?`;
  if (/Technical Interrogation Cheat Sheet/i.test(title)) return `Talk through the technical interrogation points for ${context}.`;
  if (/^Canonical Case Table:/i.test(title)) return `Walk through the canonical case: ${title.replace(/^Canonical Case Table:\s*/i, "")}.`;
  if (/^Do Not Say$/i.test(title)) return `What should you avoid saying about ${context}?`;
  if (type === "story") return `Tell the story: ${title}.`;
  if (type === "version") return `Deliver ${title.toLowerCase()} for ${context}.`;
  if (type === "followup") return `Talk through ${title} for ${context}.`;
  if (type === "reference") return `Explain the ${title} for ${context}.`;
  return `Explain: ${title}.`;
}

function assignPriority(title, section, type) {
  const core = /tell me about yourself|why openai|why this strategic|why sdr|strong fit|thrive here|founder-led full-cycle|most impressive thing|genuinely like sales|explain an llm|reasoning models|explain an agent|^rag$|fine-tuning|hallucination|explain evals|which product surface|what makes a company|role of ai in sdr|creating a prospecting playbook|first discovery call|account prioritization|stakeholder mapping|target accounts|multi-threading|account director handoff|value-based selling|early-stage opportunity|real champion|coachability|hard feedback|failure|lost deal|biggest weakness|why leaving|behind target|daily prioritization|ambiguity/i;
  if (core.test(title)) return 1;
  if (["Motivation And Role Fit", "Prospecting, APAC, And Account Strategy", "VP Career And Behavioral Answers"].includes(section)) return 2;
  if (["Product And Technical Fluency", "Commercial And Deal Answers"].includes(section) && !["reference", "version"].includes(type)) return 2;
  return 3;
}

function targetSeconds(title, wordCount) {
  if (/15-second/i.test(title)) return 15;
  if (/30-second/i.test(title)) return 30;
  if (/ninety-second/i.test(title)) return 90;
  if (/two-minute|star answer/i.test(title)) return 120;
  if (wordCount < 100) return 45;
  if (wordCount < 250) return 90;
  return 120;
}

function stripMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|]/g, "")
    .replace(/^[-+\d.)\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAnchors(markdown) {
  const candidates = [];
  const seen = new Set();

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const boldMatches = [...trimmed.matchAll(/\*\*([^*]{3,100})\*\*/g)];
    for (const match of boldMatches) candidates.push(match[1]);

    if (/^(?:>\s*)?(?:[-*]|\d+[.)])\s+/.test(trimmed)) {
      candidates.push(trimmed);
    } else if (trimmed.startsWith(">") && trimmed.length > 20) {
      candidates.push(trimmed);
    }
  }

  if (candidates.length < 4) {
    for (const paragraph of markdown.split(/\n\s*\n/)) {
      const cleaned = stripMarkdown(paragraph);
      if (cleaned.length >= 20) candidates.push(cleaned.split(/(?<=[.!?])\s/)[0]);
    }
  }

  return candidates
    .map(stripMarkdown)
    .filter((candidate) => {
      if (candidate.length < 3 || candidate.length > 135) return false;
      const key = candidate.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);
}

const excludedTitle = /^(?:source basis|source and truth boundaries|audit pass summary|second brain retrieval basis|current official verification snapshot|product fluency source basis)$/i;
const cards = [];

for (let position = 0; position < headings.length; position += 1) {
  const heading = headings[position];
  if (heading.level < 4 || excludedTitle.test(heading.title)) continue;

  let endLine = lines.length;
  for (let next = position + 1; next < headings.length; next += 1) {
    if (headings[next].level <= heading.level) {
      endLine = headings[next].line;
      break;
    }
  }

  const answer = lines
    .slice(heading.line + 1, endLine)
    .join("\n")
    .trim();
  if (stripMarkdown(answer).length < 80) continue;

  const parents = headings.filter(
    (candidate) => candidate.line < heading.line && candidate.level < heading.level,
  );
  const section = [...parents].reverse().find((candidate) => candidate.level === 2)?.title ?? "Other";
  const category = [...parents].reverse().find((candidate) => candidate.level === 3)?.title ?? section;
  const parentCard = [...parents].reverse().find((candidate) => candidate.level === 4)?.title;
  const title = cleanTitle(heading.title);
  const type = classifyType(title);
  const wordCount = stripMarkdown(answer).split(/\s+/).filter(Boolean).length;
  const path = [section, category, parentCard, title].filter(Boolean).join(" / ");
  const id = createHash("sha1").update(path).digest("hex").slice(0, 12);

  cards.push({
    id,
    title,
    prompt: makePrompt(title, category, heading.level === 5 ? parentCard : null, type),
    type,
    priority: assignPriority(title, section, type),
    section,
    category,
    parent: heading.level === 5 ? parentCard : null,
    level: heading.level,
    sourceLine: heading.line + 1,
    answer,
    anchors: extractAnchors(answer),
    wordCount,
    targetSeconds: targetSeconds(title, wordCount),
  });
}

const payload = {
  source: "wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md",
  generatedAt: new Date().toISOString(),
  cards,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Synced ${cards.length} cards from the comprehensive answer bank.`);
