'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate, getCropEmoji } from '@/lib/utils'
import type { Prediction } from '@/types'
import { useLanguage } from '@/context/LanguageContext'

const PAGE_SIZE = 5

export default function HistoryPage() {
  const { t } = useLanguage()
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [filtered, setFiltered] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchPredictions = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('predictions')
      .select('*')
      .order('created_at', { ascending: false })
    setPredictions(data || [])
    setFiltered(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchPredictions() }, [fetchPredictions])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(predictions.filter(p =>
      p.predicted_crop.toLowerCase().includes(q) ||
      formatDate(p.created_at).toLowerCase().includes(q)
    ))
    setPage(1)
  }, [search, predictions])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this prediction?')) return
    setDeleting(id)
    const supabase = createClient()
    await supabase.from('predictions').delete().eq('id', id)
    await fetchPredictions()
    setDeleting(null)
  }

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const yieldComparison = [
    { zone: 'North Ridge', pred: '6.8', actual: '7.2', var: '+5.8%', color: 'text-[#1a6b3c]' },
    { zone: 'East Valley', pred: '7.5', actual: '7.3', var: '-2.6%', color: 'text-[#dc4a3f]' },
    { zone: 'South Flats', pred: '5.9', actual: '6.1', var: '+3.3%', color: 'text-[#1a6b3c]' },
    { zone: 'West Boundary', pred: '6.2', actual: '6.2', var: '0.0%', color: 'text-[#6b7280]' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#c8965c] uppercase tracking-widest">{t('history')}</span>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] mt-1">North Plot Performance Analysis</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-stone-200/60 bg-white text-[#1a1a1a] font-bold hover:bg-[#faf8f4] transition-all shadow-sm text-sm">
            Provide Feedback
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md text-sm">
            Export as PDF
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Yield Comparison Card */}
        <div className="lg:col-span-8 premium-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Yield Comparison (2023 Season)</h3>
            <span className="text-xs bg-[#c8965c]/10 text-[#8b4513] border border-[#c8965c]/30 px-3 py-1 rounded-full font-bold">
              Wheat (Winter)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200/60 text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">
                  <th className="pb-3">Zone</th>
                  <th className="pb-3">Predicted (t/ha)</th>
                  <th className="pb-3">Actual (t/ha)</th>
                  <th className="pb-3">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/40 text-sm">
                {yieldComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#faf8f4] transition-colors">
                    <td className="py-4 font-bold text-[#1a1a1a]">{row.zone}</td>
                    <td className="py-4 text-[#6b7280]">{row.pred}</td>
                    <td className="py-4 text-[#6b7280]">{row.actual}</td>
                    <td className={`py-4 font-bold ${row.color}`}>{row.var}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Accuracy & Harvest Log Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Accuracy Card */}
          <div className="bg-gradient-to-br from-[#1a6b3c] to-[#0f3d1f] text-white p-6 rounded-2xl shadow-[0_8px_32px_rgba(26,107,60,0.2)] relative overflow-hidden flex flex-col justify-between h-[150px] group">
            <div className="absolute right-0 bottom-0 opacity-10 text-8xl pointer-events-none translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-700">🎯</div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#e8f5e9]">Model Accuracy</span>
              <div className="text-4xl font-extrabold mt-1">94.2%</div>
            </div>
            <p className="text-xs text-[#a3f69c] font-medium">+1.2% vs previous season</p>
          </div>

          {/* Harvest Log Card */}
          <div className="h-[150px] rounded-2xl overflow-hidden relative border border-stone-200/60 shadow-sm group">
            <img 
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" 
              alt="Harvest Log" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQGshdArxTYZSnhE0vOl2BZGCmoivy0NZBFMaOzIptszn2a77Y-XaceoynuqbOmytBwo29UZEEMNP-hYxpiLgkHzf3-OBFCWe1L-s-wyIbDdA3RH5jM-XJtQ0xy9OCP9jfKaVmRGODZoAjy5cxr0hZL9i8AO1O_G-aW4MdPxU9akgeBSi7pU3RKyl9HzRpRw47UjmXMgmvGeYKFY2mw6gpOwy_K83PigQBSMsQMumFflcdMwhjuCV8QOfiT9d6Sn14QUpP9u2_bLc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <h4 className="text-white font-extrabold text-sm">Harvest Log</h4>
              <p className="text-[#ddd7cd] text-[10px] mt-1 font-medium">Oct 12 - Oct 18, 2023</p>
            </div>
          </div>
        </div>

        {/* Soil Test History Section */}
        <div className="lg:col-span-12 premium-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
              <span className="bg-[#1a6b3c]/10 p-2 rounded-lg text-xl">🧪</span> {t('soilTestHistory')}
            </h3>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64 border border-stone-200/80 rounded-xl overflow-hidden bg-[#faf8f4]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🔍</span>
              <input
                id="history-search"
                type="text"
                placeholder={t('searchHistory')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-transparent text-[#1a1a1a] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#1a6b3c]/20 text-sm transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 rounded-full border-4 border-stone-200 border-t-[#1a6b3c] animate-spin mx-auto mb-4" />
              <p className="text-[#6b7280] text-sm font-medium">Loading history...</p>
            </div>
          ) : paged.length === 0 ? (
            <div className="py-16 text-center bg-[#faf8f4] rounded-xl border border-stone-200/40 border-dashed">
              <div className="text-5xl mb-4 opacity-50">📋</div>
              <h3 className="text-[#1a1a1a] font-bold mb-2">{search ? 'No results found' : t('noPredictions')}</h3>
              <p className="text-[#6b7280] text-sm">{search ? 'Try a different search term' : 'Make your first crop prediction'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map((pred) => (
                <div 
                  key={pred.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] relative hover:border-[#1a6b3c]/40 hover:shadow-md transition-all group"
                >
                  <button 
                    onClick={() => handleDelete(pred.id)}
                    disabled={deleting === pred.id}
                    className="absolute top-4 right-4 text-[#dc4a3f] hover:bg-red-50 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete record"
                  >
                    {deleting === pred.id ? '...' : '✕'}
                  </button>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#c8965c] text-[10px] font-bold uppercase tracking-wider">{formatDate(pred.created_at).split(',')[0]}</span>
                      <h4 className="text-base font-extrabold text-[#1a1a1a] capitalize mt-1 flex items-center gap-2">
                        <span className="text-lg">{getCropEmoji(pred.predicted_crop)}</span> {pred.predicted_crop}
                      </h4>
                    </div>
                    {pred.confidence && (
                      <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] border border-[#1a6b3c]/20 px-2 py-1 rounded text-[10px] font-bold">
                        {pred.confidence.toFixed(0)}% Match
                      </span>
                    )}
                  </div>

                  {/* NPK Progress Bars */}
                  <div className="space-y-3 mt-5 border-t border-stone-200/60 pt-4">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[#6b7280] mb-1 uppercase tracking-wide">
                        <span>N ({t('nitrogenLabel')})</span>
                        <span className="text-[#1a1a1a]">{pred.nitrogen} <span className="font-medium text-[#6b7280] lowercase">kg/ha</span></span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a6b3c]" style={{ width: `${Math.min(100, (pred.nitrogen / 140) * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[#6b7280] mb-1 uppercase tracking-wide">
                        <span>P ({t('phosphorusLabel')})</span>
                        <span className="text-[#1a1a1a]">{pred.phosphorus} <span className="font-medium text-[#6b7280] lowercase">kg/ha</span></span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#c8965c]" style={{ width: `${Math.min(100, (pred.phosphorus / 145) * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[#6b7280] mb-1 uppercase tracking-wide">
                        <span>K ({t('potassiumLabel')})</span>
                        <span className="text-[#1a1a1a]">{pred.potassium} <span className="font-medium text-[#6b7280] lowercase">kg/ha</span></span>
                      </div>
                      <div className="w-full h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8b4513]" style={{ width: `${Math.min(100, (pred.potassium / 205) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 pt-5 border-t border-stone-200/60 flex items-center justify-between">
              <p className="text-[#6b7280] text-xs font-medium">
                Page <span className="font-bold text-[#1a1a1a]">{page}</span> of {totalPages} <span className="mx-1">•</span> {filtered.length} records
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-stone-200/60 bg-white text-[#1a1a1a] text-xs disabled:opacity-40 hover:bg-[#faf8f4] hover:border-[#1a6b3c]/30 transition-all font-bold shadow-sm"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-stone-200/60 bg-white text-[#1a1a1a] text-xs disabled:opacity-40 hover:bg-[#faf8f4] hover:border-[#1a6b3c]/30 transition-all font-bold shadow-sm"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
