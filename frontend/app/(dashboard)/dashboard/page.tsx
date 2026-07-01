'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate, getCropEmoji } from '@/lib/utils'
import type { Prediction } from '@/types'
import DashboardCharts from '@/components/charts/DashboardCharts'
import { getCropById } from '@/data/crops'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

export default function DashboardPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    setCurrentDate(new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    }).format(new Date()))

    const supabase = createClient()
    
    // Fetch User & Predictions
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: preds } = await supabase
          .from('predictions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)
        setPredictions(preds || [])
      }
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#1a6b3c] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#6b7280] text-sm font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  const allPredictions: Prediction[] = predictions || []
  const totalPredictions = allPredictions.length
  const recentPredictions = allPredictions.slice(0, 5)

  // Compute stats
  const cropFreq = allPredictions.reduce((acc, p) => {
    acc[p.predicted_crop] = (acc[p.predicted_crop] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const mostRecommended = Object.entries(cropFreq).sort((a, b) => b[1] - a[1])[0]
  const uniqueCrops = Object.keys(cropFreq).length

  const profile = user?.user_metadata
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Farmer'

  const statsCards = [
    {
      label: t('totalPredictions'),
      value: totalPredictions.toString(),
      icon: '📊',
      iconBg: 'bg-[#1a6b3c]/10 text-[#1a6b3c]'
    },
    {
      label: t('uniqueCrops'),
      value: uniqueCrops.toString(),
      icon: '🌱',
      iconBg: 'bg-[#c8965c]/10 text-[#c8965c]'
    },
    {
      label: t('mostRecommended'),
      value: mostRecommended ? mostRecommended[0] : '—',
      icon: getCropEmoji(mostRecommended?.[0] || ''),
      iconBg: 'bg-[#8b4513]/10 text-[#8b4513]'
    },
    {
      label: t('lastPrediction'),
      value: recentPredictions[0] ? formatDate(recentPredictions[0].created_at).split(',')[0] : '—',
      icon: '📅',
      iconBg: 'bg-[#d4a853]/10 text-[#d4a853]'
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a]">
            {t('goodDay')}, {displayName}! 👋
          </h1>
          {currentDate && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#d4a853] text-lg">📅</span>
              <span className="text-[#1a1a1a] font-bold">{currentDate}</span>
            </div>
          )}
          <p className="text-[#6b7280] mt-1 font-medium">{t('overview')}</p>
        </div>
        <Link
          href="/recommend"
          id="dashboard-predict-btn"
          className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold"
        >
          🌾 {t('newPrediction')}
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 delay-100">
        {statsCards.map((card, i) => (
          <div key={i} className="premium-card elevated-card p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[#6b7280] text-xs font-semibold uppercase tracking-wider">{card.label}</p>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${card.iconBg}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1a1a] capitalize truncate">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {allPredictions.length > 0 && (
        <div className="delay-200">
          <DashboardCharts predictions={allPredictions} cropFreq={cropFreq} />
        </div>
      )}

      {/* Recent Predictions */}
      <div className="premium-card overflow-hidden delay-300">
        <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1a1a1a]">{t('recentPredictions')}</h2>
          <Link href="/history" className="text-[#1a6b3c] hover:underline text-sm font-semibold transition-colors">
            {t('viewAll')}
          </Link>
        </div>

        {recentPredictions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4 text-[#c8965c] animate-pulse-gold">🌱</div>
            <h3 className="text-[#1a1a1a] font-bold mb-2">{t('noPredictions')}</h3>
            <p className="text-[#6b7280] text-sm font-medium mb-6">{t('overview')}</p>
            <Link href="/recommend" className="gradient-btn px-6 py-3 rounded-xl transition-all inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold">
              {t('newPrediction')}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-stone-200/60">
            {recentPredictions.map((pred) => {
              const cropInfo = getCropById(pred.predicted_crop)
              const cropColor = cropInfo?.color || '#1a6b3c'
              return (
                <div key={pred.id} 
                     className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors border-l-4"
                     style={{ borderLeftColor: cropColor }}>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                      style={{
                        backgroundColor: `${cropColor}1a`, // 10% opacity
                        borderColor: `${cropColor}33`      // 20% opacity
                      }}
                    >
                      {getCropEmoji(pred.predicted_crop)}
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] font-semibold capitalize">{pred.predicted_crop}</p>
                      <p className="text-[#6b7280] text-xs font-medium">{formatDate(pred.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {pred.confidence && (
                      <span className="text-[#1a6b3c] text-sm font-mono font-bold">{pred.confidence.toFixed(1)}%</span>
                    )}
                    <span className="text-xs text-[#6b7280] hidden sm:block font-medium">
                      N:{pred.nitrogen} P:{pred.phosphorus} K:{pred.potassium}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
