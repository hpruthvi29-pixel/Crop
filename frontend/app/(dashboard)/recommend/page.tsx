'use client'

import RecommendationForm from '@/components/forms/RecommendationForm'
import { useLanguage } from '@/context/LanguageContext'

export default function RecommendPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#faf8f4] border border-stone-200/60 text-[#1a6b3c] text-sm font-bold shadow-sm animate-fade-in-up">
          🔬 Precision Soil Laboratory
        </span>
        <h1 className="text-3xl font-bold text-[#1a1a1a] animate-fade-in-up delay-100">{t('soilWizardTitle')}</h1>
        <p className="text-[#6b7280] text-base max-w-2xl mx-auto animate-fade-in-up delay-200">{t('soilWizardDesc')}</p>
      </div>

      <RecommendationForm />
    </div>
  )
}
