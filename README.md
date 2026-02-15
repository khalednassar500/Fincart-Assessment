# Fincart – Interactive Shipping Calculator

A Quick Quote engine that lets merchants compare courier rates side by side. Built with React, TypeScript, and Material UI.

The idea is simple — fill in where the package is going, how heavy it is, and instantly see what each courier would charge. No clutter, no guessing.

---

## Tech Stack

- React 19 + Vite
- TypeScript
- React Hook Form + Zod
- Material UI (MUI)
- Context API

---

## Project Structure

```
src/
├── components/       – UI pieces (CourierCard, QuoteForm, SidebarSummary, state screens)
├── context/          – QuoteContext that holds all shared state
├── hooks/            – useQuote hook for accessing context
├── schemas/          – Zod validation schemas (one per form step)
├── api/              – Mock courier data and pricing logic
├── types/            – TypeScript interfaces and country list
└── theme/            – MUI theme (colors, typography, component overrides)
```

I tried to keep things where you'd expect to find them. Business logic stays out of components, validation lives in its own folder, and the UI just renders what the context tells it to.

---

## How the Form Works

The form has three steps:

1. **Origin** – where the package ships from (country, city, postal code)
2. **Destination** – where it's going
3. **Package** – weight and dimensions

Each step has its own `useForm()` instance with a Zod schema, so typing in one step doesn't cause the others to re-render. Validation is scoped per step — you can't move forward until the current step is valid.

Key rules:

- Weight must be greater than zero
- Country codes are validated against a known list (important for international shipping)

---

## State Management

Everything flows through `QuoteContext`. No prop drilling.

The context holds:

- The accumulated form data (origin, destination, package details)
- Courier results from the search
- Current loading/error/empty status
- The `searchCouriers` function

The `SidebarSummary` reads directly from context, so it updates in real time as the user fills in the form — they can see their shipment details building up before they even hit search.

---

## What Happens When You Search

The search simulates an API call with a 1.5s delay. The UI handles five states:

| State       | What the user sees                                     |
| ----------- | ------------------------------------------------------ |
| **Initial** | A prompt to fill out the form                          |
| **Loading** | Skeleton cards that match the shape of real results    |
| **Success** | Courier cards with pricing, delivery times, and badges |
| **Empty**   | A message saying no couriers serve that route          |
| **Error**   | The error message + a retry button                     |

### How I'd Handle This in Production

If a real courier API went down (say DHL's rate service returns 500):

- I'd catch the failure **per provider**, not kill the whole search
- The user would still see results from FedEx, UPS, etc.
- A small warning banner would say something like "DHL rates temporarily unavailable"
- The failed request would retry with exponential backoff (1s → 2s → 4s, max 3 attempts)
- Errors would go to Sentry or similar for monitoring
- As a fallback, I'd consider showing cached rates with a "rates may be outdated" label

---

## UI Decisions

- `CourierCard` shows base price and tax separately so merchants see exactly what they're paying
- The cheapest and fastest options get `Chip` badges automatically — no manual flagging
- Cards get a colored top border (gold for cheapest, blue for fastest, green if both)
- Everything uses MUI's `sx` prop and theme tokens so the styling stays consistent

---

## Performance

What's already in place:

- Each form step has its own `useForm()` — keystrokes don't re-render the whole page
- Context value is wrapped in `useMemo` so consumers only re-render when data actually changes
- `CourierCard` uses `React.memo` to skip re-renders when props haven't changed
- Vite splits the bundle into separate chunks (MUI, form libs, app code)

What I'd add for slow connections (3G in emerging markets):

- `React.lazy` + `Suspense` for the results panel (not needed until the user searches)
- Gzip/Brotli compression on the server
- Cache headers on API responses
- Move rate aggregation server-side so the client gets one small payload instead of hitting multiple APIs
- Self-host a subset of the Inter font instead of loading the full family from Google

---

## Responsive Layout

- **Mobile**: cards stack vertically, sidebar moves into a drawer (accessible via a floating button)
- **Desktop**: three-column layout — sidebar, form, and results sit next to each other

---

## Running It

```bash
npm install
npm run dev
```
