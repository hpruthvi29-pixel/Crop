import { notFound } from 'next/navigation'
import { CROPS } from '@/data/crops'
import type { Metadata } from 'next'
import CropDetailClient from '@/components/crop/CropDetailClient'

interface Props {
  params: Promise<{ crop: string }>
}

export async function generateStaticParams() {
  return CROPS.map(crop => ({ crop: crop.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { crop: cropId } = await params
  const crop = CROPS.find(c => c.id === cropId)
  return {
    title: crop ? `${crop.name} | Crop Encyclopedia | AgriPrecise` : 'Crop Not Found',
    description: crop?.description,
  }
}

export default async function CropDetailPage({ params }: Props) {
  const { crop: cropId } = await params
  const crop = CROPS.find(c => c.id === cropId)
  if (!crop) notFound()

  return <CropDetailClient crop={crop} />
}
