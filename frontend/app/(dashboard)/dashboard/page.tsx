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

  useEffect(() => {
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
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant text-sm font-semibold">Loading Dashboard...</p>
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

  const mostRecommendedCropInfo = mostRecommended ? getCropById(mostRecommended[0]) : null
  const mostRecommendedColor = mostRecommendedCropInfo?.color || '#a855f7' // Fallback purple

  const statsCards = [
    {
      label: t('totalPredictions'),
      value: totalPredictions.toString(),
      icon: '📊',
      style: {
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.05))',
        borderColor: 'rgba(34, 197, 94, 0.2)'
      }
    },
    {
      label: t('uniqueCrops'),
      value: uniqueCrops.toString(),
      icon: '🌱',
      style: {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.05))',
        borderColor: 'rgba(59, 130, 246, 0.2)'
      }
    },
    {
      label: t('mostRecommended'),
      value: mostRecommended ? mostRecommended[0] : '—',
      icon: getCropEmoji(mostRecommended?.[0] || ''),
      style: {
        background: `linear-gradient(135deg, ${mostRecommendedColor}33, ${mostRecommendedColor}0d)`,
        borderColor: `${mostRecommendedColor}33`
      }
    },
    {
      label: t('lastPrediction'),
      value: recentPredictions[0] ? formatDate(recentPredictions[0].created_at).split(',')[0] : '—',
      icon: '📅',
      style: {
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.05))',
        borderColor: 'rgba(249, 115, 22, 0.2)'
      }
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-on-surface">
            {t('goodDay')}, {displayName}! 👋
          </h1>
          <p className="text-on-surface-variant mt-1">{t('overview')}</p>
        </div>
        <Link
          href="/recommend"
          id="dashboard-predict-btn"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#a3f69c] text-black font-bold hover:bg-[#88d982] transition-all shadow-sm"
        >
          🌾 {t('newPrediction')}
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm" style={card.style}>
            <div className="flex items-start justify-between mb-3">
              <p className="text-on-surface-variant text-sm font-semibold">{card.label}</p>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="text-2xl font-black text-on-surface capitalize truncate">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      {allPredictions.length > 0 && (
        <DashboardCharts predictions={allPredictions} cropFreq={cropFreq} />
      )}

      {/* Recent Predictions */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm">
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
          <h2 className="text-xl font-bold text-on-surface">{t('recentPredictions')}</h2>
          <Link href="/history" className="text-primary hover:underline text-sm font-semibold transition-colors">
            {t('viewAll')}
          </Link>
        </div>

        {recentPredictions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-on-surface font-bold mb-2">{t('noPredictions')}</h3>
            <p className="text-on-surface-variant text-sm mb-6">{t('overview')}</p>
            <Link href="/recommend" className="px-6 py-3 rounded-xl bg-[#a3f69c] text-black font-bold hover:bg-[#88d982] transition-all inline-block shadow-sm">
              {t('newPrediction')}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {recentPredictions.map((pred) => {
              const cropInfo = getCropById(pred.predicted_crop)
              const cropColor = cropInfo?.color || '#22c55e'
              return (
                <div key={pred.id} className="p-4 flex items-center justify-between hover:bg-surface-container-low/30 transition-colors">
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
                      <p className="text-on-surface font-semibold capitalize">{pred.predicted_crop}</p>
                      <p className="text-on-surface-variant/60 text-xs">{formatDate(pred.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {pred.confidence && (
                      <span className="text-primary text-sm font-mono font-bold">{pred.confidence.toFixed(1)}%</span>
                    )}
                    <span className="text-xs text-on-surface-variant/70 hidden sm:block font-medium">
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
