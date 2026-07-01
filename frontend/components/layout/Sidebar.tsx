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
    <aside className="w-64 min-h-screen bg-[#faf8f4] border-r border-stone-200/60 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-stone-200/60">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a6b3c] to-[#2d8f5e] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </div>
          <div>
            <p className="font-extrabold text-md tracking-tight gradient-text">AgriPrecise</p>
            <p className="text-[#6b7280] text-[10px] uppercase tracking-wider font-semibold">Precision Agronomy</p>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 mx-3 mt-4 rounded-xl bg-white/80 backdrop-blur-sm border border-stone-200/60 flex items-center gap-3 shadow-sm animate-fade-in">
        <div className="w-10 h-10 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center text-lg">
          🧑‍🌾
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-[#1a1a1a] text-sm truncate capitalize">{displayName}</p>
          <p className="text-[#6b7280] text-xs truncate">North Plot - Active</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {SIDEBAR_LINKS.map((link, index) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group animate-fade-in-up',
                isActive
                  ? 'bg-[#1a6b3c]/8 text-[#1a6b3c] font-bold border-l-3 border-[#1a6b3c]'
                  : 'text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5'
              )}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <span className="text-base">{link.icon}</span>
              {t(link.labelKey)}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-pulse-gold" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-stone-200/60">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#6b7280] hover:text-[#dc4a3f] hover:bg-red-50/80 transition-all duration-200"
        >
          <span>🚪</span>
          {t('signOut')}
        </button>
      </div>
    </aside>
  )
}
