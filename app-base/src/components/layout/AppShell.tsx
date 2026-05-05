'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SideNav from './SideNav'

type Props = {
  children: React.ReactNode
  userEmail?: string
}

export default function AppShell({ children, userEmail }: Props) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav
        appName={process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
        appTagline={process.env.NEXT_PUBLIC_APP_TAGLINE}
        onSignOut={handleSignOut}
        userEmail={userEmail}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
