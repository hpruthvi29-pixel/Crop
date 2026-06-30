'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function HomePage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [n, setN] = useState(120)
  const [p, setP] = useState(45)
  const [k, setK] = useState(80)
  const [location, setLocation] = useState('')

  const handleQuickReport = () => {
    sessionStorage.setItem('quick_npk', JSON.stringify({ nitrogen: n, phosphorus: p, potassium: k }))
    router.push('/recommend')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full min-h-[650px] lg:h-[750px] flex items-center overflow-hidden pt-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Aerial view of a modern agricultural farm at golden hour" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQGshdArxTYZSnhE0vOl2BZGCmoivy0NZBFMaOzIptszn2a77Y-XaceoynuqbOmytBwo29UZEEMNP-hYxpiLgkHzf3-OBFCWe1L-s-wyIbDdA3RH5jM-XJtQ0xy9OCP9jfKaVmRGODZoAjy5cxr0hZL9i8AO1O_G-aW4MdPxU9akgeBSi7pU3RKyl9HzRpRw47UjmXMgmvGeYKFY2mw6gpOwy_K83PigQBSMsQMumFflcdMwhjuCV8QOfiT9d6Sn14QUpP9u2_bLc"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10 lg:to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2">{t('precisionPlatform')}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-on-surface leading-tight mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-md sm:text-lg text-on-surface-variant mb-8 max-w-lg leading-relaxed">
                {t('heroDesc')}
              </p>
              
              {/* Location Input (Simulated Autocomplete) */}
              <div className="relative max-w-md shadow-sm rounded-xl overflow-hidden border border-outline-variant bg-white">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">📍</span>
                <input 
                  className="w-full h-12 pl-10 pr-24 bg-white text-on-surface placeholder-on-surface-variant/50 focus:outline-none text-xs" 
                  placeholder={t('enterLocation')} 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button 
                  onClick={() => router.push('/recommend')}
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#a3f69c] hover:bg-[#88d982] text-black px-4 rounded-lg font-bold text-xs transition-colors flex items-center gap-1"
                >
                  {t('analyzeBtn')} ➔
                </button>
              </div>
            </div>

            {/* Quick N-P-K Input Card (Bento Style) */}
            <div className="lg:col-span-5 lg:col-start-8 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-outline-variant shadow-lg w-full max-w-md border-t-4 border-t-primary">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-extrabold text-on-surface">{t('quickSoilProfile')}</h3>
                  <span className="text-primary bg-primary-container/20 p-2 rounded-full text-lg">🧪</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6">{t('soilProfileDesc')}</p>
                
                <div className="space-y-5">
                  {/* Nitrogen */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-on-surface flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]"></span> {t('nitrogenLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#2e7d32]">{n} kg/ha</span>
                    </div>
                    <input 
                      className="w-full appearance-none bg-transparent custom-slider slider-n cursor-pointer" 
                      max="140" 
                      min="0" 
                      type="range" 
                      value={n}
                      onChange={(e) => setN(parseInt(e.target.value))}
                    />
                  </div>
                  
                  {/* Phosphorus */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-on-surface flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffb957]"></span> {t('phosphorusLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#774c00]">{p} kg/ha</span>
                    </div>
                    <input 
                      className="w-full appearance-none bg-transparent custom-slider slider-p cursor-pointer" 
                      max="145" 
                      min="0" 
                      type="range" 
                      value={p}
                      onChange={(e) => setP(parseInt(e.target.value))}
                    />
                  </div>
                  
                  {/* Potassium */}
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-semibold text-on-surface flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#005db7]"></span> {t('potassiumLabel')}
                      </label>
                      <span className="text-xs font-bold text-[#005db7]">{k} kg/ha</span>
                    </div>
                    <input 
                      className="w-full appearance-none bg-transparent custom-slider slider-k cursor-pointer" 
                      max="205" 
                      min="0" 
                      type="range" 
                      value={k}
                      onChange={(e) => setK(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={handleQuickReport}
                  className="w-full h-12 mt-6 border border-outline text-primary font-bold text-xs rounded-lg hover:bg-surface transition-colors flex justify-center items-center gap-2"
                >
                  {t('generateReport')} 📊
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="border-y border-outline-variant/30 bg-surface-container-low py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider text-center md:text-left">{t('trustedLeaders')}</span>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-1.5 font-extrabold text-sm text-on-surface">🌾 GlobalAg</div>
              <div className="flex items-center gap-1.5 font-extrabold text-sm text-on-surface">🔬 SoilTech Inst.</div>
              <div className="flex items-center gap-1.5 font-extrabold text-sm text-on-surface">🌿 GreenYield</div>
              <div className="flex items-center gap-1.5 font-extrabold text-sm text-on-surface">🛰️ AeroFarms Data</div>
            </div>
          </div>
        </section>

        {/* Feature Highlights (Bento Grid Layout) */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-on-surface mb-2">{t('comprehensiveSuite')}</h2>
            <p className="text-sm text-on-surface-variant max-w-xl mx-auto">{t('suiteDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Soil Lab Card */}
            <div className="bg-white rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="h-44 bg-surface relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Soil analysis diagnostics" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCanT-5aqDQhp2WIcYmdn2yRX82JYcmFxd2AKrP-tVE3n9VXOeSu2_ldNseqMwH-Kap8R2T8D1j4vqEn6PGc_r6pIU2cqDC_CQYlb4hTTthLvr0qrVkQhnPzrdtHExlpAJxKFwqc9X3LtowXXrgiLMwC8SXX1azhzykc01Cr7rJtJdDg1O_qF0UocIQ4GHTsvsj3ysAV_ecmpVnAvzFacoQEy44SL-c5exT5ls0H9A-qpH5uRSuiVwHJEFAX4fdxgtbJ-6sY-4dq_I"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  🧪 {t('soilLab')}
                </div>
              </div>
              <div className="p-5 text-left">
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">Advanced spectrometric analysis mapping and nutrient depletion forecasting.</p>
                <Link 
                  href="/recommend" 
                  className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  {t('exploreFeatures')} ➔
                </Link>
              </div>
            </div>

            {/* Market Intel Card */}
            <div className="bg-white rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="h-44 bg-surface relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Market intelligence analytics" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEUiRK5_d1YMa2wisFPi-0ViRp7nXR6UYOp0VDkNh_39Qwk4hwAeF7sRphcrqcMNAm9cGbBONE-l_Wc_DqzWgwCx2dyxp75lNMGjvjgqJG6A_Xrb3A-qAh4FMLIqb0qsz2Jcwm-0OUYBqRUJ6Eldd15Ev9Dq9sOOorORgekGOI-Uj-UZiU2byvBOi9zDGc8eYQ1pUpR7wpHPx8KuE960wESESVkncCfyzNkxEmZZZetCrrUSw9rHW2kLbup0ba3_Hyzu2cwyuuPTg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  📈 Market Intel
                </div>
              </div>
              <div className="p-5 text-left">
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">Real-time commodity pricing, yield predictions, and supply chain logistics.</p>
                <Link 
                  href="/dashboard" 
                  className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  {t('viewMarkets')} ➔
                </Link>
              </div>
            </div>

            {/* Disease ID Card */}
            <div className="bg-white rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="h-44 bg-surface relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Leaf scanning diagnostic scan" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmjVdKjwjmSom0fzLPQexOuIM-qN8Yz1p20nR_BFkNM-Oi9VJBgIN-E8Lp61RJyeP1b87JuRKPe3vqmXRmcUpfcTQeY27IARSkK7k-NiItZp1UvvrWPMrxvILX_l9Ksuvg78Q_Q66B-AeoA2wnoHCuQpYLmCF__IkSVIbCqIwJnaj15olix-FLeV9yf7lV71qVAgNEC7UcJ1kgNYIQV9HSXtZmuBlHQ-oOuriuYrY7eaQaXLuWd0zCAiAhejcpGa6x4SSx0fP0uv8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2 text-md">
                  🍃 Disease ID
                </div>
              </div>
              <div className="p-5 text-left">
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">AI-powered visual diagnostics for early detection of blight, rust, and pests.</p>
                <Link 
                  href="/recommend" 
                  className="text-primary font-bold text-xs uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  {t('tryScanner')} ➔
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
