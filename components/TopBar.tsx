import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { siteConfig } from '@/lib/site-config';

function InstagramIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#0E2A1B] via-[#14391F] to-[#0E2A1B] text-neutral-200 text-xs py-2 px-4 border-b border-[#DFBA73]/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Side: Status & Contact */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5">
          <span className="inline-flex items-center gap-2 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
            </span>
            <strong className="text-white font-semibold">
              {siteConfig.hours.statusText}
            </strong>
          </span>
          <span className="hidden sm:inline-block text-[#DFBA73]/40">|</span>
          <a
            href={`tel:${siteConfig.phone.primaryRaw}`}
            className="hover:text-[#FFEAA7] transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#DFBA73]" /> {siteConfig.phone.primary}
          </a>
          <a
            href={`mailto:${siteConfig.email.info}`}
            className="hover:text-[#FFEAA7] transition-colors hidden md:flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#DFBA73]" /> {siteConfig.email.info}
          </a>
        </div>

        {/* Right Side: Location & Social */}
        <div className="flex items-center gap-4">
          <span className="text-neutral-300 hidden lg:inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#DFBA73]" /> {siteConfig.address.displayShort}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-[#DFBA73] transition-colors flex items-center"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={siteConfig.whatsapp.directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
