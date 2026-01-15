# Tip of the Day — Implementation Plan

TL;DR

Add an offline-first "Tip of the day" feature using a small static tip list and a deterministic daily rotation (day index % tips.length). Implement a `useTips` hook (logic + localStorage), a `TipButton` component (header UI + accessible modal), tests, and minimal styles + README notes. Keep it simple, testable, and localizable (en/es).

---

## Why this approach

- Offline-first: no remote fetch required, works even without network.
- Deterministic & testable: same tip for same date, easy to assert in tests (no randomness).
- Minimal footprint: small data file (`src/data/tips.ts`) and localized strings per tip.

---

## Files to add / modify (detailed)

- `src/data/tips.ts` (new)
  - Export typed array `Tip[]` with shape: `{ id: string; text: { en: string; es: string } }`.
  - Seed with 10 short, neutral, actionable tips.

- `src/hooks/useTips.ts` (new)
  - Exports:
    - `getTipForDate(date?: Date, locale?: string): Tip`
    - `hasSeen(date?: Date): boolean`
    - `markSeen(date?: Date): void`
  - Implementation details:
    - Deterministic rotation: daysSinceEpoch = Math.floor(date.getTime() / 86400000)
      index = daysSinceEpoch % tips.length
    - Persist `lastSeenDate` in `localStorage` under key `tips.lastSeenDate` for per-day seen state.

- `src/components/TipButton.tsx` (new)
  - Props: `locale?: string`, `position?: 'header'|'aside'` (optional)
  - Renders a small accessible button (uses `.btn` style) in the header.
  - Clicking opens a modal/dialog showing today's tip (text chosen with `getTipForDate`) and controls:
    - Close
    - Mark as seen (optional)
  - Accessibility:
    - role="dialog", aria-modal=true, aria-labelledby, and focus management (focus trap, restore focus to button on close).
    - Supports keyboard: Enter/Space to open, Esc to close, tab navigation.

- `src/index.css` (modify)
  - Add minimal styles for `.tip-modal`, `.tip-overlay`, `.tip-button` and mobile responsiveness.

- `src/App.tsx` (modify)
  - Import and place `<TipButton />` in the header (next to starting balance input) so it’s visible on all screen sizes.

- Tests (new files):
  - `src/tests/useTips.test.ts` — unit tests for deterministic selection, locale selection, and localStorage persistence (clear localStorage between tests). Use `vi.setSystemTime`.
  - `src/tests/tip.test.tsx` — tests for component behavior: button present, dialog opens, close works, Esc closes, focus returns to button.
  - `src/tests/integration.tips.test.tsx` — integration test rendering `App` with fixed time and checking the Tip button and modal content.

- `README.md` (modify)
  - Add a short section describing the feature, how to reset seen state, and the localStorage key.

---

## Sample tips (seed list)

1. Track one small recurring expense this week to see where money drains.
2. Automate saving: move a fixed amount to savings right after payday.
3. Round up transactions and save the change for goals.
4. Set a monthly spending limit per category and review weekly.
5. Compare subscriptions quarterly and cancel unused ones.
6. Use a dedicated account for bills to avoid overdrafts.
7. Build an emergency buffer of 1–2 months' essential expenses.
8. Prioritize high‑interest debt repayments to reduce cost.
9. Review prices on big purchases and wait 24 hours before buying.
10. Use a simple monthly budget: income – needs – wants – savings.

Each tip includes both `en` and `es` variants in `src/data/tips.ts`.

---

## Tests & acceptance criteria

- Unit tests (`useTips`): deterministic tip for a fixed date, `markSeen` sets localStorage, `hasSeen` returns expected value, and locale selection returns the correct language.
- Component tests: button exists, opens modal, modal contains tip text, Esc and Close work, focus returns to button.
- Integration test: render `App`, assert Tip is shown in header and the modal contains the same tip as `getTipForDate` for the fixed date.

Acceptance criteria:
- Button visible in header on desktop & mobile.
- Clicking the button opens an accessible modal with that day’s tip (locale-aware).
- Modal is keyboard operable, Esc closes, focus restored.
- `useTips` deterministic rotation works and `markSeen` persists in localStorage.
- Tests pass.

---

## Accessibility & UX considerations

- Use `role="dialog"`, `aria-modal=true`, and `aria-labelledby` for heading.
- Ensure keyboard interaction: Enter/Space opens, Esc closes, tab order is reasonable.
- Focus trapping inside modal recommended for full accessibility.
- Use `localStorage` to persist seen state per date so the same tip shows across reloads, and optionally show a subtle badge if today's tip is unseen.

---

## Implementation notes

- Deterministic index formula is easy to test: daysSinceEpoch = Math.floor(date / 86400000);
- Locale detection: prefer `locale` prop or fall back to `navigator.language`.
- Keep it local-first. If later you want remote tips, add a fetch fallback and keep local seed as safe fallback.

---

If you'd like, I can implement this now (scaffold files + tests + styles) — tell me to proceed and I'll create the components and tests next. 

*File created as a plan artifact — ready to implement.*
