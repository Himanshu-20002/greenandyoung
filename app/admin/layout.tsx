'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Package, MessageSquare, LogOut, Shield, Users, Mail, Sliders, Sun, Moon, Menu, X, Sparkles, Tag, Image as GalleryIcon, BookOpen } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Default to dark mode for studio luxury aesthetic
      setTheme('dark')
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('admin-theme', nextTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0D0C0B] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-accent border-accent/20 animate-spin" />
          <span className="font-serif text-[10px] uppercase tracking-widest text-accent font-bold">Loading Panel</span>
        </div>
      </div>
    )
  }

  const navLinks = [
    {
      group: 'General',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      group: 'Experience Studio',
      items: [
        { href: '/admin/studio/hero', label: 'Hero Slides', icon: Sparkles },
        { href: '/admin/studio/promotions', label: 'Promotions', icon: Tag },
        { href: '/admin/studio/lookbook', label: 'Lookbook Manager', icon: BookOpen },
        { href: '/admin/studio/gallery', label: 'Gallery Manager', icon: GalleryIcon },
        { href: '/admin/studio/before-after', label: 'Before/After Slider', icon: Sliders },
        { href: '/admin/studio/settings', label: 'Site Settings', icon: Sliders },
      ]
    },
    {
      group: 'Catalog',
      items: [
        { href: '/admin/catalog/categories', label: 'Categories', icon: Sliders },
        { href: '/admin/catalog/packages', label: 'Packages', icon: Package },
        { href: '/admin/catalog/services', label: 'Services', icon: Package },
      ]
    },
    {
      group: 'Operations',
      items: [
        { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
        { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
        { href: '/admin/people/staff', label: 'Staff', icon: Users },
      ]
    },
    {
      group: 'Marketing & CRM',
      items: [
        { href: '/admin/marketing/inquiries', label: 'Inquiries', icon: MessageSquare },
        { href: '/admin/marketing/newsletter', label: 'Newsletter', icon: Mail },
      ]
    }
  ]

  return (
    <div className={theme}>
      <div className="min-h-screen bg-background text-foreground flex font-sans transition-colors duration-300 overflow-x-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card flex flex-col justify-between flex-shrink-0 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-0 lg:translate-x-0'} 
          lg:block transition-all duration-300 ease-in-out
        `}>
          <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 shadow-inner">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="font-serif font-extrabold text-xs sm:text-sm tracking-widest uppercase block text-foreground">
                    Green &amp; Young Admin
                  </span>
                  <span className="text-[8px] text-accent tracking-widest font-extrabold uppercase block mt-0.5">
                    Executive Portal
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="lg:hidden p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
              {navLinks.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <span className="px-4 text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 block mb-1">
                    {group.group}
                  </span>
                  {group.items.map((link) => {
                    const isActive = pathname === link.href
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 group
                          ${isActive 
                            ? 'bg-accent/10 text-accent border border-accent/20 shadow-sm' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'}`} />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Return to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Panel Content */}
        <main className="flex-grow flex flex-col min-w-0 bg-background transition-colors duration-300">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between transition-colors duration-300 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-all cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-serif text-sm sm:text-base font-bold tracking-widest uppercase text-foreground">
                Management Panel
              </h1>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Sun / Moon Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 border border-border rounded-xl bg-card hover:bg-muted transition-all cursor-pointer text-accent flex items-center justify-center shadow-sm"
                title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="block text-xs font-bold leading-none text-foreground">Administrator</span>
                  <span className="block text-[9px] text-muted-foreground tracking-wider uppercase mt-1">Super Admin</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground font-extrabold text-xs flex items-center justify-center border border-accent/20 shadow-md">
                  SA
                </div>
              </div>
            </div>
          </header>

          {/* View Grid */}
          <div className="p-6 sm:p-8 flex-grow overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
