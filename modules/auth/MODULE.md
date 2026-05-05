# module-auth — Install Guide

Adds login, signup, Google OAuth, and a `profiles` table to your app.

---

## What this module adds

| What | Where in your app |
|------|-------------------|
| Login page (email + Google) | `/auth/login` |
| Signup page | `/auth/signup` |
| OAuth callback handler | `/auth/callback` |
| Profile auto-creation | Supabase trigger (SQL) |
| `LoginForm` component | `src/components/auth/` |
| `SignupForm` component | `src/components/auth/` |

---

## Install steps

### Step 1 — Copy component files
Copy `modules/auth/components/` → `src/components/auth/` in your app.

### Step 2 — Copy route files
Copy everything inside `modules/auth/routes/` → `src/app/` in your app.

Result:
```
src/app/auth/login/page.tsx       ← replaces the placeholder
src/app/auth/signup/page.tsx
src/app/auth/callback/route.ts    ← handles Google OAuth
```

### Step 3 — Copy types
Copy `modules/auth/types.ts` → `src/types/auth.ts` in your app.

### Step 4 — Run SQL
Open `modules/auth/sql/auth.sql`, copy it, paste in **Supabase SQL Editor → Run**.

This creates the `profiles` table and the auto-create trigger.

### Step 5 — Configure Google OAuth (optional)
If you want Google login:

1. Go to **Supabase Dashboard → Auth → Providers → Google**
2. Enable Google and paste your Google Client ID + Secret
   (Get these from [console.cloud.google.com](https://console.cloud.google.com))
3. Add to **Supabase → Auth → URL Configuration → Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-app.vercel.app/auth/callback
   ```

If you don't want Google login, set `showGoogleAuth={false}` in `login/page.tsx`.

---

## No nav items
This module adds nothing to the sidebar nav.
Login/logout is handled by `AppShell` → `SideNav` footer button.

---

## Roles available (from `types.ts`)
- `member` — default for all new users
- `moderator` — can manage content
- `admin` — full access

Roles are stored in the `profiles.role` column.
Change a user's role directly in Supabase Table Editor.
