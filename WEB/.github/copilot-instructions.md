# Copilot Instructions for WashCar Web

## Project Overview
- **Stack:** Vite + React + TypeScript + Tailwind CSS + shadcn-ui
- **Purpose:** Admin dashboard for car wash scheduling, client management, and service booking.
- **Structure:**
  - `src/pages/`: Main route components (e.g., `Calendar.tsx`, `Clients.tsx`, `Dashboard.tsx`).
  - `src/components/`: Shared UI and dialogs. `components/ui/` contains shadcn-ui primitives.
  - `src/services/`: Business logic and API communication. `services/requests/` for request payloads.
  - `src/hooks/`: Custom React hooks for domain logic (e.g., schedule, client, services).
  - `src/lib/utils.ts`: Utility functions.

## Key Patterns & Conventions
- **State Management:** Local state via React hooks. No Redux/MobX. Use custom hooks for domain logic.
- **API Calls:** Use `src/api/fetchClient.ts` for HTTP requests. Service files wrap API logic (e.g., `clientService.ts`).
- **Dialogs/Modals:** Use dialog components in `components/` (e.g., `AddClientDialog.tsx`).
- **UI Library:** Use shadcn-ui components from `components/ui/` for consistent styling.
- **Styling:** Tailwind CSS for all styling. Avoid inline styles.
- **Routing:** Each page in `src/pages/` is a route. Navigation handled in layout/sidebar components.

## Developer Workflows
- **Install:** `npm i`
- **Dev Server:** `npm run dev` (Vite hot reload)
- **Build:** `npm run build`
- **Lint:** `npx eslint .`
- **Format:** `npx prettier --write .`
- **No test suite present** (as of current codebase).

## Integration Points
- **Lovable Platform:** Project can be edited/deployed via [Lovable](https://lovable.dev/projects/175a3def-ce0e-4b43-9dfc-70536989ec4d).
- **Custom Domain:** Supported via Lovable settings.

## Examples
- **Add a new service:** Create a file in `src/services/`, add API logic, expose via custom hook in `src/hooks/`.
- **Add a new page:** Create a component in `src/pages/`, link via sidebar/navigation.
- **Add a new dialog:** Place dialog in `src/components/`, use shadcn-ui primitives from `components/ui/`.

## Tips for AI Agents
- Prefer using existing hooks/services for data access.
- Follow file/folder conventions for new features.
- Use shadcn-ui and Tailwind for UI consistency.
- Reference `README.md` for Lovable-specific workflows.

---
*Update this file as project conventions evolve. Ask for feedback if any section is unclear or missing.*
