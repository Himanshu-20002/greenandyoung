import React from 'react'
import { db } from '@/lib/mongodb'
import SettingsManager from '@/components/admin/settings-manager'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const aboutImageSetting = await db.collection('settings').findOne({ key: 'aboutImage' })
  const aboutImage = aboutImageSetting?.value || '/images/interiors/penthouse-living.jpg'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-foreground tracking-widest uppercase">
          Experience Studio &bull; Site Settings
        </h2>
        <p className="text-[10px] text-muted-foreground mt-1">
          Administer global components, upload assets, and manage database configurations for site-wide layouts.
        </p>
      </div>

      <SettingsManager initialAboutImage={aboutImage} />
    </div>
  )
}
