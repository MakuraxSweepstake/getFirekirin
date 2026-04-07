# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run lint      # Run ESLint
```

There is a Jest test setup (`jest.config.js`, `jest.setup.tsx`) but tests are sparse. Run tests with:
```bash
npx jest                          # All tests
npx jest path/to/file.test.tsx    # Single file
```

## Environment

```
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=https://app.getfirekirin.com   # Backend API
NEXT_PUBLIC_FORT_PAY_KEY=...                        # CollectJS payment key
NEXT_PUBLIC_GTM_ID=...
NEXT_PUBLIC_AGE_CHECKER_KEY=...
```

All backend calls are proxied: Next.js rewrites `/api/backend/*` → `NEXT_PUBLIC_BASE_URL`. The base query in `src/services/baseQuery.ts` prepends `/api/backend` to every RTK Query request and injects `Authorization`, `X-Device-Id`, and `X-Device-Fingerprint` headers automatically.

## Architecture

### Routing (Next.js App Router)

Route groups in `src/app/` control layouts and auth — parentheses folders add no URL segment:

- `(auth)/` — public auth pages (`/login`, `/register`, etc.)
- `(dashboard)/(admin)/` — admin-only pages (`/settings`, `/games`, `/players`, `/transactions`, etc.), wrapped in `Private` + role check
- `(dashboard)/(user)/(outsideAuth)/` — public user pages (home, buy-coins, withdrawl, etc.), wrapped in `ComingSoonGate`
- `(dashboard)/(user)/(privateUser)/` — authenticated user pages (`/profile/...`), wrapped in `ComingSoonGate` + `Private`

Admin and user routes share the same URL namespace (no `/admin/` prefix). Role differentiation happens at the layout/component level via the `Private` component and `user.role` checks (`SUPER_ADMIN | ADMIN | USER`).

### State Management

Redux store (`src/hooks/store.ts`) combines 5 slices + 14 RTK Query API reducers:

**Slices (`src/slice/`):**
- `authSlice` — auth token + user object, persisted to localStorage as `"token"` JSON
- `toastSlice` — global toast notifications (`showToast({ message, variant })`)
- `authModalSlice` — login modal open/close state
- `updatePasswordSlice` — game password change modal + provider context
- `userBalanceSlice` — per-provider game balances cache

**RTK Query APIs (`src/services/`):**

| Service | Key endpoints |
|---|---|
| `authApi` | login, register, verify email, OTP, age verification |
| `gameApi` | game CRUD (admin), user game listing |
| `playerApi` | user/player CRUD (admin) |
| `userApi` | profile, game credentials, password changes |
| `transactionApi` | user balance, deposits (`deposit`), withdrawals (`submitMassPayPaymentFields`) |
| `settingApi` | site config, banners, chatbot, transaction limits, site availability |
| `pageApi` | CMS pages |
| `paymentSetupApi` | payment gateway config (admin) |
| `dashboardApi` | admin analytics |

Tags for cache invalidation use string literals (`'settings'`, `'Deposit'`, etc.) — check existing tags before adding new endpoints.

### Server-Side Fetching

`src/serverApi/` contains plain async functions (not RTK Query) for SSR/ISR. They call `serverBaseQuery()` directly. Used in root `layout.tsx` for SEO metadata and in page components that need server-rendered data.

### Auth Flow

1. Login stores `{ access_token, user }` in Redux + localStorage key `"token"`
2. `src/routes/Private.tsx` hydrates auth from localStorage/cookies on mount, validates JWT expiry
3. `src/utils/authSession.ts` handles backup/restore across payment redirects (Fort Pay redirects away and back)
4. Token is injected into every RTK Query request via `prepareHeaders` in `baseQuery.ts`

### Payment Flow (Fort Pay / CollectJS)

CollectJS (loaded via `<Script>`) tokenizes card data client-side. Key pattern in `FortPay.tsx`:
- Use a `useRef` (`billingRef`) to pass Formik values into the CollectJS callback closure — the callback is created at script-load time and cannot close over reactive state
- The submit button must be `type="button"` calling `formik.submitForm()` manually — `type="submit"` causes CollectJS to intercept the form and bypass Yup validation
- Billing fields must be sent to the backend API explicitly; `wallet.billingInfo` is only populated for Apple Pay/Google Pay, never for CC tokenization

### Coming Soon Gate

`src/components/organism/ComingSoonGate.tsx` fetches `/api/setting/site-availability` (public endpoint). When `coming_soon === false`, it renders the coming soon page instead of children. Applied only to user layouts — admin layouts are unaffected. Default value is `true` (site is live).

### Styling

- **TailwindCSS v4** for utility classes
- **Material-UI v7** for components — theme customized in `src/theme/`
- **ThemeContext** (`src/context/ThemeContext.tsx`) manages dark/light mode, locale (en/ar), and sidebar mini mode

### Key Conventions

- Path alias: `@/` → `src/` (configured in `tsconfig.json`)
- All route path constants live in `src/routes/PATH.ts` — use these instead of hardcoded strings
- Form handling: Formik + Yup throughout. Dynamic Yup schemas (e.g., transaction limits) are built with factory functions that accept nullable config values
- Nullable limits pattern: `null` means "no limit enforced"; UI elements conditionally render only when the value is non-null (never show `$null` or empty parentheses)
- Admin public API endpoints: `/api/admin/...` (requires auth). Public equivalents use `/api/setting/...` (e.g., chatbot, site availability)
- `enableReinitialize: true` is used on Formik forms that populate from RTK Query data
