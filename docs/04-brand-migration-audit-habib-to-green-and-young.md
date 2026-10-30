# 04. Brand Migration Audit: Habibs to Green & Young

This document lists every file, line number, text string, asset, and API configuration currently referencing the legacy brand ("Habibs", "Habibs Hair & Beauty Salon", "Habibs Premiere") or residual template copy, paired with the target configuration for **Green and Young**.

---

## 1. Critical Discrepancies Found in Audit

> [!WARNING]
> During codebase analysis, two distinct sets of legacy copy were detected:
> 1. **Legacy Brand References**: ~30+ instances of "Habibs", "habibssalon.com", and legacy salon tags across components, layouts, metadata, emails, and database seed scripts.
> 2. **Residual Template Snippets**: In `components/TopBar.tsx`, lines 36–49 contain placeholder content from an exhibition stall fabrication company (`"24/7 Stall Fabrication & Support Active"`, `"info@ssgroupexhibition.com"`, and `"HQ: Delhi, India"`).
> Both must be cleanly updated to reflect **Green and Young Salon**.

---

## 2. File-by-File Brand Audit & Replacement Inventory

### Group A: Layout, SEO & Root Metadata

| File Path | Line(s) | Current Legacy Value | Proposed Green & Young Value |
| :--- | :--- | :--- | :--- |
| `app/layout.tsx` | 10 | `title: 'Habibs Hair & Beauty Salon \| Premium Hair & Beauty Services'` | `title: 'Green and Young Salon \| Premium Hair, Beauty & Wellness'` |
| `app/layout.tsx` | 11 | `description: '...trusted by 191+ customers...'` | Update with Green and Young luxury description |
| `app/layout.tsx` | 12 | `keywords: '...Habibs Greater Noida...'` | Update keywords for Green and Young |
| `app/layout.tsx` | 30, 34 | `siteName: 'Habibs Hair & Beauty Salon'` | `siteName: 'Green and Young Salon'` |
| `app/layout.tsx` | 37, 38 | `icon: '/images/habibs.webp'` | `icon: '/images/green-and-young-logo.webp'` |
| `app/layout.tsx` | 82–90 | JSON-LD Schema: `"name": "Habibs Hair & Beauty Salon"`, `"url": "https://habibssalon.com"` | `"name": "Green and Young Salon"`, `"url": "https://greenandyoung.com"` |
| `app/layout.tsx` | 106 | `"name": "Habibs Hair & Beauty Salon Services"` | `"name": "Green and Young Salon Services"` |
| `public/robots.txt` | 2 | `Sitemap: https://habibssalon.com/sitemap.xml` | `Sitemap: https://greenandyoung.com/sitemap.xml` |
| `public/sitemap.xml`| 3, 7 | `https://habibssalon.com` | `https://greenandyoung.com` |

---

### Group B: UI Components & Navigation

| File Path | Line(s) | Current Legacy Value | Proposed Green & Young Value |
| :--- | :--- | :--- | :--- |
| `components/TopBar.tsx` | 36 | `"24/7 Stall Fabrication & Support Active"` | `"Luxury Appointments & Walk-ins Welcome"` |
| `components/TopBar.tsx` | 40–44 | `+91 96613 78767` | Official Green and Young Phone Number |
| `components/TopBar.tsx` | 47–50 | `info@ssgroupexhibition.com` | `contact@greenandyoung.com` |
| `components/TopBar.tsx` | 56 | `"HQ: Delhi, India"` | Salon Location (e.g., `"Greater Noida West"`) |
| `components/header.tsx` | 45–46 | `src="/images/habibs.webp" alt="Habibs Hair & Beauty Logo"` | `src="/images/green-and-young-logo.webp" alt="Green and Young Salon Logo"` |
| `components/hero.tsx` | 54, 272, 465 | `"Welcome to Habibs"`, `"Habibs Experience Model"` | `"Welcome to Green and Young"`, `"Green & Young Experience"` |
| `components/services.tsx` | 775 | `"Welcome to Habibs Premiere"` | `"Welcome to Green and Young Premiere"` |
| `components/why-choose-us-premium.tsx` | 95 | `"Why Habibs Hair & Beauty Salon Stands Out"` | `"Why Green and Young Salon Stands Out"` |
| `components/why-choose-us-premium.tsx` | 146, 196 | Instagram handle: `habibs.salon` | Official Instagram handle: `greenandyoung.salon` |
| `components/why-choose-us-premium.tsx` | 241 | `"Ready to experience the Habibs difference?"` | `"Ready to experience the Green and Young difference?"` |
| `components/before-after.tsx` | 124 | `"See the Habibs Difference"` | `"See the Green and Young Difference"` |
| `components/about.tsx` | 63, 101, 114 | `"Habibs Hair & Beauty Salon is dedicated..."`, `"Behind the scenes at Habibs"` | `"Green and Young Salon is dedicated..."`, `"Behind the scenes at Green and Young"` |
| `components/footer.tsx` | 15, 101 | `Habibs Salon`, `© 2024 Habibs Hair & Beauty Salon` | `Green and Young Salon`, `© 2024 Green and Young Salon` |
| `components/floating-actions.tsx` | 26 | `text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Habibs%20Salon.` | `text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Green%20and%20Young%20Salon.` |
| `components/brand-showcase.tsx` | 10 | `{ name: 'Habibs', id: 5 }` | Remove or replace with partner luxury brand (e.g., Kérastase, Olaplex) |

