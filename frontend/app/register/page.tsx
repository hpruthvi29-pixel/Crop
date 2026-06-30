'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-outline-variant/40 shadow-md">
          <div className="text-6xl mb-6">📧</div>
          <h1 className="text-2xl font-black text-on-surface mb-4">Check your email!</h1>
          <p className="text-sm text-on-surface-variant mb-8">
            We&apos;ve sent a confirmation link to <span className="text-primary font-bold">{email}</span>. Please confirm your email to activate your account.
          </p>
          <Link 
            href="/login" 
            className="inline-block px-6 py-3 rounded-xl bg-[#a3f69c] text-black font-bold hover:bg-[#88d982] transition-all shadow-sm"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <span className="text-xl text-white">🌱</span>
            </div>
            <span className="text-2xl font-extrabold text-primary tracking-tight">AgriPrecise</span>
          </Link>
          <h1 className="text-2xl font-black text-on-surface mt-6 mb-2">{t('register')}</h1>
          <p className="text-xs text-on-surface-variant">Start getting AI crop recommendations for free</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-md">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-2">{t('fullNameLabel')}</label>
              <input
                id="register-name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder="Rajesh Kumar"
                className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-2">{t('emailLabel')}</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-2">{t('passwordLabel')}</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-2">{t('confirmPasswordLabel')}</label>
              <input
                id="register-confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#a3f69c] text-black font-bold text-sm hover:bg-[#88d982] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : t('createAccount')}
            </button>
          </form>

          <p className="text-center text-on-surface-variant text-xs mt-6">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-primary hover:underline font-bold transition-colors">{t('login')}</Link>
          </p>
        </div>
        <p className="text-center text-on-surface-variant/70 text-xs mt-6">
          <Link href="/" className="hover:underline transition-colors">{t('backToHome')}</Link>
        </p>
      </div>
    </div>
  )
}
