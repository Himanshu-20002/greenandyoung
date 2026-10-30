import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { toObjectId } from '@/lib/db-helpers'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const json = await request.json()
    const { status } = json

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const queryId = toObjectId(id)
    await db.collection('appointments').updateOne(
      { $or: [{ _id: queryId }, { id }] },
      { $set: { status, updatedAt: new Date() } }
    )

    return NextResponse.json({ success: true, id, status })
  } catch (error: any) {
    console.error('API Single Appointment PATCH Error:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
