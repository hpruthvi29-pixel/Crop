'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#faf8f4] flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #c5bfb3 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a6b3c]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d4a853]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-3/4 left-2/3 w-48 h-48 bg-[#1a6b3c]/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-5s' }} />

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a6b3c] to-[#2d8f5e] flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8c.7-1 1-2.2 1-3.5C18 2.5 16.6 1 15 1c-1.3 0-2.4.8-3 2-0.6-1.2-1.7-2-3-2C7.4 1 6 2.5 6 4.5 6 5.8 6.3 7 7 8" />
                <path d="M12 22V10" />
                <path d="M7 8c-1.4 0-3 1-3 3.5 0 3 2.5 5.5 8 10.5 5.5-5 8-7.5 8-10.5C20 9 18.4 8 17 8H7z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-[#1a6b3c] tracking-tight">AgriPrecise</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a] mt-6 mb-2">{t('welcomeBack')}</h1>
          <p className="text-xs text-[#6b7280]">{t('welcomeBackDesc')}</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-stone-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-[#dc4a3f]/20 text-[#dc4a3f] text-xs flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-2">{t('emailLabel')}</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/40 focus:outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]/20 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-2">{t('passwordLabel')}</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/40 focus:outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]/20 transition-all text-sm"
              />
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs font-semibold text-[#c8965c] hover:text-[#d4a853] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : t('signInBtn')}
            </button>
          </form>

          <p className="text-center text-[#6b7280] text-xs mt-6">
            {t('dontHaveAccount')}{' '}
            <Link href="/register" className="text-[#1a6b3c] font-bold hover:underline transition-colors">
              {t('createAccount')}
            </Link>
          </p>
        </div>

        <p className="text-center text-[#6b7280]/70 text-xs mt-6">
          <Link href="/" className="hover:underline hover:text-[#1a6b3c] transition-colors">{t('backToHome')}</Link>
        </p>
      </div>
    </div>
  )
}
