'use client'

import RecommendationForm from '@/components/forms/RecommendationForm'
import { useLanguage } from '@/context/LanguageContext'

export default function RecommendPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-on-surface mb-2">{t('soilWizardTitle')}</h1>
        <p className="text-on-surface-variant text-base">{t('soilWizardDesc')}</p>
      </div>

      <RecommendationForm />
    </div>
  )
}
