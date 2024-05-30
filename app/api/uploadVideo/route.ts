import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure your Cloudinary account
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Replace with your actual cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // Replace with your actual API key
  api_secret: process.env.CLOUDINARY_API_SECRET   // Replace with your actual API secret
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const videoUrl = body.url;

    // Upload the video to Cloudinary if not already hosted there
    const uploadResponse = await cloudinary.v2.uploader.upload(videoUrl, {
      resource_type: 'video',
      folder: 'sample_folder'
    });

    // Assuming a maximum duration of 30 seconds for demonstration
    const maxDuration = 8; // You may adjust based on your needs or video metadata
    const times = Array.from({ length: maxDuration }, (_, i) => i + 1);

    const screenshots = times.map(time => cloudinary.v2.url(uploadResponse.public_id, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        { width: 300, height: 500, crop: "fill" }, 
        { start_offset: `${time}s`, duration: 0.1 }
      ]
    }));

    return NextResponse.json({ status: 'success', data: screenshots });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error });
  }
}
