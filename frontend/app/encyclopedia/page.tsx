'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CROPS, CROP_CATEGORIES, type CropCategory } from '@/data/crops'
import { useLanguage } from '@/context/LanguageContext'

export default function EncyclopediaPage() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CropCategory>('All')

  const filtered = CROPS.filter(crop => {
    const matchSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || crop.category === category
    return matchSearch && matchCat
  })

  const CATEGORY_COLORS: Record<string, string> = {
    Cereal: 'bg-yellow-50 text-yellow-700 border-yellow-200/50',
    Pulse: 'bg-green-50 text-green-700 border-green-200/50',
    Fruit: 'bg-pink-50 text-pink-700 border-pink-200/50',
    'Cash Crop': 'bg-purple-50 text-purple-700 border-purple-200/50',
    Beverage: 'bg-orange-50 text-orange-700 border-orange-200/50',
  }

  return (
    <div className="min-h-screen bg-[#f3faff] flex flex-col font-sans text-on-surface">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">{t('crops')}</span>
            <h1 className="text-3xl font-black text-on-surface mt-1">{t('browseEncyclopedia')}</h1>
            <p className="text-on-surface-variant text-sm mt-1">Browse all 22 crops supported by our recommendation system</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">🔍</span>
              <input
                id="encyclopedia-search"
                type="text"
                placeholder="Search crops..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-on-surface placeholder-on-surface-variant/40 focus:outline-none text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CROP_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    category === cat
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-white text-on-surface-variant border-outline-variant/40 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="text-on-surface-variant/60 text-xs font-semibold">{filtered.length} crops found</p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
            {filtered.map(crop => (
              <Link
                key={crop.id}
                href={`/encyclopedia/${crop.id}`}
                id={`crop-card-${crop.id}`}
                className="bg-white rounded-2xl border border-outline-variant/40 p-5 shadow-sm hover:shadow-md transition-all duration-300 group block hover:border-primary"
              >
                {/* Crop icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                  🌾
                </div>

                {/* Category badge */}
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${CATEGORY_COLORS[crop.category] || 'bg-surface text-on-surface-variant border-outline-variant/30'}`}>
                  {crop.category}
                </span>

                <h3 className="text-on-surface font-extrabold text-md mt-3 mb-0.5 group-hover:text-primary transition-colors">
                  {crop.name}
                </h3>
                <p className="text-on-surface-variant/60 text-xs italic mb-3">{crop.scientificName}</p>
                <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">{crop.description}</p>

                <div className="mt-4 pt-4 border-t border-outline-variant/10 grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-on-surface-variant/60 font-semibold uppercase">Season</p>
                    <p className="text-on-surface font-bold mt-0.5 truncate">{crop.season.split('(')[0].trim()}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant/60 font-semibold uppercase">pH Range</p>
                    <p className="text-on-surface font-bold mt-0.5">{crop.phRange}</p>
                  </div>
                </div>

                <div className="mt-4 text-primary text-xs font-bold group-hover:underline flex items-center gap-0.5">
                  View details ➔
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-on-surface font-bold mb-2">No crops found</p>
              <p className="text-on-surface-variant text-sm">Try a different search or filter</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
