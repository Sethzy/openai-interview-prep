# Recall Room

A local-first active-recall trainer backed by the broad historical OpenAI interview answer bank.

> This deck is a breadth/reference surface, not the live canonical final-round pack. Its source bank is deprecated for direct rehearsal and does not contain every current role-play answer, including the final VNG/Zalo–DBS–GCash portfolio and latest TruTrip material. Use the final role-play pack and live cheat sheet for canonical delivery practice.

## Run it

```bash
cd tools/interview-grinder
npm install
npm run dev
```

The dev command regenerates `public/cards.json` exclusively from:

`wiki/domains/OpenAI-SDR-comprehensive-answer-expansion-bank.md`

Open the local URL printed by Vite. Progress and custom cue lines stay in the browser's local storage.

Every substantive drillable heading stays in the deck. The sync step rewrites reference headings into speakable prompts and assigns them to P1 Core, P2 Depth, or P3 Full Bank so the default queue covers everything in priority order.

## Practice loop

1. Read the prompt and press **Start answer** when you are ready.
2. Answer aloud, or press **Copy for Codex**, paste into Codex, and dictate your answer there for grading.
3. Press `Space` to reveal the reference answer and memory rail.
4. Compare ideas rather than exact wording.
5. Grade the answer with `1` through `4`.
6. Again and Hard answers return once later in the same session; FSRS schedules subsequent reviews.

Use the priority filter when you want a P1-, P2-, or P3-only block. Quick, Standard, and Deep sessions contain 5, 10, and 20 starting items respectively. Use `F` for focus mode and `/` to jump to search.

## Refresh the deck

Run `npm run sync` after changing the comprehensive answer bank. Card IDs are derived from the heading path, so progress remains stable as long as headings do not change.
