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
    Cereal: 'border-t-yellow-400 text-yellow-700 bg-yellow-50/10',
    Pulse: 'border-t-green-500 text-green-700 bg-green-50/10',
    Fruit: 'border-t-pink-500 text-pink-700 bg-pink-50/10',
    'Cash Crop': 'border-t-purple-500 text-purple-700 bg-purple-50/10',
    Beverage: 'border-t-orange-500 text-orange-700 bg-orange-50/10',
  }

  const catStyle = CATEGORY_COLORS[crop.category] || 'border-t-primary text-primary bg-surface'

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
    <div className="min-h-screen bg-[#f3faff] flex flex-col font-sans text-on-surface">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back */}
          <Link href="/encyclopedia" className="inline-flex items-center gap-2 text-on-surface-variant/70 hover:text-primary transition-colors text-xs font-bold">
            ← {t('backToHome')}
          </Link>

          {/* Hero */}
          <div className={`bg-white rounded-2xl border-t-4 border-x border-b border-outline-variant/40 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 ${catStyle.split(' ').slice(-1)[0]}`}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shrink-0">
              🌾
            </div>
            <div className="flex-grow text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">{crop.category}</span>
              <h1 className="text-3xl font-black text-on-surface mt-1 mb-1">{crop.name}</h1>
              <p className="text-on-surface-variant/60 italic text-md">{crop.scientificName}</p>
              <p className="text-on-surface-variant text-sm leading-relaxed mt-4 max-w-2xl">{crop.description}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {stats.map(item => (
              <div key={item.labelKey} className="bg-white rounded-xl border border-outline-variant/40 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.icon}</span>
                  <p className="text-on-surface-variant/70 text-[10px] font-bold uppercase tracking-wider">{t(item.labelKey)}</p>
                </div>
                <p className="text-on-surface font-extrabold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-primary/30 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h3 className="text-on-surface font-extrabold text-md">Is {crop.name} right for your farm?</h3>
              <p className="text-on-surface-variant text-xs mt-1">Check with our AI model using your actual soil and climate data</p>
            </div>
            <Link
              href="/recommend"
              className="px-5 py-3 rounded-lg bg-[#a3f69c] text-black font-bold hover:bg-[#88d982] transition-all shadow-sm text-xs whitespace-nowrap"
            >
              {t('getRecommendation')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
