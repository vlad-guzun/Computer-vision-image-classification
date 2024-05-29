// lib/videoDownload.ts
import cloudinary from './cloudinary';

export async function uploadAndProcessVideo(url: string): Promise<string[]> {
  try {
    // Upload video to Cloudinary directly from URL
    const uploadResponse = await cloudinary.uploader.upload(url, {
      resource_type: 'video',
    });

    const publicId = uploadResponse.public_id;

    // Extract frames
    const frameUrls = [];
    for (let i = 1; i <= 10; i++) {
      const frameUrl = cloudinary.url(`${publicId}.jpg`, {
        resource_type: 'video',
        start_offset: (i - 1) * 1,
        transformation: {
          width: 300,
          crop: 'scale',
        },
      });
      frameUrls.push(frameUrl);
    }

    return frameUrls;
  } catch (error) {
    console.error('Failed to process video:', error);
    throw error;
  }
}
