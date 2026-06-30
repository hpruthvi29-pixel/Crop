import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'
import MobileDashboardNav from '@/components/layout/MobileDashboardNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-[#f3faff]">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-outline-variant/30 bg-white sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-white text-md">🌱</span>
            </div>
            <span className="font-extrabold text-primary text-lg tracking-tight">AgriPrecise</span>
          </div>
          <MobileDashboardNav />
        </div>

        <div className="p-4 md:p-6 lg:p-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  )
}
