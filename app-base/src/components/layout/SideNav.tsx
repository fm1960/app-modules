'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, type NavItem } from '@/config/nav'

type Props = {
  appName: string
  appTagline?: string
  onSignOut: () => void
  userEmail?: string
}

// Group nav items by their group field
function groupItems(items: NavItem[]) {
  const groups: Record<string, NavItem[]> = {}
  for (const item of items) {
    const key = item.group ?? ''
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  }
  return groups
}

export default function SideNav({ appName, appTagline, onSignOut, userEmail }: Props) {
  const pathname = usePathname()
  const groups = groupItems(navItems)

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* App identity */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="text-lg font-bold text-white">{appName}</div>
        {appTagline && (
          <div className="text-xs text-gray-400 mt-0.5">{appTagline}</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="mb-4">
            {group && (
              <div className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group}
              </div>
            )}
            {items.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-gray-700">
        {userEmail && (
          <div className="text-xs text-gray-400 mb-2 truncate">{userEmail}</div>
        )}
        <button
          onClick={onSignOut}
          className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
        >
          Se déconnecter
        </button>
      </div>
    </aside>
  )
}
