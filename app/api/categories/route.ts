import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { fallbackInteriorServicesData } from '@/lib/interior-packages'
import { normalizeDocs } from '@/lib/db-helpers'

export async function GET() {
  try {
    const categories = await db
      .collection('categories')
      .find({})
      .sort({ sortOrder: 1 })
      .toArray()

    if (!categories || categories.length === 0) {
      return NextResponse.json(fallbackInteriorServicesData)
    }

    return NextResponse.json(normalizeDocs(categories))
  } catch (error: any) {
    console.warn('[MongoDB] api/categories fallback triggered:', error.message)
    return NextResponse.json(fallbackInteriorServicesData)
  }
}
