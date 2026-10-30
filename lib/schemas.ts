import { z } from 'zod'

export const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  packageId: z.string().uuid('Invalid package selection'),
  preferredDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  preferredTime: z.string().min(3, 'Invalid time selection'),
  address: z.string().optional(),
  notes: z.string().optional()
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
  gender: z.enum(['WOMEN', 'MEN', 'UNISEX']),
  iconName: z.string().optional().default('Scissors'),
  gradient: z.string().optional().default('from-pink-500/10 to-rose-500/10'),
  rating: z.string().default('5.0'),
  sortOrder: z.coerce.number().default(0)
})

export const serviceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  categoryId: z.string().uuid('Invalid category selected')
})

export const packageSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be URL-friendly'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  heroImage: z.string().min(1, 'Hero image is required'),
  durationMinutes: z.coerce.number().min(5, 'Minimum 5 minutes'),
  startingPrice: z.coerce.number().min(0, 'Minimum price must be 0'),
  badge: z.string().optional(),
  genderType: z.enum(['WOMEN', 'MEN', 'UNISEX']),
  categoryId: z.string().uuid('Invalid category selected'),
  serviceIds: z.array(z.string().uuid()).min(1, 'Select at least one service'),
  faqs: z.array(
    z.object({
      question: z.string().min(2, 'Question must be filled'),
      answer: z.string().min(2, 'Answer must be filled')
    })
  ).default([]),
  portfolioImages: z.array(z.string()).default([]),
  active: z.boolean().default(true)
})

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  service: z.string().min(2, 'Please select or enter a service'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  time: z.string().min(3, 'Please select a time slot'),
  message: z.string().optional()
})


