import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key')

async function sendEmailWithRetry(payload: any, retries = 3, delay = 1000): Promise<any> {
  try {
    return await resend.emails.send(payload)
  } catch (error) {
    if (retries === 0) throw error
    const backoffDelay = delay * Math.pow(2, 3 - retries)
    console.warn(`Resend failed. Retrying in ${backoffDelay}ms... Errors remaining: ${retries}`)
    await new Promise(resolve => setTimeout(resolve, backoffDelay))
    return sendEmailWithRetry(payload, retries - 1, delay)
  }
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not defined. Email dispatch skipped.")
      return
    }
    await sendEmailWithRetry({
      from: 'Green & Young Interiors <onboarding@resend.dev>',
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error("Resend delivery permanently failed after retries:", error)
  }
}

export function getBookingConfirmationTemplate(ref: string, name: string, packageName: string, date: string, time: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 8px;">
      <h2 style="color: #c5a85c; font-family: serif;">Your Consultation is Scheduled</h2>
      <p>Dear ${name},</p>
      <p>Thank you for booking with Green & Young Interiors. Your design consultation has been registered successfully.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p><strong>Booking Reference:</strong> ${ref}</p>
      <p><strong>Selected Experience:</strong> ${packageName}</p>
      <p><strong>Scheduled Date:</strong> ${date}</p>
      <p><strong>Scheduled Time:</strong> ${time}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">If you need to change your appointment, please contact us at +91 9731732547.</p>
    </div>
  `
}

export function getAdminNotificationTemplate(ref: string, name: string, phone: string, email: string, packageName: string, date: string, time: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
      <h2>New Booking Registered</h2>
      <p>A new booking request has been submitted:</p>
      <hr />
      <p><strong>Reference:</strong> ${ref}</p>
      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Experience:</strong> ${packageName}</p>
      <p><strong>Preferred Time:</strong> ${date} at ${time}</p>
      <hr />
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" style="background: #c5a85c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Open Admin Dashboard</a></p>
    </div>
  `
}

export function getContactInquiryTemplate(name: string, email: string, subject: string, message: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
      <h2>New Customer Inquiry</h2>
      <p>A customer has reached out via the contact form:</p>
      <hr />
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">${message}</p>
    </div>
  `
}
