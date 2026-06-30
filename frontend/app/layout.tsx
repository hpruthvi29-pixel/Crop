import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import AgriBot from '@/components/layout/AgriBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Crop Recommendation System | AI-Powered Agriculture',
  description: 'Get AI-powered crop recommendations based on soil nutrients and environmental conditions. Make data-driven farming decisions with our machine learning system.',
  keywords: 'crop recommendation, AI agriculture, soil analysis, farming technology, precision agriculture',
  authors: [{ name: 'CropAI Team' }],
  openGraph: {
    title: 'Smart Crop Recommendation System',
    description: 'AI-powered crop recommendations for smarter farming',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-foreground antialiased`}>
        <LanguageProvider>
          {children}
          <AgriBot />
        </LanguageProvider>
      </body>
    </html>
  )
}
