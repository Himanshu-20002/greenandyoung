'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, LogOut, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useSessionContext } from '@/components/session-provider'
import TopBar from './TopBar'
import { siteConfig } from '@/lib/site-config'

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { session } = useSessionContext()

  const primaryNavLinks = [
    { href: '#services', label: 'Designs' },
    { href: '#gallery', label: 'Portfolio' },
    { href: '#transformations', label: 'Transformations' },
    { href: '#about', label: 'About' },
  ]

  const mobileNavLinks = [
    { href: '#services', label: 'Designs & Services' },
    { href: '#gallery', label: 'Portfolio' },
    { href: '#transformations', label: 'Room Transformations' },
    { href: '#wall-of-fame', label: 'Wall of Fame' },
    { href: '#why-choose-us', label: 'Why G&Y' },
    { href: '#about', label: 'About Us' },
    { href: '#reviews', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact Studio' },
  ]

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.reload()
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 transition-all">
      <TopBar />
      <div className="bg-white backdrop-blur-xl border-b border-[#FAF8F5]/30 shadow-md transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center text-[#0A140F] group flex-shrink-0">
            <Image
              src={siteConfig.assets.logo}
              alt={`${siteConfig.name} Logo`}
              width={180}
              height={42}
              style={{ width: 'auto' }}
              className="object-contain h-8 sm:h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Minimal Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {primaryNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#0A140F]/85 hover:text-[#0A140F] transition-colors duration-200 text-[13px] font-bold tracking-wide relative py-1 hover:drop-shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Minimal Action Area */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {session && (
              <div className="flex items-center gap-3">
                {(session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN') && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A140F]/15 hover:bg-[#0A140F]/25 text-[#0A140F] text-xs font-bold tracking-wide transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#0A140F]" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-[#0A140F]/60 hover:text-red-700 text-xs p-1 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <a
              href="#booking"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0A140F] hover:bg-[#15241D] text-[#FAF8F5] font-bold text-xs tracking-wide shadow-md hover:shadow-xl transition-all duration-300"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#0A140F] hover:text-black p-2 rounded-lg hover:bg-black/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile & Expanded Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A140F]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex flex-col gap-3">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium text-sm py-1.5 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Auth / Admin */}
              <div className="pt-2 flex flex-col gap-2">
                {session ? (
                  <>
                    <div className="text-white/50 text-xs">
                      Logged in as {session.user.name}
                    </div>
                    {(session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN') && (
                      <Link
                        href="/admin"
                        className="text-[#C5A880] text-xs font-semibold uppercase tracking-wider py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Console
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="text-red-400 hover:text-red-300 text-left text-xs uppercase tracking-wider py-1 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="text-[#C5A880] text-xs font-medium py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>

              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-3 rounded-full bg-[#E4D7BE] hover:bg-white text-[#0A140F] font-semibold text-xs tracking-wide shadow-md transition-all block"
              >
                Book Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}


