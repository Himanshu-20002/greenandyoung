import { Home, Layers, Building, Sparkles, Utensils, Bed, Compass } from 'lucide-react'

export interface FAQ {
  q: string
  a: string
}

export interface Package {
  id: string
  name: string
  duration: string
  tag: string
  image: string
  desc: string
  subServices: string[]
  price: string
  portfolio: string[]
  faqs: FAQ[]
}

export interface Category {
  id: string
  title: string
  subtitle: string
  iconName?: string
  gradient: string
  rating: string
  badges: string[]
  packages: Package[]
}

export const GY_28_DESIGN_ELEMENTS = [
  'Accent Wall',
  'Balcony Garden',
  'Bay Window Seating',
  'Master Bedroom',
  'Beds with Side Table',
  'CNC Laser Jaalis',
  'Console & Foyer',
  'Crockery Unit',
  'Dining Suite & Hall',
  'Dresser & Vanity',
  'False Ceiling & LEDs',
  'Highlighter Walls',
  'Kids Room',
  'Modular Kitchen',
  'Laundry Area',
  'Living Room',
  'Sacred Mandir',
  'Entrance Wall',
  'Party Lounge',
  'Shoe Rack',
  'Side Table Dresser',
  'Single Bed',
  'Sofa & Centre Table',
  'Study & Home Office',
  'TV Units & Wall Panels',
  'Under Stairs Storage',
  'Walk-In Wardrobe',
  'Spa Washroom',
]

