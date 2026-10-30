import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { fallbackInteriorServicesData } from '@/lib/interior-packages'
import { normalizeDocs } from '@/lib/db-helpers'

export async function GET() {
  try {
    const packages = await db
      .collection('experience_packages')
      .find({ active: true })
      .sort({ sortOrder: 1 })
      .toArray()

    if (!packages || packages.length === 0) {
      // Fallback to verified Green & Young interior packages
      const fallbackList = fallbackInteriorServicesData.flatMap(c => c.packages)
      return NextResponse.json(fallbackList)
    }

    return NextResponse.json(normalizeDocs(packages))
  } catch (error: any) {
    console.warn('[MongoDB] api/packages fallback triggered:', error.message)
    const fallbackList = fallbackInteriorServicesData.flatMap(c => c.packages)
    return NextResponse.json(fallbackList)
  }
}
