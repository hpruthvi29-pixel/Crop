'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCropEmoji } from '@/lib/utils'
import type { PredictionResult, PredictionInput } from '@/types'
import { getCropById } from '@/data/crops'
import { useLanguage } from '@/context/LanguageContext'

export default function ResultPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [result, setResult] = useState<PredictionResult & { input: PredictionInput } | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('predictionResult')
    if (!stored) { router.push('/recommend'); return }
    setResult(JSON.parse(stored))
  }, [router])

  const handlePDF = async () => {
    if (!result) return
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.setTextColor(13, 99, 27)
    doc.text('Smart Crop Recommendation Report', 20, 25)
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`Recommended Crop: ${result.crop_name}`, 20, 45)
    doc.text(`Confidence: ${result.confidence.toFixed(1)}%`, 20, 55)
    doc.setFontSize(12)
    doc.text('Input Parameters:', 20, 75)
    const inp = result.input
    const lines = [
      `Nitrogen: ${inp.nitrogen} kg/ha`,
      `Phosphorus: ${inp.phosphorus} kg/ha`,
      `Potassium: ${inp.potassium} kg/ha`,
      `Temperature: ${inp.temperature}°C`,
      `Humidity: ${inp.humidity}%`,
      `pH: ${inp.ph}`,
      `Rainfall: ${inp.rainfall} mm`,
    ]
    lines.forEach((l, i) => doc.text(l, 20, 85 + i * 8))
    doc.text('Recommendations:', 20, 155)
    const rec = result.recommendations
    const recLines = [
      `Season: ${rec.season}`,
      `Water: ${rec.water}`,
      `Soil: ${rec.soil}`,
      `Fertilizer: ${rec.fertilizer}`,
      `Harvest Duration: ${rec.harvest_duration}`,
    ]
    recLines.forEach((l, i) => doc.text(l, 20, 165 + i * 8))
    doc.text(`Description: ${rec.description}`, 20, 210, { maxWidth: 170 })
    doc.save(`crop_recommendation_${result.crop_name.toLowerCase()}.pdf`)
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading...</p>
        </div>
      </div>
    )
  }

  const { crop_name, confidence, recommendations, input } = result
  const cropInfo = getCropById(crop_name)

  const altCrops = [
    { name: 'Soybeans', match: '88%', desc: 'Requires slight pH adjustment. Strong current market demand.', width: 'w-[88%]', color: 'bg-secondary' },
    { name: 'Sorghum', match: '82%', desc: 'Excellent drought tolerance based on long-term climate forecast.', width: 'w-[82%]', color: 'bg-tertiary' },
    { name: 'Corn', match: '75%', desc: 'High nitrogen requirement. Significant fertilizer investment needed.', width: 'w-[75%]', color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">{t('analysisResults')}</span>
          <h1 className="text-3xl font-black text-on-surface mt-1">North Plot • Soil Sample #4892</h1>
        </div>
        <button 
          onClick={handlePDF}
          className="inline-flex items-center gap-2 bg-white text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/40 hover:bg-surface transition-all shadow-sm font-bold text-sm"
        >
          📥 {t('exportPdf')}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Match Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col relative group min-h-[350px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center h-full">
            <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-primary-container/10 text-primary px-3 py-1 rounded-full mb-4 text-xs font-bold">
                  <span>✨</span> {t('primaryRec')}
                </div>
                <h3 className="text-4xl font-black text-on-surface capitalize mb-1">{crop_name}</h3>
                <div className="text-2xl font-black text-primary mb-4">{confidence.toFixed(1)}% {t('matchScore')}</div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  {recommendations.description || `Current soil profile, historical climate data, and N-P-K balance indicate optimal conditions for a high-yield ${crop_name} crop this season.`}
                </p>
              </div>
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-[#a3f69c] text-black font-bold px-6 py-3 rounded-lg text-xs hover:bg-[#88d982] transition-all shadow-sm w-full md:w-auto text-center"
              >
                {t('adoptPlan')}
              </button>
            </div>
            
            <div className="w-full md:w-1/2 h-52 md:h-64 rounded-xl overflow-hidden relative shadow-inner border border-outline-variant/20">
              <img 
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" 
                alt={crop_name}
                src={cropInfo?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd_YwVbPHGhzo3ePYpinYqbd9M7_SEskeibfkvBu2GhGggVMnazqWt4tI_JzfxhyMGNRAZm2QxTzNMFP9N7SidE4lRBXwL8D2Fek0a1zZcI0cVAQ8sT4AJ8q9s_6G_MGFkzZWtiJtml4qClD-Z8AwhrC8jnnTKzjcVL6VLB5Rc_b27W3o6RIai-p7CCuRmp77prkDBtRDeCm2Blr-1y4IWfvyF7vTAda3E2XZbvHnYVFuV6jN8ZKCfk8S2YU2InFE8z2FwvzpJN7s'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="text-white text-xs font-bold backdrop-blur-md bg-black/20 px-2 py-1 rounded">
                  Est. Yield: {crop_name === 'rice' ? '4.2 tons/hectare' : '2.1 bales/acre'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Health Radar Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6 flex flex-col justify-between min-h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-extrabold text-on-surface">{t('soilHealth')}</h3>
            <span className="text-secondary text-sm" title="Optimal conditions">ℹ️</span>
          </div>
          
          {/* Custom Premium SVG Radar Chart */}
          <div className="flex-grow flex items-center justify-center relative min-h-[180px]">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d5ecf8" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#d5ecf8" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#d5ecf8" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#d5ecf8" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#d5ecf8" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#d5ecf8" strokeWidth="0.5" />
              <polygon points="50,22 78,35 68,68 32,68 22,35" fill="rgba(213, 236, 248, 0.4)" stroke="#bfcaba" strokeWidth="0.75" strokeDasharray="1,1" />
              <polygon points="50,18 82,42 62,72 38,62 25,28" fill="rgba(13, 99, 27, 0.2)" stroke="#0d631b" strokeWidth="1.5" />
              <text x="50" y="8" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#071e27">N</text>
              <text x="92" y="52" textAnchor="start" fontSize="4" fontWeight="bold" fill="#071e27">P</text>
              <text x="72" y="92" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#071e27">K</text>
              <text x="28" y="92" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#071e27">pH</text>
              <text x="8" y="52" textAnchor="end" fontSize="4" fontWeight="bold" fill="#071e27">Rain</text>
            </svg>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-surface p-2.5 rounded-xl border border-outline-variant/10">
              <div className="text-on-surface-variant/70 text-[10px] font-semibold uppercase">{t('phLabel')}</div>
              <div className="font-extrabold text-on-surface mt-0.5">{input.ph}</div>
            </div>
            <div className="bg-surface p-2.5 rounded-xl border border-outline-variant/10">
              <div className="text-on-surface-variant/70 text-[10px] font-semibold uppercase">{t('humidityLabel')}</div>
              <div className="font-extrabold text-secondary mt-0.5">{input.humidity}%</div>
            </div>
          </div>
        </div>

        {/* Fertilizer Schedule Timeline */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-md font-extrabold text-on-surface">{t('fertilizer')}</h3>
            <span className="text-lg">📅</span>
          </div>
          
          <div className="relative w-full py-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container -translate-y-1/2 z-0 rounded-full"></div>
            <div className="flex justify-between relative z-10 w-full px-4">
              <div className="flex flex-col items-center group">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mb-2 shadow-sm border-2 border-white transition-transform group-hover:scale-110 font-bold text-xs">✓</div>
                <div className="text-[10px] font-bold text-on-surface">Wk 1</div>
                <div className="text-[10px] text-on-surface-variant text-center mt-1">Pre-plant<br />N-P-K</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mb-2 shadow-sm border-2 border-white ring-4 ring-surface-container transition-transform group-hover:scale-110 font-bold text-xs">•</div>
                <div className="text-[10px] font-bold text-on-surface">Wk 4</div>
                <div className="text-[10px] text-primary font-bold text-center mt-1">Side-dress<br />Nitrogen</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center mb-2 shadow-sm border-2 border-white transition-transform group-hover:scale-110"></div>
                <div className="text-[10px] font-bold text-on-surface-variant">Wk 8</div>
                <div className="text-[10px] text-on-surface-variant text-center mt-1">Foliar<br />Potassium</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center mb-2 shadow-sm border-2 border-white transition-transform group-hover:scale-110"></div>
                <div className="text-[10px] font-bold text-on-surface-variant">Wk 12</div>
                <div className="text-[10px] text-on-surface-variant text-center mt-1">Late<br />Season</div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Intel Mini Widget */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-extrabold text-on-surface">Market Intel</h3>
            <span className="text-lg">📈</span>
          </div>
          
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-center border-b border-surface-container pb-2">
              <div className="text-sm font-semibold text-on-surface capitalize">{crop_name} (ZCE)</div>
              <div className="text-right">
                <div className="text-sm font-bold text-on-surface">$84.20</div>
                <div className="text-[10px] font-bold text-primary flex items-center justify-end gap-0.5">▲ 1.2%</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold text-on-surface">Soybeans (CBOT)</div>
              <div className="text-right">
                <div className="text-sm font-bold text-on-surface">$1,180.50</div>
                <div className="text-[10px] font-bold text-red-600 flex items-center justify-end gap-0.5">▼ 0.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternatives Carousel */}
        <div className="lg:col-span-12 mt-4">
          <h3 className="text-md font-extrabold text-on-surface mb-4">Alternative Crop Matches</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {altCrops.map((alt, idx) => (
              <div 
                key={idx} 
                className="min-w-[280px] w-[280px] bg-white rounded-xl border border-outline-variant/40 shadow-sm p-4 snap-start hover:border-primary transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-extrabold text-on-surface group-hover:text-primary transition-colors">{alt.name}</h4>
                  <div className="bg-surface text-on-surface px-2 py-0.5 rounded text-[10px] font-bold">{alt.match} Match</div>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full mb-3 overflow-hidden">
                  <div className={`h-full ${alt.color} ${alt.width}`}></div>
                </div>
                <p className="text-xs text-on-surface-variant/90 line-clamp-2 leading-relaxed">{alt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-4">
        <Link
          href="/recommend"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-outline-variant text-on-surface font-bold hover:bg-surface transition-all shadow-sm text-sm"
        >
          {t('tryAnother')}
        </Link>
        <Link
          href="/encyclopedia"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-outline-variant text-on-surface font-bold hover:bg-surface transition-all shadow-sm text-sm"
        >
          {t('browseEncyclopedia')}
        </Link>
      </div>
    </div>
  )
}
