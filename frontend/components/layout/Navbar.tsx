'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { LANGUAGES, type Language } from '@/data/translations'

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/encyclopedia', labelKey: 'crops' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Single ref for the language dropdown container (used for both desktop + mobile)
  const langContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langContainerRef.current && !langContainerRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    if (langOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [langOpen])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleLanguageChange = (code: Language) => {
    setLanguage(code)
    setLangOpen(false)
  }

  // Language dropdown (reused for both desktop and mobile)
  const LangDropdown = () => (
    <div className="absolute right-0 mt-2 w-52 bg-white border border-outline-variant/50 rounded-xl shadow-xl py-1.5 z-[9999] animate-in fade-in slide-in-from-top-2 duration-150">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onMouseDown={(e) => {
            e.preventDefault() // prevent blur before click
            handleLanguageChange(lang.code)
          }}
          className={cn(
            'w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between gap-2 hover:bg-primary/5',
            language === lang.code
              ? 'text-primary bg-primary/8'
              : 'text-on-surface-variant'
          )}
        >
          <span>{lang.label}</span>
          {language === lang.code && (
            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
          )}
        </button>
      ))}
    </div>
  )

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-outline-variant/30' : 'bg-white/50 backdrop-blur-sm'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-lg text-white">🌱</span>
            </div>
            <span className="font-extrabold text-primary text-xl tracking-tight">
              AgriPrecise
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-primary border-b-2 border-primary rounded-none font-bold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              )
            })}
          </div>

          {/* Desktop: Auth + Language Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector — desktop */}
            <div className="relative" ref={langContainerRef}>
              <button
                id="lang-selector-btn"
                onClick={() => setLangOpen(o => !o)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-colors text-on-surface-variant border bg-white text-base',
                  langOpen
                    ? 'border-primary/50 bg-primary/5 text-primary'
                    : 'border-outline-variant/20 hover:bg-surface-container hover:border-primary/30'
                )}
                title="Select Language"
              >
                🌐
              </button>
              {langOpen && <LangDropdown />}
            </div>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  href="/recommend"
                  className="px-4 py-2 rounded-lg text-sm font-bold bg-[#a3f69c] text-black hover:bg-[#88d982] transition-all shadow-sm flex items-center gap-1"
                >
                  🌾 {t('soilLab')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
                >
                  {t('signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-bold bg-[#a3f69c] text-black hover:bg-[#88d982] transition-all shadow-sm"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Button — mobile (shares the same langContainerRef) */}
            <div className="relative" ref={langContainerRef}>
              <button
                onClick={() => setLangOpen(o => !o)}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center transition-colors text-sm border bg-white',
                  langOpen
                    ? 'border-primary/50 bg-primary/5 text-primary'
                    : 'border-outline-variant/20 text-on-surface-variant'
                )}
              >
                🌐
              </button>
              {langOpen && <LangDropdown />}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-on-surface-variant hover:text-primary"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl mb-4 p-4 border border-outline-variant/30 shadow-lg">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all',
                    isActive
                      ? 'bg-surface-container text-primary font-bold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              )
            })}
            <div className="border-t border-outline-variant/30 mt-3 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low">{t('dashboard')}</Link>
                  <Link href="/recommend" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-bold bg-[#a3f69c] text-black text-center">🌾 {t('soilLab')}</Link>
                  <button onClick={handleSignOut} className="px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low text-left">{t('signOut')}</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low">{t('login')}</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-bold bg-[#a3f69c] text-black text-center">{t('register')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
