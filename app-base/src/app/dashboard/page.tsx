export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <AppShell userEmail={user.email}>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-500 mb-8">
          Bienvenue, {user.email}
        </p>

        {/* Module cards will appear here when modules are added */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">—</div>
            <div className="text-sm text-gray-500 mt-1">Aucun module installé</div>
          </div>
        </div>

        {/* Hint for developer */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
          <strong>app-base opérationnel.</strong> Ajoutez des modules depuis{' '}
          <code className="bg-blue-100 px-1 rounded">fm1960/app-modules/modules/</code>
        </div>
      </div>
    </AppShell>
  )
}
