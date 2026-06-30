'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const SIDEBAR_LINKS = [
  { href: '/dashboard', labelKey: 'dashboard', icon: '📊' },
  { href: '/recommend', labelKey: 'soilLab', icon: '🧪' },
  { href: '/history', labelKey: 'history', icon: '📋' },
  { href: '/encyclopedia', labelKey: 'guides', icon: '📚' },
  { href: '/about', labelKey: 'about', icon: 'ℹ️' },
  { href: '/contact', labelKey: 'contact', icon: '📬' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const userEmail = user?.email || 'Farmer'
  const displayName = user?.user_metadata?.full_name || userEmail.split('@')[0]

  return (
    <aside className="w-64 min-h-screen bg-surface-container-low border-r border-outline-variant/30 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-outline-variant/30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <span className="text-lg text-white">🌱</span>
          </div>
          <div>
            <p className="font-extrabold text-primary text-md tracking-tight">AgriPrecise</p>
            <p className="text-on-surface-variant/60 text-[10px] uppercase tracking-wider font-semibold">Precision Agronomy</p>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 mx-2 mt-4 rounded-xl bg-white border border-outline-variant/20 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
          🧑‍🌾
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-on-surface text-sm truncate capitalize">{displayName}</p>
          <p className="text-on-surface-variant/70 text-xs truncate">North Plot - Active</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {SIDEBAR_LINKS.map(link => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-primary-container/20 text-primary border border-primary/20 font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container/40'
              )}
            >
              <span className="text-base">{link.icon}</span>
              {t(link.labelKey)}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-outline-variant/30">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <span>🚪</span>
          {t('signOut')}
        </button>
      </div>
    </aside>
  )
}
