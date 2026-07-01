import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Decorative gold accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />

      <div className="bg-gradient-to-b from-[#0f3d1f] to-[#0a1f10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1 animate-fade-in-up">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  <svg className="w-5 h-5 text-[#d4a853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8c.7-1 1.3-2.2 1.7-3.5C15.5 3.5 12 5 10 8c-1.5 2.2-2 5-1.5 7.5" />
                    <path d="M5.5 21c1.5-5 4-8 8-10" />
                    <path d="M17 8c-3 0-5.5 1-8 3" />
                    <path d="M6 16c1-1.5 3-3 5-3.5" />
                  </svg>
                </div>
                <span className="font-extrabold text-white text-xl tracking-tight">AgriPrecise</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Precision agriculture platform helping farmers make data-driven decisions for better crop yields and sustainable farming.
              </p>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in-up delay-100">
              <h3 className="text-white/90 font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/recommend', label: 'Get Recommendation' },
                  { href: '/encyclopedia', label: 'Crop Encyclopedia' },
                  { href: '/dashboard', label: 'Dashboard' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-[#d4a853] text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-white/90 font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/about', label: 'About Project' },
                  { href: '/contact', label: 'Contact Support' },
                  { href: '/history', label: 'My Predictions' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-[#d4a853] text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-300">
              <h3 className="text-white/90 font-semibold mb-4 text-sm uppercase tracking-wider">System</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#2d8f5e] shadow-[0_0_6px_rgba(45,143,94,0.5)]" />
                  <span className="text-white/60 text-sm">22 Crops Supported</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#d4a853] shadow-[0_0_6px_rgba(212,168,83,0.5)]" />
                  <span className="text-white/60 text-sm">ML-Powered Predictions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#c8965c] shadow-[0_0_6px_rgba(200,150,92,0.5)]" />
                  <span className="text-white/60 text-sm">Real-time Analysis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} AgriPrecise. Built with ❤️ for modern farming.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-white/30 text-xs">Powered by</span>
              <span className="text-[#d4a853]/70 text-xs font-mono">Next.js + FastAPI + Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
