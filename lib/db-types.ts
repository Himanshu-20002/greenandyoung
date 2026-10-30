export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'DESIGNER' | 'PROJECT_ENGINEER' | 'CUSTOMER'

export interface UserDoc {
  id?: string
  _id?: any
  email: string
  name?: string | null
  emailVerified?: boolean
  image?: string | null
  role?: Role
  createdAt?: Date
  updatedAt?: Date
}

export interface ResidentialCategoryDoc {
  id?: string
  _id?: any
  name: string
  slug: string
  spaceType: 'LIVING' | 'KITCHEN' | 'MASTER_SUITE' | 'MANDIR' | 'BATH_SPA' | 'DINING'
  iconName?: string
  rating?: string
  sortOrder?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TurnkeyPackageDoc {
  id?: string
  _id?: any
  title: string
  slug: string
  description: string
  heroImage: string
  durationDays: number
  startingPrice: number
  badge?: string // e.g. "SIGNATURE", "45-DAY HANDOVER"
  categoryId?: string
  services?: string[]
  portfolioItems?: { imageUrl: string; title?: string }[]
  active: boolean
  sortOrder: number
  createdAt?: Date
  updatedAt?: Date
}

export interface HeroSlideDoc {
  id?: string
  _id?: any
  bgImage: string
  frameImage?: string
  categoryId?: string
  packageId?: string
  promotionId?: string
  imageAlt?: string
  campaignName?: string
  status: 'DRAFT' | 'PUBLISHED'
  sortOrder: number
  badgeLabel?: string
  badgeText?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface GalleryImageDoc {
  id?: string
  _id?: any
  imageUrl: string
  caption?: string
  category: string
  active: boolean
  sortOrder?: number
  createdAt?: Date
}

export interface BeforeAfterImageDoc {
  id?: string
  _id?: any
  beforeImage: string
  afterImage: string
  title?: string
  description?: string
  active: boolean
  sortOrder: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ContactInquiryDoc {
  id?: string
  _id?: any
  name: string
  email: string
  phone?: string
  scope?: string
  message: string
  read: boolean
  createdAt?: Date
}

export interface NewsletterSubscriberDoc {
  id?: string
  _id?: any
  email: string
  active: boolean
  createdAt?: Date
}

export interface AppointmentDoc {
  id?: string
  _id?: any
  name: string
  phone: string
  email?: string
  service: string
  date: Date | string
  time: string
  message?: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt?: Date
}

export interface SettingDoc {
  id?: string
  _id?: any
  key: string
  value: string
}
