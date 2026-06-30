import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | AgriPrecise',
  description: 'Learn about the AI-powered crop recommendation technology, dataset, and team.',
}

const TECH_STACK = [
  { name: 'Next.js 15', desc: 'React framework with App Router', icon: '⚡', color: 'text-primary' },
  { name: 'FastAPI', desc: 'High-performance Python API', icon: '🚀', color: 'text-teal-600' },
  { name: 'Scikit-learn', desc: 'Random Forest ML model', icon: '🤖', color: 'text-orange-600' },
  { name: 'Supabase', desc: 'PostgreSQL + Authentication', icon: '🗄️', color: 'text-green-600' },
  { name: 'TypeScript', desc: 'Type-safe frontend code', icon: '🔷', color: 'text-blue-600' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling', icon: '🎨', color: 'text-cyan-600' },
  { name: 'Recharts', desc: 'Data visualization', icon: '📊', color: 'text-purple-600' },
  { name: 'Vercel + Render', desc: 'Cloud deployment', icon: '☁️', color: 'text-gray-600' },
]

const TEAM = [
  { name: 'ML Engineer', role: 'Model Training & Optimization', icon: '🤖' },
  { name: 'Backend Dev', role: 'FastAPI & Data Pipeline', icon: '⚙️' },
  { name: 'Frontend Dev', role: 'UI/UX & Next.js', icon: '🎨' },
  { name: 'Data Analyst', role: 'Dataset & Insights', icon: '📊' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f3faff] flex flex-col font-sans text-on-surface">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Hero */}
          <div className="text-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">About</span>
            <h1 className="text-4xl font-black text-on-surface mt-3 mb-4">Smart Crop Recommendation System</h1>
            <p className="text-on-surface-variant text-base max-w-3xl mx-auto leading-relaxed">
              An AI-powered agricultural decision support system that leverages machine learning to help farmers make data-driven crop selection decisions.
            </p>
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div>
              <h2 className="text-2xl font-black text-on-surface mb-6">Project Overview</h2>
              <div className="space-y-4 text-on-surface-variant text-sm leading-relaxed">
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
                <div key={stat.label} className="bg-white rounded-2xl border border-outline-variant/40 p-6 text-center shadow-sm">
                  <p className="text-3xl font-black text-primary">{stat.icon}</p>
                  <p className="text-on-surface-variant text-xs mt-2 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ML Explanation */}
          <div className="text-left">
            <h2 className="text-2xl font-black text-on-surface mb-6">How the ML Model Works</h2>
            <div className="bg-white rounded-2xl border border-outline-variant/40 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Data Collection',
                    desc: 'The model was trained on a dataset of 2,200 samples covering all 22 crop types with varied soil and climate conditions.',
                    icon: '📊'
                  },
                  {
                    step: '2',
                    title: 'Random Forest Algorithm',
                    desc: 'We use a Random Forest Classifier with 200 decision trees. Each tree votes on the best crop, and the majority vote wins.',
                    icon: '🌲'
                  },
                  {
                    step: '3',
                    title: 'Confidence Score',
                    desc: 'The confidence score represents the percentage of trees that agreed on the recommendation, giving you reliability insights.',
                    icon: '📈'
                  },
                ].map(item => (
                  <div key={item.step} className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                      {item.step}
                    </div>
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <h3 className="text-on-surface font-bold mb-2 text-sm">{item.title}</h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-surface border border-outline-variant/30 text-xs">
                <p className="text-primary font-bold mb-1">Input Features</p>
                <p className="text-on-surface-variant">
                  Nitrogen (N), Phosphorus (P), Potassium (K), Temperature (°C), Humidity (%), pH level, Rainfall (mm)
                </p>
              </div>
            </div>
          </div>

          {/* Dataset Info */}
          <div className="text-left">
            <h2 className="text-2xl font-black text-on-surface mb-6">Dataset Information</h2>
            <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Dataset Size', value: '2,200 samples', desc: '100 samples per crop' },
                  { label: 'Crop Classes', value: '22 crops', desc: 'Major Indian crops' },
                  { label: 'Data Source', value: 'Kaggle / Research', desc: 'Verified agricultural data' },
                ].map(item => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-surface border border-outline-variant/10">
                    <p className="text-on-surface-variant/60 text-[10px] uppercase tracking-wide mb-2 font-bold">{item.label}</p>
                    <p className="text-on-surface font-bold text-md">{item.value}</p>
                    <p className="text-on-surface-variant/70 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-left">
            <h2 className="text-2xl font-black text-on-surface mb-6">Technologies Used</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.map(tech => (
                <div key={tech.name} className="bg-white rounded-2xl border border-outline-variant/40 p-4 hover:-translate-y-1 transition-all shadow-sm">
                  <span className="text-2xl mb-3 block">{tech.icon}</span>
                  <p className={`font-bold text-sm ${tech.color}`}>{tech.name}</p>
                  <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="text-left">
            <h2 className="text-2xl font-black text-on-surface mb-6">Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TEAM.map(member => (
                <div key={member.name} className="bg-white rounded-2xl border border-outline-variant/40 p-6 text-center shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mx-auto mb-3 text-primary">
                    {member.icon}
                  </div>
                  <p className="text-on-surface font-bold text-sm">{member.name}</p>
                  <p className="text-on-surface-variant/70 text-xs mt-1">{member.role}</p>
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
