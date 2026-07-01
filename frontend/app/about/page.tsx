import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | AgriPrecise',
  description: 'Learn about the AI-powered crop recommendation technology, dataset, and team.',
}

const TECH_STACK = [
  { name: 'Next.js 15', desc: 'React framework with App Router', icon: '⚡', color: 'text-[#1a1a1a]' },
  { name: 'FastAPI', desc: 'High-performance Python API', icon: '🚀', color: 'text-[#1a6b3c]' },
  { name: 'Scikit-learn', desc: 'Random Forest ML model', icon: '🤖', color: 'text-[#c8965c]' },
  { name: 'Supabase', desc: 'PostgreSQL + Authentication', icon: '🗄️', color: 'text-[#2d8f5e]' },
  { name: 'TypeScript', desc: 'Type-safe frontend code', icon: '🔷', color: 'text-[#1a1a1a]' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', icon: '🎨', color: 'text-[#8b4513]' },
  { name: 'Recharts', desc: 'Data visualization', icon: '📊', color: 'text-[#d4a853]' },
  { name: 'Vercel + Render', desc: 'Cloud deployment', icon: '☁️', color: 'text-[#6b7280]' },
]

const TEAM = [
  { name: 'ML Engineer', role: 'Model Training & Optimization', icon: '🤖' },
  { name: 'Backend Dev', role: 'FastAPI & Data Pipeline', icon: '⚙️' },
  { name: 'Frontend Dev', role: 'UI/UX & Next.js', icon: '🎨' },
  { name: 'Data Analyst', role: 'Dataset & Insights', icon: '📊' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-[#1a1a1a]">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* Hero */}
          <div className="text-center animate-fade-in-up">
            <span className="text-xs font-bold text-[#c8965c] tracking-widest uppercase flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8965c] animate-pulse"></span>
              About AgriPrecise
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">Smart Crop Recommendation System</h1>
            <p className="text-[#6b7280] text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              An AI-powered agricultural decision support system that leverages machine learning to help farmers make data-driven crop selection decisions.
            </p>
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left animate-fade-in-up delay-100">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] p-1.5 rounded-lg text-lg">🌾</span> Project Overview
              </h2>
              <div className="space-y-4 text-[#6b7280] text-sm leading-relaxed font-medium">
                <p>The Smart Crop Recommendation System was built to address one of agriculture&apos;s most critical challenges: choosing the right crop for specific soil and environmental conditions.</p>
                <p>Traditional farming often relies on passed-down knowledge and intuition. Our system augments this with scientific data analysis, processing 7 key parameters to provide accurate, data-backed recommendations.</p>
                <p>The system supports 22 major crops commonly grown in India, covering cereals, pulses, fruits, cash crops, and beverages.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '22', label: 'Crops Supported' },
                { icon: '7', label: 'Input Parameters' },
                { icon: '95%', label: 'Model Accuracy' },
                { icon: '∞', label: 'Free Predictions' },
              ].map(stat => (
                <div key={stat.label} className="premium-card p-6 text-center">
                  <p className="text-4xl font-extrabold gradient-text-gold">{stat.icon}</p>
                  <p className="text-[#6b7280] text-xs mt-3 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ML Explanation */}
          <div className="text-left animate-fade-in-up delay-200">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 flex items-center gap-2">
              <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] p-1.5 rounded-lg text-lg">🧠</span> How the ML Model Works
            </h2>
            <div className="premium-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Data Collection',
                    desc: 'The model was trained on a dataset of 2,200 samples covering all 22 crop types with varied soil and climate conditions.',
                    icon: '📊'
                  },
                  {
                    step: '2',
                    title: 'Random Forest',
                    desc: 'We use a Random Forest Classifier with 200 decision trees. Each tree votes on the best crop, and the majority vote wins.',
                    icon: '🌲'
                  },
                  {
                    step: '3',
                    title: 'Confidence Score',
                    desc: 'The confidence score represents the percentage of trees that agreed on the recommendation, giving you reliability insights.',
                    icon: '📈'
                  },
                ].map((item, idx) => (
                  <div key={item.step} className="relative group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a6b3c] to-[#2d8f5e] flex items-center justify-center text-white font-bold mb-4 shadow-md group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h3 className="text-[#1a1a1a] font-bold mb-2 text-md">{item.title}</h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed font-medium">{item.desc}</p>
                    
                    {/* Connecting line for desktop */}
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-5 left-12 w-[calc(100%-2rem)] h-0.5 bg-gradient-to-r from-[#1a6b3c]/40 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 rounded-xl bg-[#faf8f4] border border-stone-200/60 shadow-inner">
                <p className="text-[#1a6b3c] font-bold mb-2 uppercase tracking-wider text-xs">Input Features Evaluated</p>
                <p className="text-[#6b7280] text-sm font-medium">
                  Nitrogen (N), Phosphorus (P), Potassium (K), Temperature (°C), Humidity (%), pH level, Rainfall (mm)
                </p>
              </div>
            </div>
          </div>

          {/* Dataset Info */}
          <div className="text-left animate-fade-in-up delay-300">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <span className="bg-[#c8965c]/10 text-[#c8965c] p-1.5 rounded-lg text-lg">📁</span> Dataset Information
            </h2>
            <div className="premium-card p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Dataset Size', value: '2,200 samples', desc: '100 samples per crop' },
                  { label: 'Crop Classes', value: '22 crops', desc: 'Major Indian crops' },
                  { label: 'Data Source', value: 'Kaggle / Research', desc: 'Verified agricultural data' },
                ].map(item => (
                  <div key={item.label} className="text-center p-5 rounded-xl bg-[#faf8f4] border border-stone-200/60 shadow-sm hover:border-[#1a6b3c]/30 transition-colors">
                    <p className="text-[#c8965c] text-[10px] uppercase tracking-widest mb-3 font-bold">{item.label}</p>
                    <p className="text-[#1a1a1a] font-extrabold text-xl">{item.value}</p>
                    <p className="text-[#6b7280] text-xs mt-2 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-left animate-fade-in-up delay-400">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] p-1.5 rounded-lg text-lg">⚡</span> Technologies Used
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {TECH_STACK.map(tech => (
                <div key={tech.name} className="elevated-card p-5 group cursor-default">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <p className={`font-bold text-sm ${tech.color}`}>{tech.name}</p>
                  <p className="text-[#6b7280] text-xs mt-2 leading-relaxed font-medium">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="text-left animate-fade-in-up delay-500">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
              <span className="bg-[#c8965c]/10 text-[#c8965c] p-1.5 rounded-lg text-lg">👥</span> Team
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {TEAM.map(member => (
                <div key={member.name} className="premium-card overflow-hidden text-center hover:border-[#1a6b3c]/30 transition-all">
                  <div className="h-2 w-full bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e]"></div>
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#faf8f4] border border-stone-200/80 flex items-center justify-center text-2xl mx-auto mb-4 shadow-inner">
                      {member.icon}
                    </div>
                    <p className="text-[#1a1a1a] font-bold text-sm">{member.name}</p>
                    <p className="text-[#6b7280] text-xs mt-1.5 font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
