/**
 * Helper to dispatch appointment details to Zapier Webhook.
 * This runs asynchronously and guarantees that a failure on the webhook
 * side will NOT break the client appointment booking flow.
 */
export async function triggerZapierWebhook(payload: {
  name: string
  phone: string
  email?: string | null
  service: string
  date: string
  time: string
  message?: string | null
}) {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('Zapier Warning: ZAPIER_WEBHOOK_URL is not defined in your environment variables.')
    return false
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || '',
        service: payload.service,
        date: payload.date,
        time: payload.time,
        message: payload.message || ''
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Zapier Error: Webhook returned status ${response.status}. Response: ${errorText}`)
      return false
    }

    return true
  } catch (error: any) {
    console.error('Zapier Network Error: Failed to trigger webhook.', error)
    return false
  }
}
