'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'

// ─── Agricultural Knowledge Base ─────────────────────────────────────────────
const CROP_KB: Record<string, { n: string; p: string; k: string; temp: string; ph: string; rain: string; soil: string; season: string }> = {
  rice:       { n: '80-120', p: '40-60', k: '40-60', temp: '20-35°C', ph: '5.0-7.0', rain: '150-200mm', soil: 'Clayey', season: 'Kharif' },
  wheat:      { n: '100-150', p: '50-70', k: '40-50', temp: '15-25°C', ph: '6.0-7.5', rain: '75-100mm', soil: 'Loamy', season: 'Rabi' },
  maize:      { n: '80-120', p: '30-50', k: '30-50', temp: '18-32°C', ph: '5.5-7.0', rain: '60-110mm', soil: 'Sandy Loam', season: 'Kharif' },
  chickpea:   { n: '20-40', p: '40-60', k: '20-40', temp: '20-30°C', ph: '6.0-8.0', rain: '60-90mm', soil: 'Sandy Loam', season: 'Rabi' },
  cotton:     { n: '100-150', p: '50-70', k: '50-70', temp: '25-35°C', ph: '5.8-7.5', rain: '80-120mm', soil: 'Black', season: 'Kharif' },
  sugarcane:  { n: '150-250', p: '60-100', k: '100-150', temp: '24-32°C', ph: '6.0-7.5', rain: '150-200mm', soil: 'Loamy', season: 'Zaid' },
  mango:      { n: '50-100', p: '30-60', k: '50-80', temp: '24-32°C', ph: '5.5-7.5', rain: '75-125mm', soil: 'Alluvial', season: 'Summer' },
  banana:     { n: '100-200', p: '40-80', k: '200-300', temp: '26-35°C', ph: '5.5-7.0', rain: '100-200mm', soil: 'Rich Loam', season: 'Year-round' },
  coffee:     { n: '50-100', p: '30-50', k: '50-100', temp: '18-24°C', ph: '5.0-6.5', rain: '150-250mm', soil: 'Volcanic', season: 'Year-round' },
  coconut:    { n: '50-100', p: '30-60', k: '100-150', temp: '27-32°C', ph: '5.5-8.0', rain: '100-200mm', soil: 'Sandy', season: 'Year-round' },
  grapes:     { n: '40-80', p: '30-60', k: '50-100', temp: '15-30°C', ph: '6.0-7.5', rain: '60-90mm', soil: 'Well-drained Loam', season: 'Rabi' },
  watermelon: { n: '50-80', p: '30-50', k: '50-80', temp: '24-30°C', ph: '6.0-7.5', rain: '40-60mm', soil: 'Sandy', season: 'Kharif' },
  mungbean:   { n: '20-30', p: '40-60', k: '20-40', temp: '25-35°C', ph: '6.2-7.2', rain: '60-90mm', soil: 'Sandy Loam', season: 'Kharif' },
  blackgram:  { n: '20-30', p: '40-60', k: '20-40', temp: '25-35°C', ph: '6.0-7.5', rain: '60-80mm', soil: 'Loam', season: 'Kharif' },
  lentil:     { n: '20-30', p: '40-60', k: '20-40', temp: '18-28°C', ph: '6.0-8.0', rain: '40-80mm', soil: 'Loamy', season: 'Rabi' },
  pomegranate:{ n: '50-100', p: '30-60', k: '50-100', temp: '20-35°C', ph: '5.5-7.5', rain: '50-80mm', soil: 'Sandy Loam', season: 'Summer' },
  orange:     { n: '50-100', p: '30-60', k: '50-100', temp: '18-28°C', ph: '6.0-7.5', rain: '90-120mm', soil: 'Alluvial', season: 'Rabi' },
  papaya:     { n: '100-150', p: '40-80', k: '80-120', temp: '25-35°C', ph: '6.0-7.0', rain: '100-150mm', soil: 'Sandy Loam', season: 'Year-round' },
  mothbeans:  { n: '20-30', p: '40-50', k: '20-30', temp: '30-42°C', ph: '6.0-7.5', rain: '30-60mm', soil: 'Sandy', season: 'Kharif' },
  pigeonpeas: { n: '20-40', p: '40-60', k: '20-40', temp: '20-35°C', ph: '5.0-7.5', rain: '60-150mm', soil: 'Loam', season: 'Kharif' },
  kidneybeans:{ n: '20-30', p: '40-60', k: '20-40', temp: '16-24°C', ph: '5.5-7.0', rain: '60-80mm', soil: 'Loam', season: 'Rabi' },
  jute:       { n: '50-80', p: '30-50', k: '30-50', temp: '25-35°C', ph: '6.0-7.5', rain: '150-200mm', soil: 'Loamy', season: 'Kharif' },
}

