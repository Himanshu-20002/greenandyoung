# Green & Young Luxury Interior Architecture — Lead Automation & Platform Docs

This documentation outlines the lead automation, Zapier webhooks, admin management, Google Tag Manager events, and execution guidelines for Green & Young.

## 1. Environment Variables

Create or update your `.env` file in the root directory:

```env
# MongoDB Connection String (Atlas or Local)
MONGODB_URI="mongodb+srv://..."
# or DATABASE_URL="mongodb+srv://..."

# Better-Auth Configuration
BETTER_AUTH_SECRET="your-32-character-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Zapier Webhook Endpoint URL
ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/..."

# Google Tag Manager Container ID
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Admin configuration
ADMIN_EMAIL="info@greenandyoung.in"
```

---

## 2. Zapier Webhook Integration

### Webhook Payload Schema
When an architectural consultation or site visit inquiry is submitted, the system automatically triggers a POST request to `ZAPIER_WEBHOOK_URL` with the following payload structure:

```json
{
  "name": "Devendra Sharma",
  "phone": "9876543210",
  "email": "devendra@example.com",
  "service": "4 BHK & Duplex Penthouse Suite",
  "date": "2026-06-30",
  "time": "11:30 AM",
  "message": "Interested in 3D laser survey and turnkey German modular kitchen"
}
```

*Note: Email and Message can be empty strings if not provided by the client.*

### Zapier Setup
1. **Trigger**: Select **Webhooks by Zapier** -> Choose **Catch Hook** as the event.
2. **Action 1 (Google Sheets)**:
   - Choose Google Sheets -> **Create Spreadsheet Row**.
   - Map headers (`Name`, `Phone`, `Email`, `Service`, `Date`, `Time`, `Message`) to fields in the webhook payload.
3. **Action 2 (WhatsApp Notification)**:
   - Choose WhatsApp by Twilio (or WhatsApp Business platform).
   - Set up an automated message template alerting the senior architectural team.

---

## 3. GTM & GA4 Analytics Configuration

Standard Google Tag Manager dataLayer events are pushed automatically on client interactions:

| Event Name | Pushed When | Extra Data Parameters |
| :--- | :--- | :--- |
| `page_view` | Whenever a customer navigates to a new page/route | `page_path` |
| `appointment_started` | When the client focuses any field in the consultation booking form | - |
| `service_selected` | When a client selects an interior package from the catalog | `service_name` |
| `appointment_submitted` | On successful consultation submission | `service_name`, `date`, `time` |
| `call_click` | When a `tel:` link is clicked | `phone_number` |
| `whatsapp_click` | When a WhatsApp link is clicked | `whatsapp_url` |

### To setup in GTM:
1. Create Custom Event Triggers in GTM for:
   - `appointment_started`
   - `service_selected`
   - `appointment_submitted`
   - `call_click`
   - `whatsapp_click`
2. Create Google Tag (GA4) event tags linked to these triggers to push data directly to GA4.

---

## 4. Running the Project Locally

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the Green & Young Admin Studio.