---

### Group C: Admin Portal, Auth & Studio

| File Path | Line(s) | Current Legacy Value | Proposed Green & Young Value |
| :--- | :--- | :--- | :--- |
| `app/auth/page.tsx` | 88 | `'Sign In to Habibs'` | `'Sign In to Green and Young'` |
| `app/admin/layout.tsx` | 116 | `'Habibs Admin'` | `'Green and Young Admin'` |
| `components/admin/settings-manager.tsx` | 208 | `'Behind the scenes at Habibs'` | `'Behind the scenes at Green and Young'` |
| `components/admin/hero-slider-manager.tsx` | 314, 780, 823, 866 | `'Welcome to Habibs'`, `'Habibs Hair Salon'` | `'Welcome to Green and Young'` |
| `lib/cloudinary.ts` | 9 | `folder: string = 'habibs'` | `folder: string = 'green-and-young'` |
| `app/api/upload/route.ts` | 13 | `folder \|\| 'habibs'` | `folder \|\| 'green-and-young'` |

---

### Group D: Backend APIs, Emails & Database Seeder

| File Path | Line(s) | Current Legacy Value | Proposed Green & Young Value |
| :--- | :--- | :--- | :--- |
| `lib/emails.ts` | 24, 39 | `from: 'Habibs Premiere <onboarding@resend.dev>'`, `'Thank you for booking with Habibs Premiere.'` | `from: 'Green and Young <onboarding@resend.dev>'`, `'Thank you for booking with Green and Young.'` |
| `app/api/bookings/route.ts` | 92, 96 | `subject: 'Appointment Scheduled - Habibs Premiere'`, `ADMIN_EMAIL \|\| 'admin@habibssalon.com'` | `subject: 'Appointment Scheduled - Green and Young'`, `ADMIN_EMAIL \|\| 'admin@greenandyoung.com'` |
| `app/api/bookings/[id]/route.ts` | 44 | `subject: 'How was your Habibs Premiere experience?'` | `subject: 'How was your Green and Young experience?'` |
| `app/api/contact/route.ts` | 34 | `admin@habibssalon.com` | `admin@greenandyoung.com` |
| `prisma/seed.ts` | Throughout | Seed service titles, descriptions, and hero slides referencing Habibs | Update to Green and Young brand narratives |
| `README.md` | Throughout | Documentation references to Habibs | Green and Young Salon documentation |

---

## 3. Brand Assets to Transition

1. **Logo File (`/public/images/habibs.webp`)**:
   - Create and place `/public/images/green-and-young-logo.webp` (high-res SVG/WebP vector with transparent background).
   - Format: Champagne gold or luminous white typography matching the dark header background.
2. **Favicon / Apple Touch Icon**:
   - Provide clean square icon `/public/images/green-and-young-icon.webp`.
3. **OpenGraph & Twitter Card Preview Image**:
   - `/public/images/og-preview.webp` with Green and Young luxury salon branding.