// ─── Quick Reply Suggestions per language ────────────────────────────────────
const QUICK_REPLIES: Record<string, string[]> = {
  en: ['What is Nitrogen?', 'Best crop for Sandy soil?', 'Rice growing conditions?', 'How to test soil pH?', 'What is NPK?'],
  hi: ['नाइट्रोजन क्या है?', 'रेतीली मिट्टी के लिए सबसे अच्छी फसल?', 'चावल उगाने की स्थिति?', 'मिट्टी का pH कैसे जांचें?', 'NPK क्या है?'],
  kn: ['ಸಾರಜನಕ ಎಂದರೇನು?', 'ಮರಳು ಮಣ್ಣಿಗೆ ಉತ್ತಮ ಬೆಳೆ?', 'ಅಕ್ಕಿ ಬೆಳೆಯುವ ಪರಿಸ್ಥಿತಿ?', 'ಮಣ್ಣಿನ pH ಪರೀಕ್ಷೆ ಹೇಗೆ?', 'NPK ಎಂದರೇನು?'],
  ta: ['நைட்ரஜன் என்றால் என்ன?', 'மணல் மண்ணுக்கு சிறந்த பயிர்?', 'அரிசி வளரும் சூழல்?', 'மண் pH எவ்வாறு சோதிக்கலாம்?', 'NPK என்றால் என்ன?'],
  te: ['నత్రజని అంటే ఏమిటి?', 'ఇసుక నేలకు ఉత్తమ పంట?', 'వరి పెరిగే పరిస్థితులు?', 'నేల pH ఎలా పరీక్షించాలి?', 'NPK అంటే ఏమిటి?'],
}

