# App Modules — Claude Project Memory

> **READ THIS FIRST every session before writing any code.**
> This file is the single source of truth for how this module system works.

---

## What this repo is

`fm1960/app-modules` is a **module library** — not a running app.
It contains reusable building blocks that Claude assembles into new apps on request.

The workflow:
1. User says "build me an app with auth + articles"
2. Claude reads this file + the relevant module folders
3. Claude assembles a ZIP (app-base + selected modules merged)
4. User unzips in VS Code → `npm install` → paste SQL in Supabase → done

---

## Tech stack (fixed — never change)

- **Next.js 15** App Router + TypeScript
- **Supabase** — auth + PostgreSQL + Storage
- **Tailwind CSS** — styling
- **react-leaflet** — maps (only when gps-places module is included)
- **Vercel** — deployment
- **GitHub** — `fm1960` account

---

## Repo structure

```
app-modules/
├── INSTRUCTIONS.md        ← this file
├── app-base/              ← the foundation every new app starts from
│   ├── src/
│   │   ├── app/           ← Next.js App Router pages
│   │   ├── components/
│   │   │   └── layout/    ← AppShell, SideNav (module nav slots built in)
│   │   ├── config/
│   │   │   └── nav.ts     ← register module nav items here
│   │   └── lib/
│   │       └── supabase/  ← client.ts + server.ts
│   ├── middleware.ts       ← protects routes listed in PROTECTED_ROUTES
│   └── .env.local.example
└── modules/
    ├── auth/              ← login, signup, Google OAuth  [BUILT ✓]
    ├── user-manager/      ← roles, profiles, access      [PLANNED]
    ├── articles/          ← categories, publish/unpublish [PLANNED]
    ├── comments/          ← comments on articles/features [PLANNED]
    ├── gps-places/        ← Leaflet map + data library    [PLANNED]
    └── site-admin/        ← users, features, policy       [PLANNED]
```

---

## Module structure (every module follows this exactly)

```
modules/auth/
├── components/            ← React .tsx components for this module
├── routes/                ← Next.js page files (copy into app/[route]/)
├── sql/
│   └── auth.sql           ← Run once in Supabase SQL Editor
├── config/
│   └── nav-items.ts       ← nav entries this module adds to SideNav
├── types.ts               ← TypeScript types for this module
└── MODULE.md              ← install instructions (5 steps max)
```

---

## How to assemble a new app

When user requests a new app, Claude must:

1. **Read** `app-base/` folder structure (it's the shell)
2. **Read** each requested module's `MODULE.md` for install notes
3. **Merge** module `components/` into `app-base/src/components/[module]/`
4. **Merge** module `routes/` files into `app-base/src/app/[route]/`
5. **Append** module `nav-items.ts` entries into `app-base/src/config/nav.ts`
6. **Collect** all `sql/*.sql` files — list them in `INSTALL.md` of the ZIP
7. **Output** one ZIP with: merged app + `INSTALL.md` (step-by-step setup)

---

## Key Next.js 15 patterns (hard-learned — never skip these)

```typescript
// 1. Layouts that use Supabase must be force-dynamic
export const dynamic = 'force-dynamic'

// 2. params and searchParams must be awaited
const { id } = await params          // NOT params.id directly

// 3. useSearchParams() requires a Suspense boundary
<Suspense fallback={<div>Chargement...</div>}>
  <ComponentThatUsesSearchParams />
</Suspense>

// 4. Supabase client — createClient() inside the function, not at module level
export default async function Page() {
  const supabase = await createClient()  // inside the function body
  ...
}

// 5. TypeScript + Supabase join results need double casting
const data = result as unknown as MyExpectedType

// 6. Leaflet — always dynamic import with ssr: false
const Map = dynamic(() => import('@/components/MapWrapper'), { ssr: false })
```

---

## Supabase setup

- **One shared Supabase project** for all apps
- Each module adds its own tables (prefixed to avoid collisions)
- `.env.local` is NEVER committed (always in `.gitignore`)
- Each module's `sql/` folder has the exact SQL to run in the Supabase SQL Editor

### Required env vars (all apps)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Current modules status

| Module         | Status   | Tables added to Supabase     |
|----------------|----------|------------------------------|
| app-base       | ✓ Built  | none (shell only)            |
| auth           | Planned  | uses Supabase Auth built-in  |
| user-manager   | Planned  | profiles, roles              |
| articles       | Planned  | articles, categories         |
| comments       | Planned  | comments                     |
| gps-places     | Planned  | places                       |
| site-admin     | Planned  | settings, audit_log          |

---

## Git identity

Always commit as `fm1960`. Before first commit on any machine:
```bash
git config user.name "fm1960"
git config user.email "your-email@example.com"
```

## Deploy

Each app is a separate Vercel project pointing to its own GitHub repo.
The `app-modules` repo itself is never deployed — library only.

---

*Last updated: session building app-base*
