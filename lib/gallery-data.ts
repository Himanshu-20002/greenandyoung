export interface ProjectSpec {
  label: string
  value: string
}

export interface ProjectCaseStudy {
  id: string
  title: string
  subtitle: string
  society: string
  location: string
  category:
    | 'Living & Lounges'
    | 'Modular Kitchens'
    | 'Master Suites'
    | 'Walk-In Wardrobes'
    | 'Sacred Mandirs'
    | 'Spa Bathrooms'
  heroImage: string
  galleryImages: string[]
  area: string
  handoverYear: string
  executionType: string
  scope: string
  rendersCount: number
  description: string
  architecturalStory: string[]
  specs: ProjectSpec[]
  materials: string[]
  engineeringHighlights: string[]
}

export const GALLERY_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'ats-knightsbridge-duplex-suite',
    title: 'The Duplex Suite',
    subtitle: 'Double-Height Turnkey Living Lounge with Travertine & Architectural Lighting',
    society: 'ATS Knightsbridge',
    location: 'Sector 124, Noida Expressway',
    category: 'Living & Lounges',
    heroImage: '/images/interiors/penthouse-living.jpg',
    galleryImages: [
      '/images/interiors/penthouse-living.jpg',
      '/images/interiors/dining-suite.jpg',
      '/images/interiors/media-lounge.jpg',
    ],
    area: '6,200 sq.ft.',
    handoverYear: '2025',
    executionType: 'Turnkey Architectural Interior',
    scope: 'Double-height civil reconfiguration, bespoke millwork, acoustic walling & smart automation',
    rendersCount: 6,
    description:
      'Commissioned for an expansive penthouse at ATS Knightsbridge, this double-height living suite synthesizes Roman travertine, brushed champagne brass accents, and custom fluted walnut millwork to create an awe-inspiring yet intimate grand entertaining lounge.',
    architecturalStory: [
      'The primary design objective was to master the 22-foot soaring vertical volume while maintaining acoustic warmth and thermal comfort. Our engineering team deployed concealed sound-dampening acoustic backing behind laser-grooved timber battens, completely eliminating reverberation.',
      'A sculptural central chandelier serves as a dynamic focal fixture, echoed by floor-level warm 2700K indirect perimeter cove illumination that makes the space transition effortlessly from radiant daytime reception to mood-lit evening lounge.',
    ],
    specs: [
      { label: 'Society / Tower', value: 'ATS Knightsbridge, Tower 2' },
      { label: 'Super Built-Up Area', value: '6,200 sq.ft. Duplex' },
      { label: 'Turnaround Timeline', value: '75 Working Days' },
      { label: 'Ceiling Clearance', value: '22 Feet Double-Height' },
      { label: 'Warranty & Support', value: '10-Year Turnkey Warranty' },
    ],
    materials: [
      'Navona Italian Travertine',
      'American Smoked Walnut',
      'PVD Brushed Champagne Gold',
      'Flusso Architectural Lighting (2700K)',
      'Acoustic Kvadrat Fabric Paneling',
    ],
    engineeringHighlights: [
      'Digital twin 3D laser-scanned site alignment with 0.5mm variance tolerance.',
      'Fully concealed multi-zone VRV air conditioning plenums integrated into millwork reveals.',
      'DALI-2 smart architectural dimming presets for daytime, dining, and late-night lounge ambiance.',
    ],
  },
  {
    id: 'the-camellias-german-kitchen',
    title: 'German Precision Quartzite Island Kitchen',
    subtitle: 'Matte Charcoal Fluted Cabinetry with Brazilian Quartzite Waterfall & Concealed Gaggenau',
    society: 'The Camellias',
    location: 'Golf Course Road, Gurgaon',
    category: 'Modular Kitchens',
    heroImage: '/images/interiors/modular-kitchen.jpg',
    galleryImages: [
      '/images/interiors/modular-kitchen.jpg',
      '/images/interiors/modular-kitchen-2.jpg',
      '/images/interiors/dining-suite.jpg',
    ],
    area: '1,100 sq.ft. Kitchen Wing',
    handoverYear: '2025',
    executionType: 'Bespoke Modular Joinery',
    scope: 'German carcass fabrication, Blum motorized Aventos, quartzite fabrication, concealed appliance integration',
    rendersCount: 5,
    description:
      'Engineered with uncompromising German precision for a high-floor estate at The Camellias. Features fluted anti-fingerprint charcoal cabinetry, a 12-foot monolithic Brazilian quartzite island, and flush-integrated Gaggenau cooking appliances.',
    architecturalStory: [
      'Green & Young designed this culinary suite around the dual concepts of professional chef utility and seamless living integration. A secondary butler preparation scullery is concealed behind full-height pivot doors, keeping the main quartzite island showroom-pristine during gatherings.',
      'Every drawer is fitted with Blum Legrabox soft-close dampening and custom walnut cutlery organizers, calibrated to withstand heavy cookware while gliding silently under finger-touch actuation.',
    ],
    specs: [
      { label: 'Society / Estate', value: 'DLF The Camellias, Gurgaon' },
      { label: 'Kitchen Wing Area', value: '1,100 sq.ft.' },
      { label: 'Island Counter', value: '12-Foot Monolithic Quartzite' },
      { label: 'Cabinetry Hardware', value: 'German Blum Legrabox & Aventos Servo-Drive' },
      { label: 'Appliances', value: 'Gaggenau 400 Series Flush Integrated' },
    ],
    materials: [
      'Patagonia Gold Quartzite',
      'Anti-Fingerprint Super-Matte Acrylic',
      'Brushed Brass Linear Lighting',
      'Smoked European Oak Herringbone',
      'Smoked Bronze Glass Display Backing',
    ],
    engineeringHighlights: [
      'Zero-tolerance quartz mitering creating an uninterrupted continuous waterfall vein.',
      'Servo-Drive motorized lift systems for effortless upper cabinet access without handles.',
      'Integrated under-cabinet linear warm LED temperature-calibrated light strips (CRI 95+).',
    ],
  },
  {
    id: 'gulshan-dynasty-sanctuary-suite',
    title: 'Sanctuary Master Bedroom Suite',
    subtitle: 'Acoustic Fluted Walnut Paneling with Integrated Brass Reveals & Sunset Glazing',
    society: 'Gulshan Dynasty',
    location: 'Sector 144, Noida Expressway',
    category: 'Master Suites',
    heroImage: '/images/interiors/master-suite.jpg',
    galleryImages: [
      '/images/interiors/master-suite.jpg',
      '/images/interiors/master-suite-2.jpg',
      '/images/interiors/walkin-wardrobe.jpg',
    ],
    area: '850 sq.ft.',
    handoverYear: '2025',
    executionType: 'Turnkey Luxury Bedroom Fit-Out',
    scope: 'Acoustic architectural walling, bespoke king bouclé bed, fluted walnut joinery, smart automated drape integration',
    rendersCount: 4,
    description:
      'A serene sanctuary designed for private rejuvenation at Gulshan Dynasty. Floor-to-ceiling panoramic sunset glazing is framed by fluted acoustic walnut millwork with fine brushed champagne brass reveal lines.',
    architecturalStory: [
      'We treated the master bedroom as an acoustic refuge from city life. Multi-layered density insulation inside the headboard wall absorbs exterior noise, while bouclé upholstered custom bedframes and plush hand-tufted silk-wool carpets ground the space.',
      'A bespoke floating marble vanity and reading lounge are situated to capture sunset panoramas over the low-density Noida green corridor.',
    ],
    specs: [
      { label: 'Society / Tower', value: 'Gulshan Dynasty, Tower Apex' },
      { label: 'Suite Footprint', value: '850 sq.ft. with Private Balcony' },
      { label: 'Acoustic Rating', value: 'STC 52 Sound Isolation' },
      { label: 'Bed Dimension', value: 'Bespoke Grand King (84x84 in)' },
      { label: 'Joinery Finish', value: 'Natural Walnut with PU Matte Sealant' },
    ],
    materials: [
      'Natural Fluted Walnut Wood',
      'Brushed Champagne Brass Reveals',
      'Custom Cream Bouclé Upholstery',
      'Chevron Smoked European Oak',
      'Calacatta Marble Accent Tabletops',
    ],
    engineeringHighlights: [
      'Concealed magnetic nightstand charging docks and recessed Lutron keypad controls.',
      'Perimeter warm cove ceiling ambient lighting with circadian rhythm dimmer profiles.',
      'Acoustically decoupled wall frames to stop structural vibrations through high-rise slabs.',
    ],
  },
  {
    id: 'supernova-backlit-onyx-mandir',
    title: 'Backlit Translucent Onyx Mandir',
    subtitle: 'Bespoke Golden Onyx Feature Wall with CNC Laser-Cut Champagne Brass Jaali Screens',
    society: 'Supertech Supernova',
    location: 'Sector 94, Noida',
    category: 'Sacred Mandirs',
    heroImage: '/images/interiors/mandir-sanctuary.jpg',
    galleryImages: [
      '/images/interiors/mandir-sanctuary.jpg',
      '/images/interiors/mandir-sanctuary-2.jpg',
    ],
    area: '280 sq.ft. Dedicated Sanctum',
    handoverYear: '2024',
    executionType: 'Bespoke Sacred Sanctuary',
    scope: 'Backlit natural onyx carving, waterjet brass jaali fabrication, floating Statuario altar, brass temple bells',
    rendersCount: 4,
    description:
      'An ethereal personal prayer sanctuary inside Supertech Supernova. Translucent golden honey onyx is carved with sacred geometry and illuminated from within by diffusers, framed by precision laser-cut champagne gold brass screens.',
    architecturalStory: [
      'The client requested a private temple room aligned strictly with traditional Vastu Shastra principles while embodying world-class contemporary design elegance. The sanctum features a floating Statuario marble altar with soft brass trims.',
      'Our team engineered a custom maintenance-free LED matrix behind the 18mm translucent onyx slabs, ensuring uniform light transmission with zero hotspots and thermal management to safeguard the stone indefinitely.',
    ],
    specs: [
      { label: 'Society', value: 'Supertech Supernova, Sector 94' },
      { label: 'Vastu Alignment', value: '100% Verified Ishanya (NE) Orientation' },
      { label: 'Feature Stone', value: '18mm Bookmatched Golden Honey Onyx' },
      { label: 'Screen Finish', value: '3mm Champagne Gold Laser-Cut Brass' },
      { label: 'Altar Slab', value: 'Monolithic Statuario White Marble' },
    ],
    materials: [
      'Translucent Iranian Honey Onyx',
      'Solid Brass Waterjet Jaali',
      'Italian Statuario Marble',
      'Teak Wood Architraves',
      'Low-Voltage 2400K Diffused LED Matrix',
    ],
    engineeringHighlights: [
      'Engineered ventilation slot concealed in brass frieze to allow ceremonial incense exhaust without residue.',
      'Uniform rear illumination with dimmable flicker-free architectural drivers.',
      'Floating marble altar anchored into concrete shear walls with concealed heavy-duty steel brackets.',
    ],
  },
  {
    id: 'experion-windchants-dressing-atelier',
    title: 'Boutique Fluted Glass Dressing Atelier',
    subtitle: 'Walk-In Wardrobe Suite with Smoked Mirror Backsplashes & Leather Island',
    society: 'Experion Windchants',
    location: 'Sector 112, Dwarka Expressway',
    category: 'Walk-In Wardrobes',
    heroImage: '/images/interiors/walkin-wardrobe.jpg',
    galleryImages: [
      '/images/interiors/walkin-wardrobe.jpg',
      '/images/interiors/walkin-wardrobe-2.jpg',
      '/images/interiors/master-suite.jpg',
    ],
    area: '480 sq.ft.',
    handoverYear: '2025',
    executionType: 'Turnkey Wardrobe & Dressing Suite',
    scope: 'Custom bronze aluminium extrusion framing, fluted glass doors, central watch island, shoe wall illumination',
    rendersCount: 5,
    description:
      'A private couture dressing room reminiscent of a Milanese fashion atelier. Features illuminated fluted dark glass wardrobes, velvet-lined accessory drawers, and an emerald green velvet seating ottoman at the center.',
    architecturalStory: [
      'Every garment and accessory has dedicated, climate-conscious storage. Integrated vertical micro-LED channels built directly into cabinet vertical stiles cast zero shadows across apparel.',
      'The central jewelry island features tempered glass display tops, custom Italian leather drawer fronts, and biometric jewelry vault drawers concealed behind bespoke millwork.',
    ],
    specs: [
      { label: 'Society / Villa', value: 'Experion Windchants, Gurgaon' },
      { label: 'Dressing Area', value: '480 sq.ft. Dedicated Room' },
      { label: 'Door System', value: 'Floor-to-Ceiling Fluted Glass Pivot' },
      { label: 'Accessory Island', value: 'Leather Wrapped with Glass Display' },
      { label: 'Lighting System', value: 'Sensor-Activated Vertical Micro-LEDs' },
    ],
    materials: [
      'Fluted Smoked Bronze Glass',
      'Anodized Dark Bronze Aluminium',
      'Caramel Italian Full-Grain Leather',
      'Smoked Mirror Paneling',
      'Emerald Jewel-Tone Mohair Velvet',
    ],
    engineeringHighlights: [
      'Smart proximity sensors that activate wardrobe lighting upon user approach.',
      'Concealed de-humidification channels keeping fine leathers and fabrics pristine year-round.',
      'Concealed heavy-duty Blum Movento soft-close under-mount runners.',
    ],
  },
  {
    id: 'dlf-magnolias-formal-dining',
    title: '10-Seater Monolith Quartzite Dining Suite',
    subtitle: 'Grand Penthouse Dining Hall with Branching Brass Chandelier & Illuminated Wine Cellar',
    society: 'DLF Magnolias',
    location: 'Golf Course Road, Gurgaon',
    category: 'Living & Lounges',
    heroImage: '/images/interiors/dining-suite.jpg',
    galleryImages: [
      '/images/interiors/dining-suite.jpg',
      '/images/interiors/penthouse-living.jpg',
      '/images/interiors/modular-kitchen.jpg',
    ],
    area: '920 sq.ft.',
    handoverYear: '2025',
    executionType: 'Turnkey Dining & Bar Fit-Out',
    scope: 'Monolithic table engineering, blown-glass chandelier mounting, climate-controlled wine wall, acoustics',
    rendersCount: 5,
    description:
      'An exquisite dining suite created for a family of connoisseurs at DLF Magnolias. Anchored by a 14-foot quartzite monolith dining table and an artisanal blown-glass branch chandelier with skyline city views.',
    architecturalStory: [
      'Engineering a single-piece 14-foot natural quartzite slab required bespoke internal steel reinforcement within the bronze pedestal base to eliminate table vibration without adding visual bulk.',
      'In the background, a floor-to-ceiling climate-controlled wine cellar and bar console in smoked walnut with internal illumination provides theatrical hospitality storage.',
    ],
    specs: [
      { label: 'Society / Penthouse', value: 'DLF The Magnolias, Tower 5' },
      { label: 'Seating Capacity', value: '10–12 Guests' },
      { label: 'Table Top', value: '14-Foot Single-Piece Quartzite Monolith' },
      { label: 'Chandelier', value: 'Artisanal Hand-Blown Glass & Brushed Brass' },
      { label: 'Bar Console', value: 'Climate-Controlled 120-Bottle Storage' },
    ],
    materials: [
      'Calacatta Quartzite',
      'Solid Cast Bronze Pedestals',
      'Hand-Blown Czech Crystal Glass',
      'Charcoal & Cream Silk Velvet',
      'Quarter-Sawn European Walnut',
    ],
    engineeringHighlights: [
      'Reinforced ceiling anchor plate rated for 250kg chandelier suspended load.',
      'Acoustic wool backing behind timber wall console to manage dining conversation clarity.',
      'Hermetically sealed double-glazed wine console with vibration-free inverter cooling.',
    ],
  },
  {
    id: 'godrej-woods-calacatta-spa-bath',
    title: 'Calacatta Bookmatched Spa Bath',
    subtitle: 'Master Bathroom Sanctuary with Freestanding Stone Tub & Fluted Glass Shower',
    society: 'Godrej Woods',
    location: 'Sector 43, Noida',
    category: 'Spa Bathrooms',
    heroImage: '/images/interiors/spa-bathroom.jpg',
    galleryImages: [
      '/images/interiors/spa-bathroom.jpg',
      '/images/interiors/master-suite.jpg',
    ],
    area: '340 sq.ft.',
    handoverYear: '2024',
    executionType: 'Bespoke Spa Master Bath',
    scope: 'Bookmatched slab fabrication, ceiling shower drop, freestanding stone tub plumbing, frameless fluted glass',
    rendersCount: 3,
    description:
      'A private hotel-grade spa retreat crafted at Godrej Woods. Features bookmatched Calacatta marble wall slabs, a sculptured oval stone soaking tub overlooking city trees, and brushed gold Dornbracht ceiling-mounted rain fittings.',
    architecturalStory: [
      'Transforming a standard builder-grade bathroom into a five-star spa required full civil waterproofing replacement using elastomeric membrane seals. Every marble vein was meticulously dry-laid and laser-matched before final adhesive setting.',
      'Fluted glass partitions provide privacy for the steam shower enclosure while allowing soft morning daylight to illuminate the entire suite.',
    ],
    specs: [
      { label: 'Society', value: 'Godrej Woods, Sector 43' },
      { label: 'Bathroom Footprint', value: '340 sq.ft.' },
      { label: 'Stone Cladding', value: 'Bookmatched Italian Calacatta Marble' },
      { label: 'Bathtub', value: 'Single-Piece Cast Mineral Composite Tub' },
      { label: 'Shower System', value: 'Thermostatic Ceiling Raindrop & Steam' },
    ],
    materials: [
      'Italian Calacatta Marble',
      'Cast Mineral Composite Stone',
      'Brushed Gold PVD Brass Fittings',
      '12mm Fluted Toughened Glass',
      'Micro-Cement Floor Sealant',
    ],
    engineeringHighlights: [
      'Dual-layer elastomeric tanking waterproofing membrane with 15-year dry-guarantee.',
      'Integrated underfloor heating elements calibrated to 26°C winter comfort.',
      'Anti-fog heating pads behind curved double vanity backlit mirrors.',
    ],
  },
  {
    id: 'jaypee-greens-midnight-cinema',
    title: 'Midnight Acoustic Private Cinema',
    subtitle: 'Tiered Home Theatre with Reclining Saddle Leather Armchairs & Concealed Surround',
    society: 'Jaypee Greens',
    location: 'Pari Chowk, Greater Noida',
    category: 'Living & Lounges',
    heroImage: '/images/interiors/media-lounge.jpg',
    galleryImages: [
      '/images/interiors/media-lounge.jpg',
      '/images/interiors/penthouse-living.jpg',
    ],
    area: '620 sq.ft.',
    handoverYear: '2024',
    executionType: 'Private Home Theatre & Media Lounge',
    scope: 'Dolby Atmos 9.4.4 engineering, tiered acoustic flooring, motorized leather loungers, 4K laser projection',
    rendersCount: 4,
    description:
      'A world-class private cinema installed inside a sprawling golf villa at Jaypee Greens. Deep midnight navy acoustic fabric wall panels with vertical warm brass accents encase tiered motorized caramel leather loungers.',
    architecturalStory: [
      'Our acoustic engineers conducted room-mode resonance modeling before mounting wall baffles, isolating all low-frequency subwoofer standing waves to produce punchy, theater-grade sound with zero bleed to adjacent bedrooms.',
      'A low-profile designer console provides concealed equipment ventilation while soft linear step lights ensure safe navigation during screenings.',
    ],
    specs: [
      { label: 'Society / Villa', value: 'Jaypee Greens Golf Villas' },
      { label: 'Screen Dimension', value: '180-Inch Micro-Perforated 4K Woven' },
      { label: 'Audio Architecture', value: 'Dolby Atmos 9.4.4 Concealed Speakers' },
      { label: 'Seating', value: 'Dual-Tier Motorized Recliners (Saddle Leather)' },
      { label: 'Room Acoustics', value: 'Bass Traps & Diffusion Panels behind fabric' },
    ],
    materials: [
      'Acoustic Acoustic Felt Paneling',
      'Italian Full-Grain Saddle Leather',
      'Brushed Brass Accent Battens',
      'High-Pile Noise Absorbing Wool Carpet',
      'Walnut Credenza with Fluted Brass Base',
    ],
    engineeringHighlights: [
      'Sub-floor acoustic vibration dampers preventing low-end rumbling transfer.',
      'Silent multi-speed intake and exhaust HVAC baffled ducts for whisper-quiet ventilation (NC-20).',
      'One-touch Control4 home cinema automation integrating lights, drapes, and projection.',
    ],
  },
  {
    id: 'm3m-golfestate-japandi-kitchen',
    title: 'Japandi Fluted White Oak & Calacatta Island',
    subtitle: 'Minimalist Open-Plan Kitchen with Concealed Downdraft & Calacatta Gold Marble',
    society: 'M3M Golfestate',
    location: 'Sector 65, Gurgaon',
    category: 'Modular Kitchens',
    heroImage: '/images/interiors/modular-kitchen-2.jpg',
    galleryImages: [
      '/images/interiors/modular-kitchen-2.jpg',
      '/images/interiors/modular-kitchen.jpg',
    ],
    area: '780 sq.ft.',
    handoverYear: '2025',
    executionType: 'Architectural Modular Kitchen',
    scope: 'Fluted white oak millwork, Calacatta Gold waterfall island, downdraft induction, walk-in pantry',
    rendersCount: 4,
    description:
      'A light-filled Japandi architectural kitchen for a golf-facing residence at M3M Golfestate. Combines natural fluted white oak cabinetry with a polished Calacatta Gold marble island and minimalist bar seating.',
    architecturalStory: [
      'Designed to harmonize with lush green fairway views outside expansive patio sliders. The kitchen avoids bulky overhead chimneys by employing a flush Bora downdraft cooktop seamlessly integrated into the marble waterfall counter.',
      'Pocket doors slide effortlessly into cabinet recesses to reveal a bespoke breakfast station complete with espresso bar and concealed steam oven.',
    ],
    specs: [
      { label: 'Society', value: 'M3M Golfestate, Gurgaon' },
      { label: 'Kitchen Style', value: 'Japandi Minimalist Turnkey' },
      { label: 'Cabinetry', value: 'Solid White Oak & Natural Fluting' },
      { label: 'Countertop', value: 'Calacatta Gold Bookmatched Marble' },
      { label: 'Ventilation', value: 'Integrated Flush Downdraft System' },
    ],
    materials: [
      'Natural Fluted White Oak',
      'Calacatta Gold Marble',
      'Brushed Brass Shadowline Profiles',
      'Terrazzo Flooring with Marble Chips',
      'Architectural Track Spotlights (CRI 98)',
    ],
    engineeringHighlights: [
      'German pocket-door mechanism with zero friction for concealing coffee & utility bays.',
      'Integrated water filtration and instant boiling water tap built flush into marble basin.',
      'Anti-bacterial food-grade matte nano-coating on all stone preparation surfaces.',
    ],
  },
  {
    id: 'mahagun-moderne-panoramic-suite',
    title: 'Panoramic Glass High-Floor Master Suite',
    subtitle: 'Skyline-Facing Master Sanctuary with Smoked Mirror Accents & Low-Profile Bed',
    society: 'Mahagun Moderne',
    location: 'Sector 78, Noida',
    category: 'Master Suites',
    heroImage: '/images/interiors/master-suite-2.jpg',
    galleryImages: [
      '/images/interiors/master-suite-2.jpg',
      '/images/interiors/master-suite.jpg',
      '/images/interiors/walkin-wardrobe-2.jpg',
    ],
    area: '720 sq.ft.',
    handoverYear: '2024',
    executionType: 'Turnkey Master Bedroom Renovation',
    scope: 'Full acoustic headboard wall, chevron oak parquet, indirect architectural tray lighting, motorized curtains',
    rendersCount: 4,
    description:
      'Perched on the 28th floor, this master bedroom suite maximizes floor-to-ceiling panoramic night city vistas. Acoustic fluted charcoal fabric panels alternating with vertical smoked mirrors create infinite visual depth.',
    architecturalStory: [
      'The client sought a contemporary five-star presidential suite atmosphere. We introduced an architectural tray ceiling with concealed ambient perimeter gold glow that softly frames the night skyline without reflecting against the glass.',
      'Chevron European oak flooring grounds the room in warm organic texture, complemented by a low-profile platform bed upholstered in Italian ivory boucle.',
    ],
    specs: [
      { label: 'Society / Floor', value: 'Mahagun Moderne, 28th Floor' },
      { label: 'Room Footprint', value: '720 sq.ft.' },
      { label: 'Window Wall', value: 'Floor-to-Ceiling DGU Glass with Night Skyline' },
      { label: 'Floor Finish', value: 'Chevron Light European Oak Parquet' },
      { label: 'Headboard Wall', value: 'Fluted Acoustic Fabric & Smoked Mirrors' },
    ],
    materials: [
      'Smoked Grey Mirrored Glass',
      'Charcoal Acoustic Fluted Fabric',
      'European Oak Chevron Parquet',
      'Italian Ivory Bouclé Bedframe',
      'Brushed Champagne Brass Lamp Fixtures',
    ],
    engineeringHighlights: [
      'Acoustic glazing seal enhancement reducing outdoor high-rise wind buffet noise by 18dB.',
      'Dual motorized drapery track system with 100% blackout and sheer daylight curtains.',
      'Integrated nightstand touch panel with single-touch sleep and master wake sequences.',
    ],
  },
  {
    id: 'central-park-couture-wardrobe',
    title: 'Bronze & Smoked Mirror Couture Wardrobe',
    subtitle: 'Walk-In Dressing Room with Illuminated Watch Display Island & Glass Wardrobes',
    society: 'Central Park Resorts',
    location: 'Sector 48, Gurgaon',
    category: 'Walk-In Wardrobes',
    heroImage: '/images/interiors/walkin-wardrobe-2.jpg',
    galleryImages: [
      '/images/interiors/walkin-wardrobe-2.jpg',
      '/images/interiors/walkin-wardrobe.jpg',
    ],
    area: '520 sq.ft.',
    handoverYear: '2025',
    executionType: 'Bespoke Dressing Room Fit-Out',
    scope: 'Smoked mirror cladding, glass wardrobes with concealed vertical LED, watch winder island, plush carpeting',
    rendersCount: 5,
    description:
      'An ultra-exclusive dressing suite for a penthouse owner at Central Park Resorts. Features custom bronze-framed display cases, a monolithic marble-topped jewelry island with automatic watch winders, and smoked mirror walls.',
    architecturalStory: [
      'Every centimeter of storage was mapped to the homeowner’s exact wardrobe inventory—from tailored dinner jackets to footwear collections and fine chronometers.',
      'The central island houses tempered glass vitrines that allow viewing of jewelry and cufflinks under shadow-free high-CRI illumination.',
    ],
    specs: [
      { label: 'Society', value: 'Central Park Resorts, Gurgaon' },
      { label: 'Room Area', value: '520 sq.ft.' },
      { label: 'Wardrobe System', value: 'Floor-to-Ceiling Bronze Glass Cabinets' },
      { label: 'Island Features', value: 'Integrated Watch Winders & Velvet Trays' },
      { label: 'Lighting Color', value: 'Neutral CRI 98 (True Color Garment Matching)' },
    ],
    materials: [
      'Anodized Matte Bronze Extrusions',
      'Smoked Grey Reflection Glass',
      'Calacatta Marble Island Slab',
      'Navy Velvet Drawer Lining',
      'Herringbone Smoked Timber Flooring',
    ],
    engineeringHighlights: [
      'Micro-filtered air intake system preventing microscopic dust settling inside wardrobes.',
      'Motorized automated watch winders wired into safe emergency battery backup.',
      'Precision concealed pivot hinges tested for 100,000 opening cycles.',
    ],
  },
  {
    id: 'kalpataru-vista-lotus-mandir',
    title: 'Statuario Marble & Lotus Inlay Mandir',
    subtitle: 'Serene Prayer Room with Delicate Waterjet Lotus Brass Inlay & Floating Altar',
    society: 'Kalpataru Vista',
    location: 'Sector 128, Noida Golf Course',
    category: 'Sacred Mandirs',
    heroImage: '/images/interiors/mandir-sanctuary-2.jpg',
    galleryImages: [
      '/images/interiors/mandir-sanctuary-2.jpg',
      '/images/interiors/mandir-sanctuary.jpg',
    ],
    area: '310 sq.ft. Dedicated Sanctum',
    handoverYear: '2025',
    executionType: 'Turnkey Spiritual Sanctum',
    scope: 'Waterjet Statuario lotus brass inlay, floating white marble sanctum counter, teak architraves, ambient gold cove',
    rendersCount: 4,
    description:
      'A breathtaking prayer sanctuary overlooking the greens of Kalpataru Vista. A polished Statuario marble feature wall is adorned with waterjet-cut sacred lotus brass inlay, set against warm perimeter lighting and a floating marble sanctum counter.',
    architecturalStory: [
      'Designed to evoke profound tranquility upon entry. Sacred Sanskrit inscriptions are inlaid in solid polished brass alongside graceful lotus motifs across bookmatched Statuario marble.',
      'Teak wood paneling with intricate brass latticework frames the sanctum, housing concealed storage for ceremonial scriptures and puja accessories.',
    ],
    specs: [
      { label: 'Society / View', value: 'Kalpataru Vista (Golf View)' },
      { label: 'Orientation', value: 'Northeast Vastu Compliant' },
      { label: 'Feature Stone', value: 'Statuario Marble with Waterjet Brass Inlay' },
      { label: 'Storage Joinery', value: 'Burma Teak with Carved Brass Screens' },
      { label: 'Lighting', value: 'Warm 2400K Gold Perimeter Concealed LEDs' },
    ],
    materials: [
      'Italian Statuario White Marble',
      'Solid Polished Brass Lotus Inlay',
      'Burma Teak Wood',
      'Hand-Carved Brass Bells & Diyas',
      'Silk Velvet Meditation Cushioning',
    ],
    engineeringHighlights: [
      'Sub-millimeter precision waterjet stone carving with seamless brass resin bonding.',
      'Dedicated smoke-evacuation filtration intake preventing temple soot from discoloring marble.',
      'Concealed magnetic push-to-open teak cabinetry blending seamlessly into wall architecture.',
    ],
  },
]

export const GALLERY_CATEGORIES = [
  'All Projects',
  'Living & Lounges',
  'Modular Kitchens',
  'Master Suites',
  'Walk-In Wardrobes',
  'Sacred Mandirs',
  'Spa Bathrooms',
] as const