// ─── Knowledge base lookup ────────────────────────────────────────────────────
function getAgriAnswer(question: string): string {
  const q = question.toLowerCase()

  // Check crop-specific query
  for (const [crop, info] of Object.entries(CROP_KB)) {
    if (q.includes(crop)) {
      return `**${crop.charAt(0).toUpperCase() + crop.slice(1)}** growing conditions:\n\n🧪 N: ${info.n} kg/ha | P: ${info.p} kg/ha | K: ${info.k} kg/ha\n🌡️ Temperature: ${info.temp}\n🔬 Soil pH: ${info.ph}\n🌧️ Rainfall: ${info.rain}\n🪨 Soil Type: ${info.soil}\n📅 Season: ${info.season}\n\nWould you like me to run a full AI prediction for these parameters?`
    }
  }

  // Nitrogen
  if (q.includes('nitrogen') || q.includes('नाइट्रोजन') || q.includes('ಸಾರಜನಕ') || q.includes('நைட்ரஜன்') || q.includes('నత్రజని')) {
    return '**Nitrogen (N)** is the primary macronutrient responsible for:\n\n🌿 Leaf and stem growth\n🟢 Chlorophyll production (green color)\n📈 Overall vegetative growth\n\n**Soil Range:** 0–140 kg/ha\n**Low (<40):** Add Urea or DAP\n**High (>120):** Risk of excessive foliage, reduced fruiting'
  }

  // Phosphorus
  if (q.includes('phosphorus') || q.includes('फास्फोरस') || q.includes('ರಂಜಕ') || q.includes('பாஸ்பரஸ்') || q.includes('భాస్వరం')) {
    return '**Phosphorus (P)** is essential for:\n\n🌱 Root development and establishment\n🌸 Flowering and fruit set\n💪 Energy transfer in plants\n\n**Soil Range:** 0–145 kg/ha\n**Sources:** DAP, Single Superphosphate (SSP)\n**Best applied:** At sowing time near the root zone'
  }

  // Potassium
  if (q.includes('potassium') || q.includes('पोटेशियम') || q.includes('ಪೊಟ್ಯಾಸಿಯಮ್') || q.includes('பொட்டாசியம்') || q.includes('పొటాషియం')) {
    return '**Potassium (K)** strengthens:\n\n🛡️ Disease resistance\n💧 Water regulation (drought tolerance)\n🍎 Fruit quality and shelf life\n\n**Soil Range:** 0–205 kg/ha\n**Sources:** Muriate of Potash (MOP), Sulphate of Potash (SOP)'
  }

  // NPK
  if (q.includes('npk') || q.includes('एनपीके') || q.includes('NPK')) {
    return '**NPK** stands for the three essential macronutrients:\n\n🔵 **N** - Nitrogen: Leaf growth & chlorophyll\n🟡 **P** - Phosphorus: Root & flower development\n🟢 **K** - Potassium: Disease resistance & fruit quality\n\nThese three are applied together as a balanced fertilizer. A 10:26:26 NPK ratio is common for most Indian field crops at sowing.'
  }

  // pH
  if (q.includes('ph') || q.includes('पीएच') || q.includes('ਪੀ.ਐਚ.') || q.includes('酸碱度')) {
    return '**Soil pH** measures acidity/alkalinity:\n\n🟢 **6.0–7.0:** Ideal for most crops (slight acidity)\n🔴 **< 5.5:** Too acidic – add lime (CaCO₃)\n🟡 **> 7.5:** Too alkaline – add gypsum or sulphur\n\n**Test Method:** Use a soil pH meter or send to a soil testing lab. Collect samples from 4–6 spots in the field at 0–15 cm depth.'
  }

  // Sandy soil
  if (q.includes('sandy') || q.includes('रेतीली') || q.includes('ಮರಳು') || q.includes('மணல்') || q.includes('ఇసుక')) {
    return '**Best crops for Sandy soil:**\n\n🌾 Watermelon, Mungbean, Mothbeans\n🥜 Groundnuts, Chickpea\n🫚 Sesame, Sunflower\n\nSandy soils drain fast, so choose drought-tolerant crops and apply organic matter (FYM) regularly to improve water retention.'
  }

  // Rainfall
  if (q.includes('rainfall') || q.includes('rain') || q.includes('वर्षा') || q.includes('ಮಳೆ') || q.includes('மழை') || q.includes('వర్షం')) {
    return '**Rainfall requirements for common crops:**\n\n🌾 Rice: 150–200 mm\n🌿 Wheat: 75–100 mm\n🌽 Maize: 60–110 mm\n🫘 Chickpea: 60–90 mm\n☕ Coffee: 150–250 mm\n🍌 Banana: 100–200 mm\n\nFor low-rainfall areas (<60mm), choose drought-resistant crops like mothbeans, sorghum, or finger millet.'
  }

  // Temperature
  if (q.includes('temperature') || q.includes('temp') || q.includes('तापमान') || q.includes('ತಾಪಮಾನ') || q.includes('வெப்பநிலை') || q.includes('ఉష్ణోగ్రత')) {
    return '**Temperature guide for key crops:**\n\n🌾 Rice: 20–35°C (tropical)\n🌿 Wheat: 15–25°C (cool)\n🌽 Maize: 18–32°C (warm)\n☕ Coffee: 18–24°C (cool hills)\n🍬 Sugarcane: 24–32°C (tropical)\n\nHigher temperatures generally require more water. Avoid transplanting rice in temperatures below 20°C.'
  }

  // Fertilizer
  if (q.includes('fertilizer') || q.includes('fertiliser') || q.includes('उर्वरक') || q.includes('ಗೊಬ್ಬರ') || q.includes('உரம்') || q.includes('ఎరువు')) {
    return '**Common Fertilizers in India:**\n\n🔵 **Urea (46% N):** Cheapest nitrogen source, split-apply in 2–3 doses\n🟡 **DAP (18:46:0):** High phosphorus, best at sowing\n🟢 **MOP (60% K₂O):** Potassium source, good for fruits\n⚪ **SSP (16% P₂O₅):** Low-cost phosphorus + sulphur\n🌿 **FYM / Compost:** Organic option, improves soil health\n\n*Always apply as per soil test recommendations.*'
  }

  // Soil type
  if (q.includes('soil type') || q.includes('soil') || q.includes('मिट्टी') || q.includes('ಮಣ್ಣು') || q.includes('மண்') || q.includes('నేల')) {
    return '**Major Soil Types in India:**\n\n🖤 **Black (Regur):** Cotton, soybean – Maharashtra, MP\n🟫 **Red Laterite:** Groundnut, millet – AP, Karnataka\n🟡 **Alluvial:** Wheat, rice, sugarcane – Indo-Gangetic Plain\n🏜️ **Sandy (Arid):** Drought crops – Rajasthan\n🌿 **Forest (Acidic):** Tea, coffee – Assam, Kerala\n\nKnowing your soil type helps pick the right crops and amendments.'
  }

  // Season
  if (q.includes('kharif') || q.includes('rabi') || q.includes('zaid') || q.includes('season') || q.includes('मौसम') || q.includes('ಕಾಲ') || q.includes('பருவம்')) {
    return '**Indian Crop Seasons:**\n\n☀️ **Kharif (Jun–Oct):** Rice, Maize, Cotton, Soybean – rainy season crops\n❄️ **Rabi (Nov–Apr):** Wheat, Chickpea, Mustard – winter crops\n🌤️ **Zaid (Mar–Jun):** Watermelon, Cucumber, Sugarcane – short summer crops\n\nKharif relies on monsoon rains. Rabi crops need cooler temperatures and irrigation.'
  }

  // How to use
  if (q.includes('how') || q.includes('help') || q.includes('use') || q.includes('start') || q.includes('कैसे') || q.includes('ಹೇಗೆ')) {
    return '**How to use AgriPrecise:**\n\n1. 🧪 Go to **Soil Lab** and enter your soil readings (N, P, K, pH, temperature, humidity, rainfall)\n2. 🤖 Our AI will instantly recommend the best crop\n3. 📊 View detailed results with growing guide, fertilizer schedule, and alternatives\n4. 📋 All predictions are saved in your **History** tab\n\nNeed a soil test? Contact your local Krishi Vigyan Kendra (KVK) or use a soil testing kit!'
  }

  // Greeting
  if (q.includes('hello') || q.includes('hi') || q.includes('नमस्ते') || q.includes('ನಮಸ್ಕಾರ') || q.includes('வணக்கம்') || q.includes('నమస్కారం')) {
    return 'Hello! 👋 I am AgriPrecise Assistant, your AI farming guide.\n\nI can help you with:\n🌾 Crop growing conditions\n🧪 Soil nutrient explanations (N, P, K)\n💧 Water & fertilizer requirements\n📅 Crop seasons & soil types\n\nJust type your question or pick from the suggestions below!'
  }

  // Default fallback
  return `I couldn't find a specific answer for *"${question}"*.\n\nHere are some things I can help with:\n• Growing conditions for specific crops (e.g., "Rice conditions")\n• Nutrient explanations (Nitrogen, Phosphorus, Potassium)\n• Soil types and pH ranges\n• Seasonal crop planning (Kharif, Rabi, Zaid)\n• Fertilizer recommendations\n\nTry the **Soil Lab** for a full AI-powered prediction! 🌾`
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ─── Markdown-ish renderer ────────────────────────────────────────────────────
function RenderMessage({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1 text-xs leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-extrabold text-on-surface">{line.replace(/\*\*/g, '')}</p>
        }
        if (line.startsWith('**') && line.includes('**')) {
          const parts = line.split('**')
          return (
            <p key={i}>
              {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-on-surface">{p}</strong> : <span key={j}>{p}</span>)}
            </p>
          )
        }
        if (line.startsWith('•') || line.startsWith('-')) {
          return <p key={i} className="flex gap-1.5 items-start"><span className="mt-0.5">•</span><span>{line.replace(/^[•-]\s*/, '')}</span></p>
        }
        if (line.startsWith('🌾') || line.startsWith('🧪') || line.startsWith('🌡') || line.startsWith('🔬') || line.startsWith('🌧') || line.startsWith('🪨') || line.startsWith('📅') || line.startsWith('🌿') || line.startsWith('🟢') || line.startsWith('🔵') || line.startsWith('🟡') || line.startsWith('🛡') || line.startsWith('💧') || line.startsWith('🍎') || line.startsWith('☀') || line.startsWith('❄') || line.startsWith('🌤')) {
          return <p key={i} className="flex gap-1.5 items-start">{line}</p>
        }
        if (line.trim() === '') return <div key={i} className="h-1" />
        return <p key={i}>{line}</p>
      })}
    </div>
  )
}

