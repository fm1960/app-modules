// module-auth types
// Import these wherever you need user/profile data

export type UserRole = 'admin' | 'moderator' | 'member'

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}
