import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock',
})

export async function uploadImage(fileStr: string, folder: string = 'green-and-young') {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder,
      fetch_format: 'auto',
      quality: 'auto',
      transformation: [
        { width: 1600, height: 1600, crop: 'limit' }
      ]
    })
    return uploadResponse.secure_url
  } catch (error) {
    console.error("Cloudinary upload failed:", error)
    throw error
  }
}
export default cloudinary
