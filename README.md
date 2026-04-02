# FinFlow — Finance Dashboard

A clean, interactive finance dashboard built with **Next.js 14**, **Zustand**, **Recharts**, and **Tailwind CSS**.

## Live Demo

> Deploy to Vercel using the steps below.

---

## Features

### Core

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Transactions), balance trend area chart, spending donut breakdown, recent transactions list
- **Transactions** — Full table with search, type/category filtering, date/amount sorting, and CSV/JSON export
- **Insights** — Top spending category, saving rate, month-over-month comparison, category breakdown with progress bars
- **Role-Based UI** — Admin can add, edit, delete transactions; Viewer gets read-only access. Switch roles via sidebar dropdown.
- **State Management** — Zustand with localStorage persistence (transactions, role, period, dark mode)

### Enhancements

- Dark mode toggle (persistent)
- Data persistence via localStorage
- CSV and JSON export
- Responsive — works on mobile, tablet, desktop
- Animated transitions and micro-interactions
- Period filter (1M / 3M / 6M) across Dashboard and Insights
- Reset to default data button

---

## Tech Stack

| Layer     | Choice                  | Why                                                |
| --------- | ----------------------- | -------------------------------------------------- |
| Framework | Next.js 14 (App Router) | SSR-ready, file-based routing, great DX            |
| State     | Zustand + persist       | Lightweight, no boilerplate, built-in localStorage |
| Charts    | Recharts                | Composable, responsive, well-documented            |
| Styling   | Tailwind CSS            | Utility-first, consistent design tokens            |
| Icons     | Lucide React            | Clean, consistent icon set                         |
| Language  | TypeScript              | Type safety for transactions, filters, roles       |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

No environment variables required.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Entry point
│   └── globals.css         # Tailwind + global styles
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx    # Main layout, page routing, mobile nav
│   │   └── Sidebar.tsx     # Navigation, role switcher, theme toggle
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── TrendChart.tsx
│   │   ├── SpendingDonut.tsx
│   │   └── RecentTransactions.tsx
│   ├── transactions/
│   │   ├── TransactionsPage.tsx
│   │   └── TransactionModal.tsx
│   └── insights/
│       ├── InsightsPage.tsx
│       ├── InsightCards.tsx
│       ├── ComparisonChart.tsx
│       └── CategoryChart.tsx
├── context/
│   └── store.ts            # Zustand store + selectors
├── lib/
│   ├── data.ts             # Mock data, category colors
│   └── utils.ts            # Formatting, filtering, export
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## Design Decisions

- **Dark-first UI** with a `#0d0f14` base — finance dashboards benefit from dark themes (less eye strain for data-heavy views)
- **Syne + DM Mono** font pairing — Syne for personality, DM Mono for numbers (crucial for financial data readability)
- **Color encoding**: green = positive/income, red = negative/expense, blue = informational, amber = neutral metrics
- **Zustand over Context** — avoids prop drilling and re-render issues; the persist middleware handles localStorage for free
- **No backend needed** — all data is seeded in `src/lib/data.ts` and mutated in-memory with Zustand + localStorage

---

## Role Behavior

| Feature            | Admin | Viewer |
| ------------------ | ----- | ------ |
| View dashboard     | ✓     | ✓      |
| View transactions  | ✓     | ✓      |
| View insights      | ✓     | ✓      |
| Add transaction    | ✓     | ✗      |
| Edit transaction   | ✓     | ✗      |
| Delete transaction | ✓     | ✗      |
| Export data        | ✓     | ✓      |