export const fallbackInteriorServicesData: Category[] = [
  // 1. COMPLETE TURNKEY RESIDENCES
  {
    id: 'turnkey-residences',
    title: 'Complete Home Setup',
    subtitle: 'End-to-End Bare-Shell to Move-In Handover for 3BHK, 4BHK, Penthouses & Villas',
    iconName: 'Home',
    gradient: 'from-amber-500/10 to-orange-500/10',
    rating: '4.95',
    badges: ['3D Laser Measurement', '45-Day Handover', '10-Year Warranty'],
    packages: [
      {
        id: 'pkg-3bhk-turnkey',
        name: '3 BHK Luxury Complete Home Setup',
        duration: '45 DAYS',
        tag: 'MOST POPULAR',
        image: '/images/interiors/penthouse-living.jpg',
        desc: 'Complete end-to-end architectural execution from 3D laser survey to final key handover for luxury 3 BHK residences across Noida & Gurgaon.',
        subServices: [
          '3D BIM Laser Survey & Space Reconfiguration',
          'German Blum Modular Kitchen with Quartz Island',
          'Gypsum False Ceilings with 2700K Ambient LED Coves',
          'Floor-to-Ceiling Master Wardrobes & Floating Dresser',
          'Fluted Timber Living Accent Wall & Floating TV Console',
          'Dedicated On-Site Project Engineer & Zero Contractor Hassle',
        ],
        price: 'From ₹4.5 Lakhs',
        portfolio: [
          '/images/interiors/penthouse-living.jpg',
          '/images/interiors/modular-kitchen.jpg',
          '/images/interiors/master-suite.jpg',
        ],
        faqs: [
          {
            q: 'What is covered under the 3 BHK Complete Home Setup Package?',
            a: 'It includes modular kitchen with hardware, false ceilings with concealed wiring and lighting, wardrobes in all bedrooms, living room accent walls, electrical switches, paint, and complete civil management.',
          },
          {
            q: 'How does Green & Young guarantee 45-day handover?',
            a: 'We manufacture all modular joinery in our cleanroom factory before site delivery, compressing on-site civil carpentry time to mere days.',
          },
          {
            q: 'What warranty is provided?',
            a: 'All modular cabinetry and woodwork comes with a 10-year anti-termite and moisture-resistance warranty.',
          },
        ],
      },
      {
        id: 'pkg-4bhk-penthouse',
        name: '4 BHK & Duplex Penthouse Suite',
        duration: '60 DAYS',
        tag: 'SIGNATURE PENTHOUSE',
        image: '/images/interiors/dining-suite.jpg',
        desc: 'Bespoke architectural luxury for sprawling penthouses and duplexes featuring double-height feature walls, walk-in dressing suites, and Italian marble finishes.',
        subServices: [
          'Double-Height Living Room Cladding (22-Ft Clearance)',
          'Master Suite Walk-In Wardrobe with Illuminated Glass',
          'Italian Marble Floor Polishing & Laser Geometric Inlays',
          'Acoustic Home Cinema Lounge or Den Paneling',
          'Integrated Concealed VRV/HVAC Plenums & DALI Automation',
          'White-Glove Deep Cleaning & 150-Point Quality Audit',
        ],
        price: 'From ₹8.5 Lakhs',
        portfolio: [
          '/images/interiors/dining-suite.jpg',
          '/images/interiors/penthouse-living.jpg',
          '/images/interiors/walkin-wardrobe.jpg',
        ],
        faqs: [
          {
            q: 'Can you handle double-height living room walls?',
            a: 'Yes, we have specialized engineering scaffolding and acoustic backing systems designed for ATS Knightsbridge and DLF The Camellias double-height volumes.',
          },
          {
            q: 'Are smart home automation systems included?',
            a: 'We integrate with Lutron, Control4, and DALI architectural lighting presets for one-touch scene control.',
          },
        ],
      },
      {
        id: 'pkg-luxury-villa',
        name: 'Independent Luxury Villa & Estate',
        duration: '75 DAYS',
        tag: 'BESPOKE ESTATE',
        image: '/images/interiors/media-lounge.jpg',
        desc: 'Comprehensive multi-level estate interior architecture, landscape balcony integration, private elevator cladding, and specialized sanctuaries.',
        subServices: [
          'Multi-Level Interior Architecture & Civil Demolition',
          'Custom Hydraulic Bedframes & Leather Consoles',
          'Private Terrace Balcony & Deck Garden Paneling',
          'Concealed Under-Stairs Utility & Designer Shoe Lounges',
          'Single-Point Accountability with Senior Principal Architect',
        ],
        price: 'From ₹14 Lakhs',
        portfolio: [
          '/images/interiors/media-lounge.jpg',
          '/images/interiors/dining-suite.jpg',
          '/images/interiors/mandir-sanctuary.jpg',
        ],
        faqs: [
          {
            q: 'Do you manage civil structural changes?',
            a: 'Yes. Our structural engineers review load-bearing specifications before executing wall shifts or staircase reconfigurations.',
          },
        ],
      },
    ],
  },

  // 2. MODULAR KITCHENS & DINING
  {
    id: 'modular-kitchens-dining',
    title: 'Modular Kitchens & Dining',
    subtitle: 'German Precision Joinery, Monolithic Quartzite Islands & Crockery Consoles',
    iconName: 'Utensils',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    rating: '4.98',
    badges: ['Blum Servo-Drive', 'Anti-Fingerprint Acrylic', 'Quartz Waterfalls'],
    packages: [
      {
        id: 'pkg-german-modular-kitchen',
        name: 'German Precision Modular Kitchen',
        duration: '21 DAYS',
        tag: 'GERMAN ENGINEERING',
        image: '/images/interiors/modular-kitchen.jpg',
        desc: 'Precision modular kitchen engineered with German Blum Legrabox drawer systems, anti-fingerprint super-matte cabinetry, and Brazilian quartzite countertops.',
        subServices: [
          '3D Ergonomic Work Triangle Layout Simulation',
          'Seamless Quartzite Waterfall Edge with Continuous Veining',
          'Blum Servo-Drive Motorized Upper Lift Flaps',
          'Concealed Gaggenau / Bosch Appliance Cutouts',
          'Custom Cutlery & Spice Organizers in Smoked Walnut',
        ],
        price: 'From ₹3.2 Lakhs',
        portfolio: [
          '/images/interiors/modular-kitchen.jpg',
          '/images/interiors/modular-kitchen-2.jpg',
          '/images/interiors/dining-suite.jpg',
        ],
        faqs: [
          {
            q: 'Which hardware brands do you use for kitchens?',
            a: 'We use 100% genuine German Blum and Hettich hardware backed by lifetime mechanical warranties.',
          },
          {
            q: 'Is the countertop stone heat and scratch resistant?',
            a: 'Yes, we fabricate with Brazilian quartzite or high-grade quartz engineered for heavy Indian culinary use.',
          },
        ],
      },
      {
        id: 'pkg-dining-crockery',
        name: 'Dining Suites & Crockery Consoles',
        duration: '18 DAYS',
        tag: 'ENTERTAINING SUITE',
        image: '/images/interiors/dining-suite.jpg',
        desc: 'Elevate family gatherings with bespoke monolithic 8 to 12-seater dining tables, illuminated smoked glass crockery units, and bar consoles.',
        subServices: [
          '10-Seater Monolith Quartzite or Marble Dining Table',
          'Backlit Smoked Glass Crockery Display Cabinets',
          'Wine Bar Console with Concealed Wine Fridge Slot',
          'High-CRI Architectural Pendant Chandelier Installation',
        ],
        price: 'From ₹2.4 Lakhs',
        portfolio: [
          '/images/interiors/dining-suite.jpg',
          '/images/interiors/modular-kitchen.jpg',
        ],
        faqs: [
          {
            q: 'Can crockery cabinets be customized for glassware?',
            a: 'Every shelf is custom-spaced with warm LED vertical profiles to showcase fine porcelain and crystal.',
          },
        ],
      },
      {
        id: 'pkg-laundry-utility',
        name: 'Concealed Utility & Laundry Space',
        duration: '10 DAYS',
        tag: 'SMART UTILITY',
        image: '/images/interiors/modular-kitchen-2.jpg',
        desc: 'Turn neglected utility balconies into sleek, concealed laundry and storage zones with marine-grade waterproof cabinetry.',
        subServices: [
          'Stackable Washer & Dryer Enclosure Cabinetry',
          'Concealed Water Drainage & Supply Manifolds',
          'Integrated Ironing Board Drawer & Detergent Racks',
          'BWP Marine-Grade Moisture Proof Plywood',
        ],
        price: 'From ₹1.2 Lakhs',
        portfolio: [
          '/images/interiors/modular-kitchen-2.jpg',
        ],
        faqs: [
          {
            q: 'Is the utility cabinetry waterproof?',
            a: 'We use IS 710 certified Boiling Waterproof (BWP) marine ply to ensure complete longevity against water exposure.',
          },
        ],
      },
    ],
  },

  // 3. BEDROOMS & WARDROBES
  {
    id: 'bedrooms-wardrobes',
    title: 'Bedrooms & Wardrobes',
    subtitle: 'Master Sanctuary Suites, Walk-In Dressing Ateliers & Custom Kids Rooms',
    iconName: 'Bed',
    gradient: 'from-indigo-500/10 to-violet-500/10',
    rating: '4.92',
    badges: ['Fluted Acoustic Paneling', 'Smoked Glass Wardrobes', 'Integrated Lighting'],
    packages: [
      {
        id: 'pkg-master-sanctuary',
        name: 'Master Sanctuary Bedroom Suite',
        duration: '24 DAYS',
        tag: 'PRESIDENTIAL SUITE',
        image: '/images/interiors/master-suite.jpg',
        desc: 'Recharge in acoustic serenity. Fluted American walnut paneling, king-size bespoke bouclé bed, and integrated ambient nightstand lighting.',
        subServices: [
          'Acoustic Headboard Wall with Integrated Brass Reveals',
          'Bespoke King Platform Bed with Hydraulic Storage',
          'Floating Dresser with Curved Backlit Mirror',
          'Bay Window Lounge Seating with Concealed Storage',
          'Automated Dual Motorized Curtains (Blackout & Sheer)',
        ],
        price: 'From ₹2.8 Lakhs',
        portfolio: [
          '/images/interiors/master-suite.jpg',
          '/images/interiors/master-suite-2.jpg',
          '/images/interiors/walkin-wardrobe.jpg',
        ],
        faqs: [
          {
            q: 'Does the fluted paneling provide soundproofing?',
            a: 'Yes, our headboard assemblies feature acoustic foam backing that dampens outside city noise significantly.',
          },
        ],
      },
      {
        id: 'pkg-walkin-wardrobe',
        name: 'Boutique Walk-In Wardrobe Suite',
        duration: '20 DAYS',
        tag: 'COUTURE DRESSING',
        image: '/images/interiors/walkin-wardrobe.jpg',
        desc: 'Private dressing room inspired by high fashion boutiques. Smoked glass display cabinets, leather jewelry island, and sensor-activated vertical LEDs.',
        subServices: [
          'Floor-to-Ceiling Smoked Glass & Dark Bronze Aluminium Framing',
          'Central Jewelry Island with Glass Vitrine & Velvet Trays',
          'Sensor-Activated Vertical Micro-LED Illumination',
          'Biometric Drawer Lockers for Valuables',
          'Full-Length Smoked Mirror Dressing Panel',
        ],
        price: 'From ₹2.6 Lakhs',
        portfolio: [
          '/images/interiors/walkin-wardrobe.jpg',
          '/images/interiors/walkin-wardrobe-2.jpg',
          '/images/interiors/master-suite.jpg',
        ],
        faqs: [
          {
            q: 'Are wardrobes custom-sized for high ceilings?',
            a: 'Yes, we fabricate seamless full-height floor-to-ceiling shutters up to 10.5 feet without joints.',
          },
        ],
      },
      {
        id: 'pkg-kids-study',
        name: 'Kids Bedroom & Executive Study',
        duration: '18 DAYS',
        tag: 'CREATIVE & DYNAMIC',
        image: '/images/interiors/master-suite-2.jpg',
        desc: 'Optimized multi-functional rooms with single/bunk beds, ergonomic study consoles, bookshelf cabinetry, and soft pastels.',
        subServices: [
          'Ergonomic Workstation with Cable Management Channels',
          'Modular Wardrobe with Lower Child-Accessible Drawers',
          'Magnetic Pinboard & Open Display Bookcase',
          'Durable Scratch-Proof Matte Laminate Finishes',
        ],
        price: 'From ₹1.8 Lakhs',
        portfolio: [
          '/images/interiors/master-suite-2.jpg',
        ],
        faqs: [
          {
            q: 'Are the materials child-safe?',
            a: 'We use non-toxic, low-VOC paints and rounded corner edge-banding on all kids study furniture.',
          },
        ],
      },
    ],
  },

  // 4. ARCHITECTURAL FEATURES & SANCTUARIES
  {
    id: 'architectural-features',
    title: 'Architectural Features & Mandirs',
    subtitle: 'Backlit Onyx Mandirs, False Ceilings, CNC Jaalis, Accent Walls & Balconies',
    iconName: 'Sparkles',
    gradient: 'from-amber-500/10 to-yellow-500/10',
    rating: '4.97',
    badges: ['Translucent Honey Onyx', 'Vastu-Aligned Mandirs', 'CNC Brass Jaalis'],
    packages: [
      {
        id: 'pkg-sacred-mandir',
        name: 'Sacred Mandir (Pooja Room)',
        duration: '15 DAYS',
        tag: 'SPIRITUAL SANCTUM',
        image: '/images/interiors/mandir-sanctuary.jpg',
        desc: 'A divine personal sanctuary crafted according to Vastu Shastra. Translucent backlit golden honey onyx, laser-cut champagne brass jaalis, and floating marble altars.',
        subServices: [
          'Backlit Translucent Iranian Honey Onyx Feature Wall',
          'Waterjet Precision CNC Brass / Wood Jaali Partitions',
          'Floating Statuario White Marble Altar with Storage',
          'Concealed Incense Exhaust System to Protect Stone',
          'Warm 2400K Diffused LED Driver Calibration',
        ],
        price: 'From ₹1.8 Lakhs',
        portfolio: [
          '/images/interiors/mandir-sanctuary.jpg',
          '/images/interiors/mandir-sanctuary-2.jpg',
        ],
        faqs: [
          {
            q: 'Is the mandir design 100% Vastu compliant?',
            a: 'Yes, our team consults Vedic Vastu parameters for orientation (Ishanya corner), altar heights, and deity placement.',
          },
        ],
      },
      {
        id: 'pkg-ceiling-lighting',
        name: 'False Ceilings & Architectural Lighting',
        duration: '14 DAYS',
        tag: 'AMBIENT LUXURY',
        image: '/images/interiors/penthouse-living.jpg',
        desc: 'Transform raw ceilings into sculptural architectural planes. Gypsum cove details, magnetic track spotlights, and warm 2700K indirect perimeter glow.',
        subServices: [
          'Saint-Gobain Gyproc Moisture-Resistant False Ceilings',
          'Magnetic Low-Voltage Architectural Track Systems',
          'Indirect Concealed LED Strip Coves (CRI 95+)',
          'Acoustic Ceiling Insulation for Upper-Floor Footsteps',
        ],
        price: 'From ₹1.5 Lakhs',
        portfolio: [
          '/images/interiors/penthouse-living.jpg',
          '/images/interiors/master-suite.jpg',
        ],
        faqs: [
          {
            q: 'Does the false ceiling reduce room height noticeably?',
            a: 'We design low-drop peripheral perimeter coves that only require 4 to 5 inches, keeping the central room open and lofty.',
          },
        ],
      },
      {
        id: 'pkg-living-accents',
        name: 'Living Accent Walls, TV Units & Balconies',
        duration: '12 DAYS',
        tag: 'BESPOKE FOYER & DECK',
        image: '/images/interiors/media-lounge.jpg',
        desc: 'Focal feature walls with fluted charcoal louvers, sintered stone cladding, floating TV consoles, designer shoe racks, and balcony gardens.',
        subServices: [
          'Sintered Stone or Italian Marble TV Backsplash',
          'Fluted Timber Acoustic Slats with Brass Highlights',
          'Foyer Entrance Wall with Designer Shoe Rack Console',
          'Weather-Proof Wooden Deck Balcony & Vertical Planters',
        ],
        price: 'From ₹1.6 Lakhs',
        portfolio: [
          '/images/interiors/media-lounge.jpg',
          '/images/interiors/penthouse-living.jpg',
        ],
        faqs: [
          {
            q: 'Can TV units accommodate all wiring and subwoofers?',
            a: 'Yes, all wiring, soundbars, gaming consoles, and power strips are 100% concealed with magnetic access panels.',
          },
        ],
      },
    ],
  },
]
