export interface SiteConfig {
  name: string
  legalName: string
  shortName: string
  tagline: string
  subTagline: string
  description: string
  url: string
  phone: {
    primary: string
    primaryRaw: string
    consultation: string
    consultationRaw: string
  }
  whatsapp: {
    number: string
    directLink: string
    prefilledMessage: string
  }
  email: {
    info: string
    admin: string
  }
  address: {
    building: string
    area: string
    city: string
    state: string
    postalCode: string
    country: string
    displayShort: string
    fullDisplay: string
    serviceAreas: string[]
  }
  hours: {
    display: string
    statusText: string
  }
  analytics: {
    gtmId: string
    ga4Id: string
  }
  social: {
    instagram: string
    facebook: string
    whatsapp: string
  }
  assets: {
    logo: string
    icon: string
    ogImage: string
  }
  navLinks: Array<{ href: string; label: string }>
}

export const siteConfig: SiteConfig = {
  name: "Green & Young Interiors",
  legalName: "Green & Young Interiors",
  shortName: "Green & Young",
  tagline: "Design Your Home With The Experts",
  subTagline: "3D Design & Measurement • Complete Home & Office Setup",
  description:
    "Transform your living space with Green & Young Interiors. Premier complete home interior design, modular kitchens, luxury living spaces, and 3D architectural planning across Noida, Greater Noida, and Delhi NCR.",
  url: "https://greenandyoung.in",
  phone: {
    primary: "+91 99718 13161",
    primaryRaw: "919971813161",
    consultation: "+91 73031 61655",
    consultationRaw: "917303161655",
  },
  whatsapp: {
    number: "919971813161",
    directLink:
      "https://wa.me/+919971813161?text=Hi%20Green%20%26%20Young%20Interiors%2C%20I%20would%20like%20to%20book%20a%20free%203D%20design%20consultation.",
    prefilledMessage:
      "Hi Green & Young Interiors, I would like to book a free 3D design consultation.",
  },
  email: {
    info: "info@greenandyoung.in",
    admin: "admin@greenandyoung.in",
  },
  address: {
    building: "C619, KLJ Building, Noida One",
    area: "Rasoolpur Nawada, Industrial Area, Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    postalCode: "201306",
    country: "India",
    displayShort: "Sector 62, Noida (Delhi NCR)",
    fullDisplay:
      "C619, KLJ Building, Noida One, Sector 62, Noida, Uttar Pradesh 201306",
    serviceAreas: ["Noida", "Greater Noida", "Greater Noida West", "Ghaziabad"],
  },
  hours: {
    display: "Mon - Sun: 10:00 AM - 8:00 PM",
    statusText: "3D Design & Measurement  Active",
  },
  analytics: {
    gtmId: "GTM-5GJPZVZG",
    ga4Id: "G-Q8MZP37MHY",
  },
  social: {
    instagram: "https://www.instagram.com/greenandyoung.in",
    facebook: "https://www.facebook.com/greenandyoung.in",
    whatsapp: "https://wa.me/+919971813161",
  },
  assets: {
    logo: "/images/logo/logo.webp",
    icon: "/images/logo/Tab_logo.png",
    ogImage: "/images/logo/logo.webp",
  },
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Designs" },
    { href: "/#gallery", label: "Portfolio" },
    { href: "/#transformations", label: "Transformations" },
    { href: "/#latest-trends", label: "Latest Trends" },
    { href: "/about", label: "About" },
  ],
}
