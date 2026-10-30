# Green & Young studio - Project Documentation & Migration Portal

Welcome to the documentation repository for the **Green and Young** luxury studio web platform.

This documentation suite provides a complete end-to-end analysis of the site codebase, UI/UX design tokens, backend infrastructure, and a **zero-risk step-by-step roadmap** to customize the platform for **Green and Young** while preserving 100% of the luxury look, feel, animations, and aesthetic experience.

---

## 📚 Documentation Index

| Document | Purpose | Key Contents |
| :--- | :--- | :--- |
| **[01. Site Architecture & Tech Stack](./01-site-architecture-and-tech-stack.md)** | Technical infrastructure analysis | Next.js 16 App Router, Prisma ORM, Neon PostgreSQL, Better-Auth, Cloudinary, Resend, Zapier, GTM/GA4 |
| **[02. UI/UX Design System Audit](./02-ui-ux-design-system-audit.md)** | Look & Feel blueprint to preserve | Dark luxury studio aesthetics, HSL/HEX color tokens, gold/champagne accents, Framer Motion animations, typography |
| **[03. Component Breakdown & Data Flow](./03-component-breakdown-and-data-flow.md)** | Page layout & component hierarchy | Hero slider, Interactive Service Catalog, Instagram Reel phone mockup, Before/After slider, Booking modal |
| **[04. Brand Audit: Old Brand to Green & Young](./04-brand-migration-audit-Green & Young-to-green-and-young.md)** | Exact code & asset audit | Line-by-line inventory of all files mentioning old brand names, emails, phones, logos, and schema markup |
| **[05. Customization Roadmap & Best Approach](./05-customization-roadmap-and-best-approach.md)** | Recommended execution plan | 6-phase implementation roadmap, zero-breakage strategy, testing checklist, and environment configuration |
| **[06. Live Site Analysis (greenandyoung.in)](./06-live-site-analysis-greenandyoung-in.md)** | Extracted live website intelligence | Full content, real phone numbers, Noida address, celebrity awards, lead forms, and upgrade blueprint |
| **[Phase 1 Implementation Plan](./phase-1-brand-foundation-and-optimization.md)** | Brand Foundation & Shell Optimization | ✅ **COMPLETED** — Centralized `site-config.ts`, navigation shell, GTM, Schema.org |
| **[Phase 2 Implementation Plan](./phase-2-hero-and-services-catalog.md)** | Hero & Services Catalog | ✅ **COMPLETED** — Hero slider, typesafe interior packages, consultation CTAs |
| **[Phase 3 Implementation Plan](./phase-3-story-awards-and-transformations.md)** | Story, Awards, Brands & Reviews | ✅ **COMPLETED** — G&Y Brand story, awards, partner brands (Blum, Hettich), Before/After slider & verified reviews |

---

## 🎯 Primary Project Objective

> **"Customize this site for Green and Young without changing the look and feel."**

### Guiding Principles:
1. **Preserve Visual Excellence**: Maintain the high-end luxury dark aesthetic (`#0D0C0B`), warm champagne & gold accents (`#C5A880` / `#D4AF37`), subtle glows, and glassmorphic layers.
2. **Protect Interactive Polish**: Keep all Framer Motion micro-interactions, swipeable mobile carousels, before-and-after comparison sliders, and dynamic booking modals intact.
3. **Flawless Brand Transition**: Seamlessly transition all copy, contact details, social links, SEO tags, database seed records, and email notification templates from the legacy brand to **Green and Young**.
4. **Data Integrity**: Ensure PostgreSQL schema compatibility and uninterrupted appointment workflows with Neon, Resend, and Zapier.
