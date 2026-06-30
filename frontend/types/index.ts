export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
}

export interface PredictionInput {
  nitrogen: number
  phosphorus: number
  potassium: number
  temperature: number
  humidity: number
  ph: number
  rainfall: number
}

export interface Prediction {
  id: string
  user_id: string
  nitrogen: number
  phosphorus: number
  potassium: number
  temperature: number
  humidity: number
  ph: number
  rainfall: number
  predicted_crop: string
  confidence: number | null
  created_at: string
}

export interface PredictionResult {
  success: boolean
  crop_name: string
  confidence: number
  recommendations: CropRecommendations
  message?: string
}

export interface CropRecommendations {
  season: string
  water: string
  soil: string
  fertilizer: string
  harvest_duration: string
  description: string
}

export interface CropInfo {
  id: string
  name: string
  scientificName: string
  category: 'Cereal' | 'Pulse' | 'Fruit' | 'Cash Crop' | 'Beverage'
  image: string
  description: string
  idealNitrogen: string
  idealPhosphorus: string
  idealPotassium: string
  temperatureRange: string
  humidityRange: string
  phRange: string
  rainfallRange: string
  season: string
  harvestDuration: string
  color: string
}

export interface DashboardStats {
  totalPredictions: number
  mostRecommendedCrop: string
  lastPredictionDate: string | null
  uniqueCrops: number
}

export type FormErrors = Partial<Record<keyof PredictionInput, string>>
