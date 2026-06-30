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
    { zone: 'North Ridge', pred: '6.8', actual: '7.2', var: '+5.8%', color: 'text-primary' },
    { zone: 'East Valley', pred: '7.5', actual: '7.3', var: '-2.6%', color: 'text-red-500' },
    { zone: 'South Flats', pred: '5.9', actual: '6.1', var: '+3.3%', color: 'text-primary' },
    { zone: 'West Boundary', pred: '6.2', actual: '6.2', var: '0.0%', color: 'text-on-surface-variant/60' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">{t('history')}</span>
          <h1 className="text-3xl font-black text-on-surface mt-1">North Plot Performance Analysis</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white text-on-surface font-bold hover:bg-surface transition-all shadow-sm text-sm">
            Provide Feedback
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-[#a3f69c] text-black font-bold hover:bg-[#88d982] transition-all shadow-sm text-sm">
            Export as PDF
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Yield Comparison Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-md font-extrabold text-on-surface">Yield Comparison (2023 Season)</h3>
            <span className="text-xs bg-surface text-primary border border-primary/20 px-2.5 py-1 rounded-full font-bold">
              Wheat (Winter)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider">
                  <th className="pb-3">Zone</th>
                  <th className="pb-3">Predicted (t/ha)</th>
                  <th className="pb-3">Actual (t/ha)</th>
                  <th className="pb-3">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm">
                {yieldComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface/30 transition-colors">
                    <td className="py-3 font-bold text-on-surface">{row.zone}</td>
                    <td className="py-3 text-on-surface-variant">{row.pred}</td>
                    <td className="py-3 text-on-surface-variant">{row.actual}</td>
                    <td className={`py-3 font-bold ${row.color}`}>{row.var}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Model Accuracy & Harvest Log Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Accuracy Card */}
          <div className="bg-gradient-to-br from-primary to-primary-container text-white p-6 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden flex flex-col justify-between h-[140px]">
            <div className="absolute right-0 bottom-0 opacity-10 text-8xl pointer-events-none translate-x-4 translate-y-4">🎯</div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Model Accuracy</span>
              <div className="text-4xl font-black mt-1">94.2%</div>
            </div>
            <p className="text-xs text-white/85">+1.2% vs previous season</p>
          </div>

          {/* Harvest Log Card */}
          <div className="h-[140px] rounded-2xl overflow-hidden relative border border-outline-variant/40 shadow-sm group">
            <img 
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" 
              alt="Harvest Log" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQGshdArxTYZSnhE0vOl2BZGCmoivy0NZBFMaOzIptszn2a77Y-XaceoynuqbOmytBwo29UZEEMNP-hYxpiLgkHzf3-OBFCWe1L-s-wyIbDdA3RH5jM-XJtQ0xy9OCP9jfKaVmRGODZoAjy5cxr0hZL9i8AO1O_G-aW4MdPxU9akgeBSi7pU3RKyl9HzRpRw47UjmXMgmvGeYKFY2mw6gpOwy_K83PigQBSMsQMumFflcdMwhjuCV8QOfiT9d6Sn14QUpP9u2_bLc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-4">
              <h4 className="text-white font-extrabold text-sm">Harvest Log</h4>
              <p className="text-white/80 text-[10px] mt-0.5">Oct 12 - Oct 18, 2023</p>
            </div>
          </div>
        </div>

        {/* Soil Test History Section */}
        <div className="lg:col-span-12 bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-md font-extrabold text-on-surface flex items-center gap-2">
              <span>🧪</span> {t('soilTestHistory')}
            </h3>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64 border border-outline-variant/60 rounded-xl overflow-hidden">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🔍</span>
              <input
                id="history-search"
                type="text"
                placeholder={t('searchHistory')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white text-on-surface placeholder-on-surface-variant/40 focus:outline-none text-xs"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant text-sm">Loading...</p>
            </div>
          ) : paged.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-on-surface font-bold mb-2">{search ? 'No results found' : t('noPredictions')}</h3>
              <p className="text-on-surface-variant text-xs">{search ? 'Try a different search term' : 'Make your first crop prediction'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map((pred) => (
                <div 
                  key={pred.id} 
                  className="bg-white rounded-xl border border-outline-variant/40 p-5 shadow-sm relative hover:border-primary transition-all group"
                >
                  <button 
                    onClick={() => handleDelete(pred.id)}
                    disabled={deleting === pred.id}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {deleting === pred.id ? '...' : '✕'}
                  </button>

                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-on-surface-variant/60 text-[10px] font-bold uppercase">{formatDate(pred.created_at).split(',')[0]}</span>
                      <h4 className="text-sm font-extrabold text-on-surface capitalize mt-0.5 flex items-center gap-1.5">
                        <span>{getCropEmoji(pred.predicted_crop)}</span> {pred.predicted_crop}
                      </h4>
                    </div>
                    {pred.confidence && (
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                        {pred.confidence.toFixed(0)}% Match
                      </span>
                    )}
                  </div>

                  {/* NPK Progress Bars */}
                  <div className="space-y-2 mt-4 border-t border-outline-variant/10 pt-3">
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-on-surface-variant mb-0.5">
                        <span>N ({t('nitrogenLabel')})</span>
                        <span className="font-bold">{pred.nitrogen} kg/ha</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-[#2e7d32]" style={{ width: `${Math.min(100, (pred.nitrogen / 140) * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-on-surface-variant mb-0.5">
                        <span>P ({t('phosphorusLabel')})</span>
                        <span className="font-bold">{pred.phosphorus} kg/ha</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffb957]" style={{ width: `${Math.min(100, (pred.phosphorus / 145) * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-on-surface-variant mb-0.5">
                        <span>K ({t('potassiumLabel')})</span>
                        <span className="font-bold">{pred.potassium} kg/ha</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-[#005db7]" style={{ width: `${Math.min(100, (pred.potassium / 205) * 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <p className="text-on-surface-variant/70 text-xs">
                Page {page} of {totalPages} ({filtered.length} results)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3.5 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-on-surface text-xs disabled:opacity-40 hover:bg-surface transition-colors font-bold"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3.5 py-1.5 rounded-lg border border-outline-variant/40 bg-white text-on-surface text-xs disabled:opacity-40 hover:bg-surface transition-colors font-bold"
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
