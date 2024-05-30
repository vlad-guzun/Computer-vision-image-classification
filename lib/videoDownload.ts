// lib/videoDownload.ts
import cloudinary from './cloudinary';

export async function uploadVideo(url: string): Promise<any> {
  try {
    // Upload video to Cloudinary directly from URL
    const uploadResponse = await cloudinary.uploader.upload(url, {
      resource_type: 'video'
    });
    return uploadResponse;  // Return the response which includes URL and other info
  } catch (error) {
    console.error('Failed to upload video:', error);
    throw error;
  }
}
