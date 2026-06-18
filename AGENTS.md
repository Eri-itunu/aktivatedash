# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server
yarn build        # Build for production
yarn generate     # Static site generation
yarn preview      # Preview production build
```

Use **Yarn** (not npm) — the project uses Yarn 1.22.22+ configured via `.yarnrc.yml`.

## Architecture Overview

**Nuxt 3** SPA (SSR disabled, CSR only) with dual user tracks: **Creator** (`/pages/creator/`) and **Brand** (`/pages/brands/`). Role-based routing is enforced by `middleware/auth.global.ts`.

### User Roles

Defined in `enums/userRoles.ts`:
- Creator → roleId 1 → `/creator/dashboard`
- Brand → roleId 4 → `/brands/dashboard`

### State Management

Two layers:
1. **Pinia** (persisted via `pinia-plugin-persistedstate`) for client state — user auth, UI preferences. Key store: `stores/userStore.ts`.
2. **TanStack Vue Query** for server state — data fetching, caching, mutations. Composables in `/composables/` wrap mutations with toast notifications.

Auth token is stored in localStorage and injected by `plugins/http.ts` (Axios interceptor) as `Authorization: Bearer <token>`.

### API Patterns

API endpoint functions live in `/api/` grouped by resource and role (`/api/brand/`, `/api/creator/`, `/api/auth/`). Functions take `{ accessToken, apiUrl, body? }` and return typed `APIResponse<K, T>` or `PaginatedAPIResponse<K, T>`.

Three ways API calls are made in components:
```typescript
// 1. $fetch (Nuxt native, preferred in stores)
const res = await $fetch<APIResponse<'profile', IUserProfile>>(`${apiUrl}/profile`, {
  headers: { Authorization: `Bearer ${token}` }
});

// 2. Axios via plugin (preferred in composables)
const { $http } = useNuxtApp();
const res = await $http.get(API_ROUTES.PROFILE.GET_PROFILE);

// 3. Vue Query mutation (preferred for form submissions)
const { mutate, isPending } = useMutation({ mutationFn: ..., onSuccess: ..., onError: ... });
```

All API route strings are in `constants/routes.ts` as `API_ROUTES.*`.

### Component & UI Stack

- **Shadcn-nuxt** components in `/components/ui/` (auto-generated, don't edit manually)
- **Nuxt UI** for higher-level components (modals, toasts, etc.)
- **Tailwind CSS** with custom color tokens (`vDarkBlue`, `darkBlue`, brand purples) defined in `tailwind.config.ts`
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional class merging

### Layouts

- `dashboard.vue` — resizable split-panel layout for authenticated dashboard views
- `light.vue` — light-mode layout for public/onboarding pages
- `default.vue` — base layout

Set per-page via `definePageMeta({ layout: 'dashboard' })`.

### Types

All shared TypeScript interfaces are in `/types.ts` (650+ lines): `IUser`, `IUserProfile`, `ICampaign`, `IPlatformProfile`, response wrappers, etc.

### Naming Conventions

- Components: PascalCase (`StatsCard.vue`)
- Composables: `use` prefix camelCase (`useBrandAuth.ts`)
- Stores: `Store` suffix camelCase (`userStore.ts`)
- API files: `resource.scope.ts` pattern (`profile.creator.ts`, `campaign.brand.ts`)

### Runtime Config

Environment variables are read in `nuxt.config.ts` via `runtimeConfig`:
- `API_URL` — backend base URL (`https://api.useaktivate.com/api/v2`)
- `GTM_ID`, `METAPIXEL_ID`, `PLATFORM_FEE`

Access in code: `useRuntimeConfig().public.apiUrl`
