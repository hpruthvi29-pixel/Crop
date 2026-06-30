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
        className="p-2 -mr-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-64 bg-white border border-outline-variant/30 shadow-2xl rounded-2xl p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {SIDEBAR_LINKS.map(link => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary-container/20 text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                )}
              >
                <span className="text-base">{link.icon}</span>
                {t(link.labelKey)}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
