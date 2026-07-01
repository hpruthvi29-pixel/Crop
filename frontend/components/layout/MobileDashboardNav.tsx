'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

const SIDEBAR_LINKS = [
  { href: '/dashboard', labelKey: 'dashboard', icon: '📊' },
  { href: '/recommend', labelKey: 'soilLab', icon: '🧪' },
  { href: '/history', labelKey: 'history', icon: '📋' },
  { href: '/encyclopedia', labelKey: 'guides', icon: '📚' },
  { href: '/about', labelKey: 'about', icon: 'ℹ️' },
  { href: '/contact', labelKey: 'contact', icon: '📬' },
]

export default function MobileDashboardNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  return (
    <div className="relative z-50 lg:hidden" ref={navRef}>
      <button 
        onClick={() => setOpen(!open)} 
        className="p-2 -mr-2 text-[#1a6b3c] hover:bg-[#1a6b3c]/5 rounded-lg transition-colors"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-64 bg-[#faf8f4]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-stone-200/60 p-3 space-y-1 animate-fade-in-up duration-200">
          {SIDEBAR_LINKS.map(link => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative',
                  isActive
                    ? 'bg-[#1a6b3c]/8 text-[#1a6b3c] font-bold border-l-[3px] border-[#1a6b3c]'
                    : 'text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5'
                )}
              >
                <span className="text-base">{link.icon}</span>
                {t(link.labelKey)}
                {isActive && (
                  <span className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#d4a853]"></span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
