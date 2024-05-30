// lib/videoDownload.ts
import cloudinary from './cloudinary';

export async function uploadAndProcessVideo(url: string): Promise<string[]> {
  try {
    // Upload the video to Cloudinary directly from URL
    const uploadResponse = await cloudinary.uploader.upload(url, {
      resource_type: 'video'
    });

    const publicId = uploadResponse.public_id;

    // Generate URLs for frames extracted directly by Cloudinary
    const frameUrls = [];
    for (let i = 1; i <= 10; i++) {
      // Generating frame URLs at each second or specific time intervals
      const frameUrl = cloudinary.url(publicId, {
        resource_type: 'video',
        transformation: [
          {
            width: 300,
            height: 300,
            crop: 'fill',
            gravity: 'auto',
            format: 'jpg',
            flags: 'attachment'
          },
          {
            overlay: 'text:Arial_60:' + i, // Optional: Add frame number on the image
            gravity: 'south_east',
            x: 0,
            y: 0,
            color: '#FFFFFF'
          }
        ],
        start_offset: i // One frame per second
      });
      frameUrls.push(frameUrl);
    }

    return frameUrls;
  } catch (error) {
    console.error('Failed to process video:', error);
    throw error;
  }
}
