'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/context/LanguageContext'

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [n, setN] = useState(120)
  const [p, setP] = useState(45)
  const [k, setK] = useState(80)
  const [location, setLocation] = useState('')

  const stat1 = useCountUp(10000)
  const stat2 = useCountUp(22)
  const stat3 = useCountUp(98)

  const handleQuickReport = () => {
    sessionStorage.setItem('quick_npk', JSON.stringify({ nitrogen: n, phosphorus: p, potassium: k }))
    router.push('/recommend')
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-[#1a1a1a]">
      <Navbar />

      <main className="flex-grow">
        {/* ═══════════════ Hero Section ═══════════════ */}
        <section className="relative w-full min-h-[650px] lg:h-[780px] flex items-center overflow-hidden pt-16">
          {/* Background Image with Warm Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              className="w-full h-full object-cover"
              alt="Aerial view of a modern agricultural farm at golden hour"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQGshdArxTYZSnhE0vOl2BZGCmoivy0NZBFMaOzIptszn2a77Y-XaceoynuqbOmytBwo29UZEEMNP-hYxpiLgkHzf3-OBFCWe1L-s-wyIbDdA3RH5jM-XJtQ0xy9OCP9jfKaVmRGODZoAjy5cxr0hZL9i8AO1O_G-aW4MdPxU9akgeBSi7pU3RKyl9HzRpRw47UjmXMgmvGeYKFY2mw6gpOwy_K83PigQBSMsQMumFflcdMwhjuCV8QOfiT9d6Sn14QUpP9u2_bLc"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f4]/98 via-[#faf8f4]/85 to-[#faf8f4]/20 lg:to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 text-[#8b4513] text-xs font-semibold tracking-wide mb-4 w-fit animate-fade-in-up">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-pulse"></span>
                {t('precisionPlatform')}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up delay-100">
                <span className="gradient-text">{t('heroTitle')}</span>
              </h1>
              <p className="text-base sm:text-lg text-[#6b7280] mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200">
                {t('heroDesc')}
              </p>

              {/* Location Input — Premium */}
              <div className="relative max-w-md rounded-xl overflow-hidden border border-stone-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-fade-in-up delay-300">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a6b3c] text-sm">📍</span>
                <input
                  className="w-full h-12 pl-10 pr-28 bg-white text-[#1a1a1a] placeholder-stone-400 focus:outline-none text-sm"
                  placeholder={t('enterLocation')}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  onClick={() => router.push('/recommend')}
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white px-5 rounded-lg font-bold text-xs transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1"
                >
                  {t('analyzeBtn')} →
                </button>
              </div>
            </div>

            {/* Quick N-P-K Input Card — Glassmorphism */}
            <div className="lg:col-span-5 lg:col-start-8 flex items-center justify-center animate-fade-in-up delay-400">
              <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-stone-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-md gold-border-top">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[#1a1a1a]">{t('quickSoilProfile')}</h3>
                  <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] p-2.5 rounded-xl text-lg">🧪</span>
                </div>
                <p className="text-xs text-[#6b7280] mb-6">{t('soilProfileDesc')}</p>

                <div className="space-y-5">
                  {/* Nitrogen */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1a6b3c]"></span> {t('nitrogenLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#1a6b3c]">{n} kg/ha</span>
                    </div>
                    <input
                      className="w-full appearance-none bg-transparent custom-slider slider-n cursor-pointer"
                      max="140" min="0" type="range"
                      value={n}
                      onChange={(e) => setN(parseInt(e.target.value))}
                    />
                  </div>

                  {/* Phosphorus */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c8965c]"></span> {t('phosphorusLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#c8965c]">{p} kg/ha</span>
                    </div>
                    <input
                      className="w-full appearance-none bg-transparent custom-slider slider-p cursor-pointer"
                      max="145" min="0" type="range"
                      value={p}
                      onChange={(e) => setP(parseInt(e.target.value))}
                    />
                  </div>

                  {/* Potassium */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8b4513]"></span> {t('potassiumLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#8b4513]">{k} kg/ha</span>
                    </div>
                    <input
                      className="w-full appearance-none bg-transparent custom-slider slider-k cursor-pointer"
                      max="205" min="0" type="range"
                      value={k}
                      onChange={(e) => setK(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <button
                  onClick={handleQuickReport}
                  className="w-full h-12 mt-6 bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
                >
                  {t('generateReport')} 📊
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ Stats Banner ═══════════════ */}
        <section className="py-10 bg-gradient-to-r from-[#0f3d1f] to-[#1a6b3c] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
            <div ref={stat1.ref} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-white">{stat1.count.toLocaleString()}+</span>
              <span className="text-sm text-white/60 mt-1 font-medium">Predictions Made</span>
            </div>
            <div ref={stat2.ref} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-[#d4a853]">{stat2.count}</span>
              <span className="text-sm text-white/60 mt-1 font-medium">Crop Varieties</span>
            </div>
            <div ref={stat3.ref} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-white">{stat3.count}%</span>
              <span className="text-sm text-white/60 mt-1 font-medium">Model Accuracy</span>
            </div>
          </div>
        </section>

        {/* ═══════════════ Trust Strip ═══════════════ */}
        <section className="border-y border-stone-200/60 bg-[#f5f1ea] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider text-center md:text-left">{t('trustedLeaders')}</span>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 hover:opacity-80 transition-all duration-500">
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#1a1a1a]">🌾 GlobalAg</div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#1a1a1a]">🔬 SoilTech Inst.</div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#1a1a1a]">🌿 GreenYield</div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#1a1a1a]">🛰️ AeroFarms Data</div>
            </div>
          </div>
        </section>

        {/* ═══════════════ Feature Highlights ═══════════════ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c8965c] mb-2 block">Features</span>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">{t('comprehensiveSuite')}</h2>
            <p className="text-sm text-[#6b7280] max-w-xl mx-auto">{t('suiteDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Soil Lab Card */}
            <div className="elevated-card overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Soil analysis diagnostics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCanT-5aqDQhp2WIcYmdn2yRX82JYcmFxd2AKrP-tVE3n9VXOeSu2_ldNseqMwH-Kap8R2T8D1j4vqEn6PGc_r6pIU2cqDC_CQYlb4hTTthLvr0qrVkQhnPzrdtHExlpAJxKFwqc9X3LtowXXrgiLMwC8SXX1azhzykc01Cr7rJtJdDg1O_qF0UocIQ4GHTsvsj3ysAV_ecmpVnAvzFacoQEy44SL-c5exT5ls0H9A-qpH5uRSuiVwHJEFAX4fdxgtbJ-6sY-4dq_I"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1f]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  🧪 {t('soilLab')}
                </div>
              </div>
              <div className="p-6 text-left">
                <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">Advanced spectrometric analysis mapping and nutrient depletion forecasting.</p>
                <Link
                  href="/recommend"
                  className="text-[#1a6b3c] font-bold text-xs uppercase tracking-wider hover:text-[#2d8f5e] flex items-center gap-1 transition-colors"
                >
                  {t('exploreFeatures')} →
                </Link>
              </div>
            </div>

            {/* Market Intel Card */}
            <div className="elevated-card overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Market intelligence analytics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEUiRK5_d1YMa2wisFPi-0ViRp7nXR6UYOp0VDkNh_39Qwk4hwAeF7sRphcrqcMNAm9cGbBONE-l_Wc_DqzWgwCx2dyxp75lNMGjvjgqJG6A_Xrb3A-qAh4FMLIqb0qsz2Jcwm-0OUYBqRUJ6Eldd15Ev9Dq9sOOorORgekGOI-Uj-UZiU2byvBOi9zDGc8eYQ1pUpR7wpHPx8KuE960wESESVkncCfyzNkxEmZZZetCrrUSw9rHW2kLbup0ba3_Hyzu2cwyuuPTg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1f]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  📈 Market Intel
                </div>
              </div>
              <div className="p-6 text-left">
                <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">Real-time commodity pricing, yield predictions, and supply chain logistics.</p>
                <Link
                  href="/dashboard"
                  className="text-[#1a6b3c] font-bold text-xs uppercase tracking-wider hover:text-[#2d8f5e] flex items-center gap-1 transition-colors"
                >
                  {t('viewMarkets')} →
                </Link>
              </div>
            </div>

            {/* Disease ID Card */}
            <div className="elevated-card overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Leaf scanning diagnostic scan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmjVdKjwjmSom0fzLPQexOuIM-qN8Yz1p20nR_BFkNM-Oi9VJBgIN-E8Lp61RJyeP1b87JuRKPe3vqmXRmcUpfcTQeY27IARSkK7k-NiItZp1UvvrWPMrxvILX_l9Ksuvg78Q_Q66B-AeoA2wnoHCuQpYLmCF__IkSVIbCqIwJnaj15olix-FLeV9yf7lV71qVAgNEC7UcJ1kgNYIQV9HSXtZmuBlHQ-oOuriuYrY7eaQaXLuWd0zCAiAhejcpGa6x4SSx0fP0uv8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1f]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  🍃 Disease ID
                </div>
              </div>
              <div className="p-6 text-left">
                <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">AI-powered visual diagnostics for early detection of blight, rust, and pests.</p>
                <Link
                  href="/recommend"
                  className="text-[#1a6b3c] font-bold text-xs uppercase tracking-wider hover:text-[#2d8f5e] flex items-center gap-1 transition-colors"
                >
                  {t('tryScanner')} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ Testimonials ═══════════════ */}
        <section className="py-16 bg-[#f5f1ea]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c8965c] mb-2 block">Testimonials</span>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Trusted by Farmers Across India</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Rajesh Kumar', location: 'Punjab', text: 'AgriPrecise helped me increase my wheat yield by 30%. The soil analysis was spot on!', rating: 5 },
                { name: 'Lakshmi Devi', location: 'Karnataka', text: 'I was unsure what to plant this season. The AI recommendation for ragi was perfect for my soil.', rating: 5 },
                { name: 'Mohammed Irfan', location: 'Tamil Nadu', text: 'The NPK analysis saved me money on fertilizers. I now only buy what my soil actually needs.', rating: 4 },
              ].map((review, i) => (
                <div key={i} className="premium-card p-6 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={j < review.rating ? 'text-[#d4a853]' : 'text-stone-300'}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-[#6b7280] leading-relaxed flex-1 italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-stone-200/60">
                    <p className="font-bold text-sm text-[#1a1a1a]">{review.name}</p>
                    <p className="text-xs text-[#6b7280]">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
