'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

interface CropDetailClientProps {
  crop: {
    id: string
    name: string
    scientificName: string
    category: string
    description: string
    idealNitrogen: string
    idealPhosphorus: string
    idealPotassium: string
    temperatureRange: string
    humidityRange: string
    phRange: string
    rainfallRange: string
    season: string
    harvestDuration: string
  }
}

export default function CropDetailClient({ crop }: CropDetailClientProps) {
  const { t } = useLanguage()

  const CATEGORY_COLORS: Record<string, string> = {
    Cereal: 'bg-[#d4a853]/10 text-[#d4a853] border-[#d4a853]/30',
    Pulse: 'bg-[#1a6b3c]/10 text-[#1a6b3c] border-[#1a6b3c]/30',
    Fruit: 'bg-[#c8965c]/10 text-[#c8965c] border-[#c8965c]/30',
    'Cash Crop': 'bg-[#8b4513]/10 text-[#8b4513] border-[#8b4513]/30',
    Beverage: 'bg-[#2d8f5e]/10 text-[#2d8f5e] border-[#2d8f5e]/30',
  }

  const catStyle = CATEGORY_COLORS[crop.category] || 'bg-[#1a6b3c]/10 text-[#1a6b3c] border-stone-200'

  const stats = [
    { labelKey: 'idealN', value: crop.idealNitrogen, icon: '🧪' },
    { labelKey: 'idealP', value: crop.idealPhosphorus, icon: '💎' },
    { labelKey: 'idealK', value: crop.idealPotassium, icon: '⚡' },
    { labelKey: 'idealTemp', value: crop.temperatureRange, icon: '🌡️' },
    { labelKey: 'idealHum', value: crop.humidityRange, icon: '💧' },
    { labelKey: 'idealPh', value: crop.phRange, icon: '🔬' },
    { labelKey: 'idealRain', value: crop.rainfallRange, icon: '🌧️' },
    { labelKey: 'growingSeason', value: crop.season, icon: '📅' },
    { labelKey: 'harvestDuration', value: crop.harvestDuration, icon: '⏱️' },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-[#1a1a1a]">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Back */}
          <Link href="/encyclopedia" className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#1a6b3c] transition-colors text-sm font-bold bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm">
            ← {t('backToHome')}
          </Link>

          {/* Hero */}
          <div className="premium-card p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e]"></div>
            
            <div className="w-20 h-20 rounded-2xl bg-[#faf8f4] border border-stone-200 shadow-inner flex items-center justify-center text-5xl shrink-0 group-hover:scale-110 transition-transform">
              🌾
            </div>
            
            <div className="flex-grow text-left">
              <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${catStyle}`}>
                {crop.category}
              </span>
              <h1 className="text-4xl font-extrabold text-[#1a1a1a] mt-4 mb-1">{crop.name}</h1>
              <p className="text-[#8b4513] italic text-md font-medium">{crop.scientificName}</p>
              <p className="text-[#6b7280] text-sm leading-relaxed mt-5 max-w-2xl font-medium">{crop.description}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {stats.map(item => (
              <div key={item.labelKey} className="bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#c8965c]/40 transition-all group">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <p className="text-[#6b7280] text-[10px] font-bold uppercase tracking-wider">{t(item.labelKey)}</p>
                </div>
                <p className="text-[#1a1a1a] font-extrabold text-sm ml-8">{item.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="premium-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#c8965c]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="text-left relative z-10">
              <h3 className="text-[#1a1a1a] font-extrabold text-lg">Is {crop.name} right for your farm?</h3>
              <p className="text-[#6b7280] text-sm mt-1 font-medium">Check with our AI model using your actual soil and climate data</p>
            </div>
            <Link
              href="/recommend"
              className="gradient-btn px-6 py-3.5 whitespace-nowrap text-sm flex items-center gap-2 relative z-10"
            >
              {t('getRecommendation')} →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
