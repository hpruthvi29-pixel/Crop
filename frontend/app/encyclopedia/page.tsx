'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CROPS, CROP_CATEGORIES, type CropCategory } from '@/data/crops'
import { useLanguage } from '@/context/LanguageContext'

export default function EncyclopediaPage() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CropCategory>('All')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filtered = CROPS.filter(crop => {
    const matchSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || crop.category === category
    return matchSearch && matchCat
  })

  // Premium Earth Tone Category Badges
  const CATEGORY_COLORS: Record<string, string> = {
    Cereal: 'bg-[#d4a853]/10 text-[#d4a853] border-[#d4a853]/30',
    Pulse: 'bg-[#1a6b3c]/10 text-[#1a6b3c] border-[#1a6b3c]/30',
    Fruit: 'bg-[#c8965c]/10 text-[#c8965c] border-[#c8965c]/30',
    'Cash Crop': 'bg-[#8b4513]/10 text-[#8b4513] border-[#8b4513]/30',
    Beverage: 'bg-[#2d8f5e]/10 text-[#2d8f5e] border-[#2d8f5e]/30',
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-[#1a1a1a]">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="animate-fade-in-up">
            <span className="text-xs font-bold text-[#c8965c] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8965c] animate-pulse"></span>
              {t('crops')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#1a1a1a] mt-2 mb-3 tracking-tight">{t('browseEncyclopedia')}</h1>
            <p className="text-[#6b7280] text-sm max-w-2xl font-medium">Browse our comprehensive database of 22 major crops, detailing their optimal soil requirements, climate preferences, and expected harvest timelines.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-5 animate-fade-in-up delay-100">
            <div className="relative flex-1 max-w-md border border-stone-200/80 rounded-xl overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-[#1a6b3c]/20 focus-within:border-[#1a6b3c] transition-all">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
              <input
                id="encyclopedia-search"
                type="text"
                placeholder="Search crops by name or scientific name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#1a1a1a] placeholder-[#6b7280] focus:outline-none text-sm font-medium"
              />
            </div>
            
            <div className="flex flex-wrap gap-2.5 items-center">
              {CROP_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    category === cat
                      ? 'bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e] text-white border-transparent shadow-md'
                      : 'bg-white text-[#6b7280] border border-stone-200/80 hover:border-[#1a6b3c]/40 hover:text-[#1a6b3c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          <div className="animate-fade-in-up delay-200">
            <div className="flex justify-between items-end mb-6 border-b border-stone-200/60 pb-3">
              <h2 className="text-lg font-bold text-[#1a1a1a]">{category === 'All' ? 'All Crops' : `${category}s`}</h2>
              <p className="text-[#6b7280] text-xs font-bold uppercase tracking-wider">{filtered.length} crops found</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
              {filtered.map((crop, index) => (
                <Link
                  key={crop.id}
                  href={`/encyclopedia/${crop.id}`}
                  id={`crop-card-${crop.id}`}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(26,107,60,0.12)] hover:-translate-y-1 hover:border-[#1a6b3c]/30 transition-all duration-300 group block relative overflow-hidden"
                  style={{ animationDelay: `${(index % 8) * 50}ms` }}
                >
                  {/* Decorative corner gradient */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-bl from-[#f0ece4] to-transparent rounded-full opacity-50 group-hover:from-[#e8f5e9] transition-colors"></div>

                  <div className="flex justify-between items-start mb-5 relative z-10">
                    {/* Crop icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#faf8f4] to-[#f0ece4] border border-stone-200/60 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                      🌾
                    </div>
                    {/* Category badge */}
                    <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${CATEGORY_COLORS[crop.category] || 'bg-[#faf8f4] text-[#6b7280] border-stone-200'}`}>
                      {crop.category}
                    </span>
                  </div>

                  <h3 className="text-[#1a1a1a] font-extrabold text-xl mt-2 mb-1 group-hover:text-[#1a6b3c] transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-[#8b4513] text-xs italic mb-4 font-medium">{crop.scientificName}</p>
                  
                  <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-2 font-medium h-10">
                    {crop.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-stone-200/60 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#6b7280] font-bold uppercase tracking-wider text-[10px] mb-1">Season</p>
                      <p className="text-[#1a1a1a] font-bold truncate">{crop.season.split('(')[0].trim()}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7280] font-bold uppercase tracking-wider text-[10px] mb-1">pH Range</p>
                      <p className="text-[#1a1a1a] font-bold">{crop.phRange}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[#1a6b3c] text-xs font-bold group-hover:translate-x-1 transition-transform">
                    <span>View full details</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white/50 rounded-2xl border border-stone-200/60 border-dashed">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <p className="text-[#1a1a1a] font-bold text-lg mb-2">No crops found</p>
                <p className="text-[#6b7280] text-sm font-medium">Try adjusting your search term or selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
