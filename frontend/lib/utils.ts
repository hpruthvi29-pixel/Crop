import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 85) return 'text-green-400'
  if (confidence >= 70) return 'text-yellow-400'
  return 'text-orange-400'
}

export function getConfidenceBadge(confidence: number): string {
  if (confidence >= 85) return 'High Confidence'
  if (confidence >= 70) return 'Medium Confidence'
  return 'Low Confidence'
}

export const CROP_EMOJIS: Record<string, string> = {
  rice: '🌾',
  maize: '🌽',
  chickpea: '🫘',
  kidneybeans: '🫘',
  pigeonpeas: '🫛',
  mothbeans: '🟤',
  mungbean: '🫘',
  blackgram: '⚫',
  lentil: '🔴',
  pomegranate: '🍎',
  banana: '🍌',
  mango: '🥭',
  grapes: '🍇',
  watermelon: '🍉',
  muskmelon: '🍈',
  apple: '🍎',
  orange: '🍊',
  papaya: '🍑',
  coconut: '🥥',
  cotton: '🌿',
  jute: '🌿',
  coffee: '☕',
}

export function getCropEmoji(cropName: string): string {
  return CROP_EMOJIS[cropName.toLowerCase()] || '🌱'
}
