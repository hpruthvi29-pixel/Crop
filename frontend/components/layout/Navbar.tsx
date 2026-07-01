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
    <div className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl border border-stone-200/60 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-1.5 z-[9999] animate-fade-in">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onMouseDown={(e) => {
            e.preventDefault() // prevent blur before click
            handleLanguageChange(lang.code)
          }}
          className={cn(
            'w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between gap-2 hover:bg-[#1a6b3c]/5',
            language === lang.code
              ? 'text-[#1a6b3c] bg-[#1a6b3c]/8'
              : 'text-[#6b7280]'
          )}
        >
          <span>{lang.label}</span>
          {language === lang.code && (
            <span className="w-5 h-5 rounded-full bg-[#d4a853] text-white flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
          )}
        </button>
      ))}
    </div>
  )

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      scrolled
        ? 'bg-[#faf8f4]/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-stone-200/60'
        : 'bg-transparent border-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a6b3c] to-[#2d8f5e] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 6-2 8-6 2-4 3-8 3-8s-3 1-5 2z" />
                <path d="M10.5 9.5c1.5-2 3.5-3.5 6.5-4.5 0 0-.5 2-1.5 4" opacity="0.5" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight gradient-text">
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
                    'relative px-4 py-2 text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'text-[#1a6b3c] font-bold'
                      : 'text-stone-600 hover:text-[#1a6b3c]'
                  )}
                >
                  {t(link.labelKey)}
                  {/* Active bottom border */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1a6b3c] rounded-full" />
                  )}
                  {/* Hover underline effect */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1a6b3c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
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
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all text-base border',
                  langOpen
                    ? 'border-[#1a6b3c]/50 bg-[#1a6b3c]/5 text-[#1a6b3c]'
                    : 'border-stone-200/60 bg-white/80 text-stone-600 hover:bg-[#faf8f4] hover:border-[#1a6b3c]/30'
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] transition-all"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  href="/recommend"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-1.5"
                >
                  🌾 {t('soilLab')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] transition-all"
                >
                  {t('signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] transition-all"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
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
                  'w-9 h-9 rounded-full flex items-center justify-center transition-all text-sm border',
                  langOpen
                    ? 'border-[#1a6b3c]/50 bg-[#1a6b3c]/5 text-[#1a6b3c]'
                    : 'border-stone-200/60 bg-white/80 text-stone-600'
                )}
              >
                🌐
              </button>
              {langOpen && <LangDropdown />}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-stone-600 hover:text-[#1a6b3c] transition-colors"
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
          <div className="md:hidden bg-[#faf8f4]/98 backdrop-blur-xl rounded-2xl mb-4 p-4 border border-stone-200/60 shadow-xl animate-fade-in-up">
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
                      ? 'bg-[#1a6b3c]/8 text-[#1a6b3c] font-bold'
                      : 'text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              )
            })}
            <div className="border-t border-stone-200/60 mt-3 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 transition-all">{t('dashboard')}</Link>
                  <Link href="/recommend" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white text-center shadow-md">{t('soilLab')}</Link>
                  <button onClick={handleSignOut} className="px-4 py-3 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 text-left transition-all">{t('signOut')}</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 transition-all">{t('login')}</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white text-center shadow-md">{t('register')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
