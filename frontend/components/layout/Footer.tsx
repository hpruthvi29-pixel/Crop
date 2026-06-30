import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg text-white">🌱</span>
              </div>
              <span className="font-extrabold text-primary text-xl tracking-tight">AgriPrecise</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Precision agriculture platform helping farmers make data-driven decisions for better crop yields and sustainable farming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-on-surface font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/recommend', label: 'Get Recommendation' },
                { href: '/encyclopedia', label: 'Crop Encyclopedia' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-on-surface-variant hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-on-surface font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Project' },
                { href: '/contact', label: 'Contact Support' },
                { href: '/history', label: 'My Predictions' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-on-surface-variant hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-on-surface font-semibold mb-4 text-sm uppercase tracking-wider">System</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-on-surface-variant text-sm">22 Crops Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-on-surface-variant text-sm">ML-Powered Predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tertiary" />
                <span className="text-on-surface-variant text-sm">Real-time Analysis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} AgriPrecise. Built with ❤️ for modern farming.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-on-surface-variant/60 text-xs">Powered by</span>
            <span className="text-primary text-xs font-mono">Next.js + FastAPI + Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
