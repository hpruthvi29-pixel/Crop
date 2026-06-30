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
    <div className="min-h-screen bg-[#f3faff] flex flex-col font-sans text-on-surface">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Contact & Support</span>
            <h1 className="text-4xl sm:text-5xl font-black text-on-surface mt-3 mb-4">Get in Touch</h1>
            <p className="text-on-surface-variant text-base max-w-2xl mx-auto">
              Have questions about the crop recommendation system or need assistance? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm relative overflow-hidden">
              <h2 className="text-xl font-extrabold text-on-surface mb-6">Send us a Message</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-on-surface font-bold mb-2">Message Sent!</h3>
                  <p className="text-on-surface-variant text-xs">Thank you for contacting us. We will get back to you soon.</p>
                  <button 
                    onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSubmitted(false) }}
                    className="mt-6 text-primary hover:underline text-xs font-bold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-2">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-2">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-2">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      placeholder="Your message details..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-outline-variant text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-sm"
                    />
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-[#a3f69c] text-black font-bold text-sm hover:bg-[#88d982] transition-all shadow-sm disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
 
            {/* FAQs */}
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-on-surface mb-2">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-outline-variant/40 p-5 shadow-sm">
                    <h3 className="text-on-surface font-extrabold text-xs mb-2">{faq.question}</h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{faq.answer}</p>
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
