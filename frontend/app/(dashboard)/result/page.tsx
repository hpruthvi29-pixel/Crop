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
    doc.setTextColor(26, 107, 60)
    doc.text('AgriPrecise Recommendation Report', 20, 25)
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-[#1a6b3c] animate-spin mx-auto mb-4 shadow-sm" />
          <p className="text-[#6b7280] font-medium">Analyzing soil profile...</p>
        </div>
      </div>
    )
  }

  const { crop_name, confidence, recommendations, input } = result
  const cropInfo = getCropById(crop_name)

  const altCrops = [
    { name: 'Soybeans', match: '88%', desc: 'Requires slight pH adjustment. Strong current market demand.', width: 'w-[88%]', color: 'bg-[#1a6b3c]' },
    { name: 'Sorghum', match: '82%', desc: 'Excellent drought tolerance based on long-term climate forecast.', width: 'w-[82%]', color: 'bg-[#c8965c]' },
    { name: 'Corn', match: '75%', desc: 'High nitrogen requirement. Significant fertilizer investment needed.', width: 'w-[75%]', color: 'bg-[#8b4513]' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#c8965c] uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8965c] animate-pulse"></span>
            {t('analysisResults')}
          </span>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] mt-1">North Plot • Soil Sample #4892</h1>
        </div>
        <button 
          onClick={handlePDF}
          className="inline-flex items-center gap-2 bg-white text-[#c8965c] px-5 py-2.5 rounded-xl border border-[#d4a853]/40 hover:bg-[#d4a853]/5 hover:border-[#d4a853] transition-all shadow-sm font-bold text-sm"
        >
          📥 {t('exportPdf')}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Match Card */}
        <div className="lg:col-span-8 premium-card overflow-hidden flex flex-col relative group min-h-[350px]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e]"></div>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center h-full">
            <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#d4a853]/15 text-[#8b4513] px-3 py-1 rounded-full mb-4 text-xs font-bold border border-[#d4a853]/30">
                  <span>✨</span> {t('primaryRec')}
                </div>
                <h3 className="text-4xl font-extrabold text-[#1a1a1a] capitalize mb-1">{crop_name}</h3>
                <div className="text-2xl font-black gradient-text mb-4">{confidence.toFixed(1)}% {t('matchScore')}</div>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6 font-medium">
                  {recommendations.description || `Current soil profile, historical climate data, and N-P-K balance indicate optimal conditions for a high-yield ${crop_name} crop this season.`}
                </p>
              </div>
              <button 
                onClick={() => router.push('/dashboard')}
                className="gradient-btn w-full md:w-auto text-center"
              >
                {t('adoptPlan')} →
              </button>
            </div>
            
            <div className="w-full md:w-1/2 h-52 md:h-64 rounded-xl overflow-hidden relative shadow-inner border border-stone-200/60">
              <img 
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" 
                alt={crop_name}
                src={cropInfo?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd_YwVbPHGhzo3ePYpinYqbd9M7_SEskeibfkvBu2GhGggVMnazqWt4tI_JzfxhyMGNRAZm2QxTzNMFP9N7SidE4lRBXwL8D2Fek0a1zZcI0cVAQ8sT4AJ8q9s_6G_MGFkzZWtiJtml4qClD-Z8AwhrC8jnnTKzjcVL6VLB5Rc_b27W3o6RIai-p7CCuRmp77prkDBtRDeCm2Blr-1y4IWfvyF7vTAda3E2XZbvHnYVFuV6jN8ZKCfk8S2YU2InFE8z2FwvzpJN7s'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1f]/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs font-bold backdrop-blur-md bg-black/30 px-3 py-1.5 rounded border border-white/20">
                  Est. Yield: {crop_name === 'rice' ? '4.2 tons/hectare' : '2.1 bales/acre'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Health Radar Card */}
        <div className="lg:col-span-4 premium-card p-6 flex flex-col justify-between min-h-[350px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#1a1a1a]">{t('soilHealth')}</h3>
            <span className="text-[#c8965c] text-lg bg-[#c8965c]/10 p-1.5 rounded-lg" title="Optimal conditions">ℹ️</span>
          </div>
          
          {/* Custom Premium SVG Radar Chart (Earth Tones) */}
          <div className="flex-grow flex items-center justify-center relative min-h-[180px]">
            <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-md">
              {/* Grid lines */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ddd7cd" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#ddd7cd" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#ddd7cd" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#ddd7cd" strokeWidth="0.5" />
              {/* Axes */}
              <line x1="50" y1="10" x2="50" y2="90" stroke="#ddd7cd" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#ddd7cd" strokeWidth="0.5" />
              {/* Base Polygon */}
              <polygon points="50,22 78,35 68,68 32,68 22,35" fill="rgba(200, 150, 92, 0.15)" stroke="#c8965c" strokeWidth="0.75" strokeDasharray="1,1" />
              {/* Current Plot Polygon */}
              <polygon points="50,18 82,42 62,72 38,62 25,28" fill="rgba(26, 107, 60, 0.25)" stroke="#1a6b3c" strokeWidth="2" strokeLinejoin="round" />
              {/* Labels */}
              <text x="50" y="8" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#1a1a1a">N</text>
              <text x="92" y="52" textAnchor="start" fontSize="4.5" fontWeight="bold" fill="#1a1a1a">P</text>
              <text x="72" y="92" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#1a1a1a">K</text>
              <text x="28" y="92" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#1a1a1a">pH</text>
              <text x="8" y="52" textAnchor="end" fontSize="4.5" fontWeight="bold" fill="#1a1a1a">Rain</text>
            </svg>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs">
            <div className="bg-[#faf8f4] p-3 rounded-xl border border-stone-200/60 shadow-inner">
              <div className="text-[#6b7280] text-[10px] font-bold uppercase tracking-wider">{t('phLabel')}</div>
              <div className="font-extrabold text-[#1a1a1a] mt-1 text-lg">{input.ph}</div>
            </div>
            <div className="bg-[#faf8f4] p-3 rounded-xl border border-stone-200/60 shadow-inner">
              <div className="text-[#6b7280] text-[10px] font-bold uppercase tracking-wider">{t('humidityLabel')}</div>
              <div className="font-extrabold text-[#1a6b3c] mt-1 text-lg">{input.humidity}%</div>
            </div>
          </div>
        </div>

        {/* Fertilizer Schedule Timeline */}
        <div className="lg:col-span-8 premium-card p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#1a1a1a]">{t('fertilizer')} Schedule</h3>
            <span className="text-lg bg-[#c8965c]/10 p-2 rounded-lg">📅</span>
          </div>
          
          <div className="relative w-full py-6">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -translate-y-1/2 z-0 rounded-full"></div>
            <div className="flex justify-between relative z-10 w-full px-4">
              <div className="flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center mb-3 shadow-md border-[3px] border-white transition-transform group-hover:scale-110 font-bold text-sm">✓</div>
                <div className="text-[11px] font-bold text-[#1a1a1a]">Wk 1</div>
                <div className="text-[11px] text-[#6b7280] text-center mt-1 font-medium">Pre-plant<br />N-P-K</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-[#c8965c] text-white flex items-center justify-center mb-3 shadow-md border-[3px] border-white ring-4 ring-[#c8965c]/20 transition-transform group-hover:scale-110 font-bold text-sm">•</div>
                <div className="text-[11px] font-bold text-[#1a1a1a]">Wk 4</div>
                <div className="text-[11px] text-[#1a6b3c] font-bold text-center mt-1">Side-dress<br />Nitrogen</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-[#f0ece4] text-[#6b7280] flex items-center justify-center mb-3 shadow-sm border-[3px] border-white transition-transform group-hover:scale-110"></div>
                <div className="text-[11px] font-bold text-[#6b7280]">Wk 8</div>
                <div className="text-[11px] text-[#6b7280] text-center mt-1 font-medium">Foliar<br />Potassium</div>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-10 h-10 rounded-full bg-[#f0ece4] text-[#6b7280] flex items-center justify-center mb-3 shadow-sm border-[3px] border-white transition-transform group-hover:scale-110"></div>
                <div className="text-[11px] font-bold text-[#6b7280]">Wk 12</div>
                <div className="text-[11px] text-[#6b7280] text-center mt-1 font-medium">Late<br />Season</div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Intel Mini Widget */}
        <div className="lg:col-span-4 premium-card p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Market Intel</h3>
            <span className="text-lg bg-[#c8965c]/10 p-2 rounded-lg">📈</span>
          </div>
          
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            <div className="flex justify-between items-center border-b border-stone-200/60 pb-3">
              <div className="text-sm font-bold text-[#1a1a1a] capitalize">{crop_name} (ZCE)</div>
              <div className="text-right">
                <div className="text-md font-bold text-[#1a1a1a]">$84.20</div>
                <div className="text-[11px] font-bold text-[#1a6b3c] flex items-center justify-end gap-1">▲ 1.2%</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-[#1a1a1a]">Soybeans (CBOT)</div>
              <div className="text-right">
                <div className="text-md font-bold text-[#1a1a1a]">$1,180.50</div>
                <div className="text-[11px] font-bold text-[#dc4a3f] flex items-center justify-end gap-1">▼ 0.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternatives Carousel */}
        <div className="lg:col-span-12 mt-4">
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Alternative Crop Matches</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {altCrops.map((alt, idx) => (
              <div 
                key={idx} 
                className="min-w-[280px] w-[280px] bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200/60 shadow-sm p-5 snap-start hover:border-[#c8965c]/50 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#1a6b3c] transition-colors">{alt.name}</h4>
                  <div className="bg-[#f0ece4] text-[#1a1a1a] px-2 py-0.5 rounded text-[10px] font-bold border border-stone-200">{alt.match} Match</div>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full mb-4 overflow-hidden">
                  <div className={`h-full ${alt.color} ${alt.width}`}></div>
                </div>
                <p className="text-xs text-[#6b7280] line-clamp-2 leading-relaxed font-medium">{alt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-8">
        <Link
          href="/recommend"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 text-[#1a1a1a] font-bold hover:bg-[#faf8f4] transition-all shadow-sm text-sm"
        >
          {t('tryAnother')} ↺
        </Link>
        <Link
          href="/encyclopedia"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 text-[#1a1a1a] font-bold hover:bg-[#faf8f4] transition-all shadow-sm text-sm"
        >
          {t('browseEncyclopedia')} 📚
        </Link>
      </div>
    </div>
  )
}