// ─── Main Chatbot Component ───────────────────────────────────────────────────
export default function AgriBot() {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message (refresh when language changes)
  useEffect(() => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: t('chatWelcome'),
      timestamp: new Date(),
    }])
  }, [language]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const handleSend = async (text?: string) => {
    const question = (text ?? input).trim()
    if (!question) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400))

    const answer = getAgriAnswer(question)
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: answer,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, botMsg])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickReplies = QUICK_REPLIES[language] || QUICK_REPLIES['en']
  const hasOnlyWelcome = messages.length <= 1

  return (
    <>
      {/* Floating Button */}
      <button
        id="agribot-toggle"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 select-none',
          open
            ? 'bg-gray-700 text-white rotate-180 scale-90'
            : 'bg-[#0d631b] text-white hover:scale-110 hover:shadow-2xl'
        )}
        title="AgriPrecise Assistant"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">🌾</span>
        )}
        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#a3f69c] rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-[9998] sm:w-[390px] max-h-[580px] h-[75vh] sm:h-auto flex flex-col bg-white rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0d631b] text-white">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
              🌾
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm truncate">{t('chatTitle')}</p>
              <p className="text-white/70 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3f69c] inline-block animate-pulse" />
                Online • Agronomy AI
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f3faff] min-h-0" style={{ maxHeight: '380px' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-2 items-end',
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  'w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold',
                  msg.role === 'user'
                    ? 'bg-[#0d631b] text-white'
                    : 'bg-[#a3f69c] text-[#0d631b]'
                )}>
                  {msg.role === 'user' ? '👤' : '🌾'}
                </div>

                {/* Bubble */}
                <div className={cn(
                  'max-w-[80%] px-3 py-2.5 rounded-2xl',
                  msg.role === 'user'
                    ? 'bg-[#0d631b] text-white rounded-tr-md'
                    : 'bg-white border border-outline-variant/30 text-on-surface rounded-tl-md shadow-sm'
                )}>
                  {msg.role === 'assistant' ? (
                    <RenderMessage text={msg.content} />
                  ) : (
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                  )}
                  <p className={cn(
                    'text-[9px] mt-1 text-right',
                    msg.role === 'user' ? 'text-white/60' : 'text-on-surface-variant/50'
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-[#a3f69c] text-[#0d631b] text-sm">🌾</div>
                <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {hasOnlyWelcome && !isTyping && (
            <div className="px-4 py-2 border-t border-outline-variant/20 bg-white">
              <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-wider mb-2 font-bold">Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[10px] px-2.5 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary font-semibold hover:bg-primary/15 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-outline-variant/20 bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chatPlaceholder')}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-surface text-on-surface placeholder-on-surface-variant/40 border border-outline-variant/30 focus:outline-none focus:border-primary text-xs transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-[#0d631b] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#0a5218] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
