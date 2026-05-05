// Central navigation config
// When you add a module, append its nav items here

export type NavItem = {
  label: string      // displayed in sidebar
  href: string       // route path
  icon: string       // emoji or icon name — keep it simple
  group?: string     // optional group heading in sidebar
}

export const navItems: NavItem[] = [
  { label: 'Tableau de bord', href: '/dashboard', icon: '▦' },

  // --- auth module adds nothing to nav (login/logout are in TopBar) ---

  // --- paste module nav items below when adding a module ---
  // { label: 'Articles',       href: '/articles',  icon: '✦', group: 'Contenu' },
  // { label: 'Commentaires',   href: '/comments',  icon: '✉', group: 'Contenu' },
  // { label: 'Utilisateurs',   href: '/users',     icon: '✿', group: 'Admin'   },
  // { label: 'Administration', href: '/admin',     icon: '⚙', group: 'Admin'   },
  // { label: 'Lieux',          href: '/places',    icon: '⌖', group: 'Carte'   },
]
