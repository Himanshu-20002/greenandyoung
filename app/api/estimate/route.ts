import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { sendEmail, getContactInquiryTemplate } from '@/lib/emails'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const {
      fullName,
      phone,
      email,
      propertyName,
      propertyType,
      location,
      notes,
    } = json

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone / WhatsApp number are required.' },
        { status: 400 }
      )
    }

    const newLead = {
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : null,
      propertyName: propertyName ? String(propertyName).trim() : null,
      propertyType: propertyType || '3 BHK Luxury',
      location: location ? String(location).trim() : 'Noida & Delhi NCR',
      notes: notes ? String(notes).trim() : null,
      source: 'Luxury Bottom Sheet Estimate',
      read: false,
      status: 'NEW_LEAD',
      createdAt: new Date(),
    }

    const db = await getDb()
    const result = await db.collection('inquiries').insertOne(newLead)

    // Optional email notification
    try {
      const emailBody = `
        <div style="font-family: sans-serif; color: #1c1917; padding: 20px;">
          <h2 style="color: #c5a880;">New Bespoke Design Estimate Request</h2>
          <p><strong>Name:</strong> ${newLead.fullName}</p>
          <p><strong>Phone:</strong> ${newLead.phone}</p>
          <p><strong>Email:</strong> ${newLead.email || 'N/A'}</p>
          <p><strong>Society / Property:</strong> ${newLead.propertyName || 'N/A'}</p>
          <p><strong>Configuration:</strong> ${newLead.propertyType}</p>
          <p><strong>Location:</strong> ${newLead.location}</p>
          <p><strong>Aspirations / Notes:</strong> ${newLead.notes || 'None specified'}</p>
          <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <p style="font-size: 12px; color: #78716c;">Green & Young Luxury Turnkey Interiors Desk</p>
        </div>
      `
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'info@greenandyoung.in',
        subject: `New Design Request: ${newLead.fullName} (${newLead.propertyType})`,
        html: emailBody,
      })
    } catch (emailErr) {
      console.warn('[Estimate] Email alert error (non-fatal):', emailErr)
    }

    return NextResponse.json({
      success: true,
      leadId: result.insertedId.toString(),
    })
  } catch (error: any) {
    console.error('[Estimate] Submission failed:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to submit estimate request.' },
      { status: 500 }
    )
  }
}

