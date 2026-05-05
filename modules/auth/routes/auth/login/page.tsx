// Route: /auth/login
// Replaces the placeholder in app-base

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage() {
  // Already logged in → go to dashboard
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <LoginForm
      appName={process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
      appTagline={process.env.NEXT_PUBLIC_APP_TAGLINE}
      showSignup={true}
      showGoogleAuth={true}
    />
  )
}
