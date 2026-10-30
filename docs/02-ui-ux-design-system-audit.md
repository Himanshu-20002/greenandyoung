# 02. UI/UX Design System Audit: Preserving the Look & Feel

The primary directive for this project is:
> **"Do not change the look and feel."**

This document establishes the exact visual language, color tokens, layout hierarchy, and micro-animations that give this platform its ultra-luxury, high-conversion presence. Preserving these elements guarantees that the customized site for **Green and Young** feels identical in prestige, craftsmanship, and visual polish.

---

## 1. Visual Theme & Aesthetics Breakdown

The website utilizes a **High-End Editorial Dark-Mode studio Aesthetic**, reminiscent of luxury beauty publications and flagship five-star studio brands.

```
       Dark Obsidian Background               Warm Champagne Accent             Luminous Off-White
        #0D0C0B (Dark) / #FAF8F5 (Light)      #C5A880 (Light) / #D4AF37 (Dark)       #F4F0EA / #FFFFFF
```

### Color Palette Tokens (Defined in `app/globals.css`)

| Token | Light Theme Value | Dark Theme Value | Purpose in UI |
| :--- | :--- | :--- | :--- |
| `--background` | `#FAF8F5` (Warm Cream) | `#0D0C0B` (Deep Obsidian) | Primary background canvas |
| `--foreground` | `#1C1917` (Charcoal) | `#F4F0EA` (Warm Pearl) | Primary typography & headings |
| `--card` | `#FFFFFF` | `#151413` (Smoked Quartz) | Card surfaces, modals, service containers |
| `--accent` | `#C5A880` (Champagne Gold) | `#D4AF37` (Metallic Gold) | Active tabs, star ratings, CTA highlights, badges |
| `--muted` | `#F4F0EA` | `#1E1C1A` | Inactive tabs, disabled states, subtle borders |
| `--muted-foreground` | `#78716C` | `#A8A29E` | Secondary descriptions, timestamps, metadata |
| `--border` | `#E7E3DC` | `#272522` | Hairline dividers, subtle glass borders |

> [!IMPORTANT]
> **Preservation Rule**: Do not overwrite or replace `--accent` or `--background` tokens with generic green hues. "Green and Young" is a luxury lifestyle studio; its elegance relies on the gold, obsidian, and champagne tones already calibrated across gradients and glass surfaces.

---

## 2. Typography Hierarchy

The typography pairs modern clean geometry with editorial tracking and weight contrasts:

- **Primary Font**: `Geist Sans` (`var(--font-geist-sans)`), loaded via Next.js Google Fonts with latin subsets.
- **Eyebrow / Sub-headings**: Uppercase with wide character spacing (`tracking-[0.2em]`, `text-[10px]` to `text-xs`, `font-semibold text-accent`).
- **Section Headings**: Bold editorial titles (`text-3xl md:text-5xl font-bold tracking-tight text-primary`) accented with gradient text fills:
  ```html
  <span className="bg-gradient-to-r from-accent via-accent/90 to-amber-500 bg-clip-text text-transparent">
    Luxury Highlight
  </span>
  ```
- **Body & Paragraphs**: High-legibility font sizing with relaxed line heights (`text-foreground/70 leading-relaxed max-w-2xl text-balance`).

---

## 3. Signature UI Components to Preserve

### 1. The Dynamic Hero Carousel (`components/hero.tsx`)
- **Visuals**: Split-screen hero presentation with dual layered photography (atmospheric backdrop + sculpted model frame).
- **Luxury Elements**:
  - Gold floating badge with glowing ping indicator: `"Exclusive Experience • Special Offer"`.
  - Gender and category filter pill tabs with smooth sliding background highlights.
  - Progress bar and thumbnail carousel for active slides.
  - Parallax depth and motion blur effects.

### 2. The Interactive Service Matrix (`components/services.tsx`)
- **Visuals**: Segmented tabs for Women / Men / Unisex services.
- **Card Design**: Smoked dark cards with hairline border glow on hover (`hover:border-accent/40 hover:shadow-2xl`).
- **Interactive Details**: Expandable service details, duration pills (`"45 Mins"`), package inclusions checkmarks, and instant "Book Experience" button.

### 3. The Instagram Reel Phone Mockup (`components/why-choose-us-premium.tsx`)
- **Visuals**: A realistic smartphone bezel (`aspect-[9/16] rounded-[40px] border-[6px] border-neutral-900 ring-1 ring-white/10`).
- **Features**: Vertical reel video playing inside the mockup, overlayed with Instagram verified badge, username, animated audio wave bars, heart counts, and comment pills.

### 4. Interactive Before/After Split Slider (`components/before-after.tsx`)
- **Visuals**: Hair and bridal transformation split viewer.
- **Features**: Draggable separator handle allowing prospective customers to slide between the "Before" and "After" state with real-time clipping.

### 5. Multi-Step Luxury Booking Modal (`components/booking-modal.tsx`)
- **Visuals**: Backdrop-blur overlay (`backdrop-blur-md bg-black/80`).
- **Steps**:
  1. Service Selection & Add-ons
  2. Date & Time slot picker
  3. Contact details & special instructions
  4. Real-time confirmation feedback

### 6. Floating Action Bar (`components/floating-actions.tsx`)
- **Visuals**: Non-intrusive mobile quick-action bar with WhatsApp Direct link and Book Appointment trigger.

---

## 4. Animation & Interaction Specifications

All interactions are implemented using **Framer Motion** with standard cubic bezier easing:
- **Scroll Reveals**: `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}`.
- **Card Hovers**: `whileHover={{ y: -4, transition: { duration: 0.2 } }}`.
- **Spring Physics for 3D Cards**:
  ```ts
  const springConfig = { damping: 22, stiffness: 120 }
  ```
- **Button Micro-interactions**: Hover scale `1.03`, tap scale `0.98`, smooth gradient shimmer.
