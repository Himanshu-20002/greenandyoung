import { NextResponse } from 'next/server'
import { db } from '@/lib/mongodb'
import { appointmentSchema } from '@/lib/schemas'
import { triggerZapierWebhook } from '@/lib/zapier'
import { normalizeDoc, normalizeDocs } from '@/lib/db-helpers'

// POST: Submit a new general appointment
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const result = appointmentSchema.safeParse(json)

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 })
    }

    const data = result.data
    const newAppointment = {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      date: new Date(data.date),
      time: data.time,
      message: data.message || null,
      status: 'Pending',
      createdAt: new Date(),
    }

    // 1. Save to Database
    const res = await db.collection('appointments').insertOne(newAppointment)
    const appointment = normalizeDoc({ ...newAppointment, _id: res.insertedId })

    // 2. Trigger Zapier Webhook in a non-blocking way
    try {
      const dateString = new Date(data.date).toISOString().split('T')[0]
      triggerZapierWebhook({
        name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        service: appointment.service,
        date: dateString,
        time: appointment.time,
        message: appointment.message,
      }).catch((err) => {
        console.error('Failed to trigger Zapier Webhook asynchronously:', err)
      })
    } catch (zapierErr) {
      console.error('Immediate error calling Zapier Webhook helper:', zapierErr)
    }

    return NextResponse.json({ success: true, appointment })
  } catch (error: any) {
    console.error('API Appointments POST Error:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

// GET: Fetch all general appointments for Admin Dashboard
export async function GET() {
  try {
    const appointments = await db
      .collection('appointments')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    return NextResponse.json(normalizeDocs(appointments))
  } catch (error: any) {
    console.error('API Appointments GET Error:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
