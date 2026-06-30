'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { predictCrop } from '@/lib/api'
import { createClient } from '@/lib/supabase/client'
import type { PredictionInput, FormErrors } from '@/types'
import { useLanguage } from '@/context/LanguageContext'

const FIELDS = [
  {
    key: 'nitrogen' as keyof PredictionInput,
    labelKey: 'nitrogenLabel',
    placeholder: '90',
    min: 0, max: 140,
    unit: 'kg/ha',
    icon: '🧪',
    tooltip: 'Nitrogen content in soil. Essential for leaf growth and green color. Range: 0–140 kg/ha',
  },
  {
    key: 'phosphorus' as keyof PredictionInput,
    labelKey: 'phosphorusLabel',
    placeholder: '42',
    min: 0, max: 145,
    unit: 'kg/ha',
    icon: '💎',
    tooltip: 'Phosphorus promotes root development and flowering. Range: 0–145 kg/ha',
  },
  {
    key: 'potassium' as keyof PredictionInput,
    labelKey: 'potassiumLabel',
    placeholder: '43',
    min: 0, max: 205,
    unit: 'kg/ha',
    icon: '⚡',
    tooltip: 'Potassium strengthens plant cell walls and disease resistance. Range: 0–205 kg/ha',
  },
  {
    key: 'temperature' as keyof PredictionInput,
    labelKey: 'tempLabel',
    placeholder: '20.5',
    min: 0, max: 50,
    unit: '°C',
    icon: '🌡️',
    tooltip: 'Average temperature of your region. Range: 0–50°C',
  },
  {
    key: 'humidity' as keyof PredictionInput,
    labelKey: 'humidityLabel',
    placeholder: '82',
    min: 0, max: 100,
    unit: '%',
    icon: '💧',
    tooltip: 'Relative humidity in percentage. Range: 0–100%',
  },
  {
    key: 'ph' as keyof PredictionInput,
    labelKey: 'phLabel',
    placeholder: '6.5',
    min: 0, max: 14,
    unit: '',
    icon: '🔬',
    tooltip: 'pH value of your soil. 7 is neutral, below is acidic, above is alkaline. Range: 0–14',
  },
  {
    key: 'rainfall' as keyof PredictionInput,
    labelKey: 'rainfallLabel',
    placeholder: '200',
    min: 0, max: 300,
    unit: 'mm',
    icon: '🌧️',
    tooltip: 'Annual rainfall in your region. Range: 0–300 mm',
  },
]

export default function RecommendationForm() {
  const router = useRouter()
  const { t } = useLanguage()
  const [form, setForm] = useState<Partial<PredictionInput>>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [tooltip, setTooltip] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    for (const field of FIELDS) {
      const val = form[field.key]
      if (val === undefined || val === null || String(val) === '') {
        newErrors[field.key] = `${t(field.labelKey)} is required`
      } else if (Number(val) < field.min || Number(val) > field.max) {
        newErrors[field.key] = `Must be between ${field.min} and ${field.max}`
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')
    if (!validate()) return
    setLoading(true)
    try {
      const input = form as PredictionInput
      const result = await predictCrop(input)

      // Save to Supabase
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('predictions').insert({
          user_id: user.id,
          nitrogen: input.nitrogen,
          phosphorus: input.phosphorus,
          potassium: input.potassium,
          temperature: input.temperature,
          humidity: input.humidity,
          ph: input.ph,
          rainfall: input.rainfall,
          predicted_crop: result.crop_name.toLowerCase(),
          confidence: result.confidence,
        })
      }

      // Store result and redirect
      sessionStorage.setItem('predictionResult', JSON.stringify({ ...result, input }))
      router.push('/result')
    } catch (err: any) {
      setApiError(err.message || 'Prediction failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm">
        <div className="bg-surface/30 border-b border-outline-variant/30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-on-surface">{t('macronutrientProfile')}</h2>
            <p className="text-on-surface-variant text-xs mt-1">{t('macronutrientDesc')}</p>
          </div>
          <div className="text-2xl text-primary bg-primary-container/10 p-2 rounded-full">
            🌱
          </div>
        </div>

        {apiError && (
          <div className="mx-6 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {FIELDS.map(field => (
            <div key={field.key}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  <span>{field.icon}</span>
                  {t(field.labelKey)}
                  {field.unit && <span className="text-on-surface-variant/60 text-[10px]">({field.unit})</span>}
                </label>
                <button
                  type="button"
                  onMouseEnter={() => setTooltip(field.key)}
                  onMouseLeave={() => setTooltip(null)}
                  className="text-on-surface-variant/50 hover:text-primary transition-colors relative"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tooltip === field.key && (
                    <div className="absolute right-0 bottom-6 w-56 p-3 rounded-xl bg-white border border-outline-variant text-on-surface text-xs z-50 shadow-lg leading-relaxed text-left">
                      {field.tooltip}
                    </div>
                  )}
                </button>
              </div>
              <input
                id={`field-${field.key}`}
                type="number"
                step="any"
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                value={form[field.key] !== undefined && form[field.key] !== null && !isNaN(form[field.key] as number) ? form[field.key] : ''}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                  setForm(f => ({ ...f, [field.key]: val }));
                  setErrors(er => ({ ...er, [field.key]: undefined }));
                }}
                className={`w-full px-4 py-3 rounded-xl bg-white border text-on-surface placeholder-on-surface-variant/40 focus:outline-none transition-all text-sm ${
                  errors[field.key]
                    ? 'border-red-500/50 focus:ring-1 focus:ring-red-500/30'
                    : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
                }`}
              />
              {errors[field.key] && (
                <p className="text-red-600 text-xs mt-1 font-semibold">{errors[field.key]}</p>
              )}
            </div>
          ))}

          <button
            id="recommend-submit"
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#a3f69c] text-black font-bold text-sm hover:bg-[#88d982] transition-all shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin w-5 h-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('analyzingSoil')}
              </span>
            ) : t('getRecommendation')}
          </button>
        </form>
      </div>
    </div>
  )
}
