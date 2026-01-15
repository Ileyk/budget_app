# Barcelona Flat Budget

Simple single-page budgeting app (React + TypeScript) for tracking incomes and expenses tied to a flat purchase in Barcelona (EUR, es-ES).

Quick start

1. Install deps: npm install
2. Run dev server: npm run dev
3. Run tests: npm run test

Features

- Add, edit (basic), delete transactions (income/expense)
- Seeded sample data matching the provided spreadsheet (Start 10,000 EUR, End 10,722 EUR)
- Summary dashboard: Start vs End balance, savings card, planned vs actual bars, category tables
- Local persistence (localStorage) and CSV export/import
- Tests: unit tests for calculations and a simple integration test

Notes

- Currency & dates use es-ES + EUR formatting. The seed data is in `src/data/seed.ts`.
- To reset data, clear localStorage for key `barcelona-flat-budget-v1`.

Acceptance checklist

- Seed the app: Start 10,000 EUR, totals should be Income 7,020 EUR, Expenses 6,298 EUR
- End balance should show 10,722 EUR and Saved +722 / +7%
- Add or remove transactions and verify charts and tables update immediately
- Export CSV and re-import it to confirm transactions are preserved

Tip of the day

- The app includes a "Tip of the day" button in the header that opens a short, actionable finance tip.
- Tips rotate deterministically by date and are stored locally in `src/data/tips.ts` (supports English and Spanish).
- To reset the seen state, clear localStorage key `tips.lastSeenDate`.

