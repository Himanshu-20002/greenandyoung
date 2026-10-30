import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { file, folder } = json

    if (!file) {
      return NextResponse.json({ error: 'File string is required' }, { status: 400 })
    }

    const secureUrl = await uploadImage(file, folder || 'green-and-young')
    return NextResponse.json({ url: secureUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
