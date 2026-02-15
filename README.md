# Fincart – Interactive Shipping Calculator

This project is a Quick Quote engine built with React, TypeScript, and Material UI.

The goal is to help merchants quickly compare courier rates in a clean and practical interface, reducing decision friction during shipment creation.

The focus of this implementation was clarity in data flow, modular UI components, predictable state management, and a smooth async experience.

---

## Tech Stack

- React (Vite)
- TypeScript
- React Hook Form
- Zod
- Material UI (MUI)
- Context API

---

## Project Structure

The project is organized into:

- `components/` – Reusable UI components (CourierCard, SidebarSummary, states, etc.)
- `context/` – Centralized QuoteContext for shared state
- `forms/` – Multi-step form logic (Origin, Destination, Package)
- `theme/` – MUI theme configuration
- `services/` – Mock courier rate fetching logic

The structure keeps business logic separate from presentation logic.

---

## Multi-Step Form

The form is divided into three steps:

1. Origin Details
2. Destination Details
3. Package Details

Each step uses `react-hook-form` with Zod validation.

Key validation rules:

- Weight must be greater than zero
- International shipping requires valid country codes

Steps are isolated to avoid unnecessary re-renders and to keep validation scoped to each stage.

---

## State Management

Global state is handled using React Context (`QuoteContext`) to avoid prop drilling.

The context manages:

- Form data
- Courier results
- Loading state
- Error state
- Search action

The sidebar updates in real-time as the user modifies weight or destination inputs.

---

## Async States

The Search action simulates an API request.

The UI handles the following states:

- Initial (before search)
- Loading (Skeleton placeholders)
- Success (courier cards displayed)
- Empty (no couriers available for route)
- Error (retry option shown)

In a real production environment, if a courier provider (e.g., DHL) failed:

- The failure would be caught per provider
- Partial results would still be returned
- The UI would show a non-blocking warning
- Errors would be logged for monitoring

---

## UI & Design System

Material UI is used with a centralized theme configuration.

- `CourierCard` is modular and reusable
- Base price and tax are displayed separately
- Cheapest and Fastest options are calculated dynamically
- Highlighting is done using MUI `Chip` components
- Styling uses `sx` props and theme tokens for consistency

---

## Performance Considerations

- Context value is memoized to reduce unnecessary re-renders
- Form steps are separated to isolate render scope
- Vite manual chunk splitting is configured for better bundle control
- MUI imports are kept modular

For slower network environments (e.g., 3G):

- Lazy loading could be introduced for non-critical components
- API responses should be compressed and cached
- Server-side aggregation could reduce client work

---

## Responsive Layout

Mobile-first approach:

- Small screens: vertical stacking with drawer sidebar
- Larger screens: multi-column layout for side-by-side comparison

---

## Running the Project

```bash
npm install
npm run dev
```
