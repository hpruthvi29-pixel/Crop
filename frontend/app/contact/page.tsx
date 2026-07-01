'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FAQS = [
  {
    question: 'How accurate is the crop recommendation?',
    answer: 'The Random Forest model achieves over 95% accuracy on our validation dataset. However, actual yield depends on other external factors like seed quality, pests, and local farming practices.',
  },
  {
    question: 'Where does the soil and climate data come from?',
    answer: 'Farmers can get nitrogen (N), phosphorus (P), potassium (K), and pH levels from a standard soil testing laboratory report. Temperature, humidity, and rainfall can be obtained from local meteorological reports or historical climate averages.',
  },
  {
    question: 'What do N, P, and K values stand for?',
    answer: 'N stands for Nitrogen, P stands for Phosphorus, and K stands for Potassium. These are the three primary macronutrients required by crops to survive, grow, and yield properly.',
  },
  {
    question: 'Can I export the recommendation as a PDF report?',
    answer: 'Yes! After receiving your recommendation on the results page, you can click the "Download PDF Report" button to download a complete growing guide with your input values.',
  },
  {
    question: 'Is my data saved?',
    answer: 'Yes, if you are logged in, your predictions are automatically saved to your private history dashboard. You can review or delete these predictions at any time.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API contact submission
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-[#1a1a1a]">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center animate-fade-in-up">
            <span className="text-xs font-bold text-[#c8965c] tracking-widest uppercase flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8965c] animate-pulse"></span>
              Contact & Support
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">Get in Touch</h1>
            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Have questions about the crop recommendation system or need assistance? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left animate-fade-in-up delay-100">
            
            {/* Contact Form */}
            <div className="premium-card p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1a6b3c] to-[#2d8f5e]"></div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 flex items-center gap-2">
                <span className="bg-[#1a6b3c]/10 text-[#1a6b3c] p-1.5 rounded-lg text-lg">✉️</span> Send a Message
              </h2>
              {submitted ? (
                <div className="text-center py-16 bg-[#faf8f4] rounded-2xl border border-stone-200/60 shadow-inner">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-[#1a1a1a] font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-[#6b7280] text-sm font-medium">Thank you for contacting us. We will get back to you soon.</p>
                  <button 
                    onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSubmitted(false) }}
                    className="mt-6 text-[#1a6b3c] hover:text-[#2d8f5e] hover:underline text-sm font-bold transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-2">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#faf8f4] border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/60 focus:outline-none focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20 transition-all text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-2">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#faf8f4] border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/60 focus:outline-none focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20 transition-all text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-2">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#faf8f4] border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/60 focus:outline-none focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20 transition-all text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      placeholder="Your message details..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#faf8f4] border border-stone-200 text-[#1a1a1a] placeholder-[#6b7280]/60 focus:outline-none focus:border-[#1a6b3c] focus:ring-2 focus:ring-[#1a6b3c]/20 transition-all resize-none text-sm font-medium"
                    />
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="gradient-btn w-full h-14 mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
 
            {/* FAQs */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <span className="bg-[#c8965c]/10 text-[#c8965c] p-1.5 rounded-lg text-lg">❓</span> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200/60 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#c8965c]/40 hover:shadow-md transition-all group">
                    <h3 className="text-[#1a1a1a] font-bold text-sm mb-3 flex items-start gap-2">
                      <span className="text-[#c8965c] opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                      {faq.question}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed font-medium pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
 
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
