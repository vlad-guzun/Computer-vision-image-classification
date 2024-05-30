// app/api/frameVideo.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dlqcwi0te',
  api_key: '235634228739685',
  api_secret: 'p_0NcPsQTFt1r30QBVacv1gmA_c'
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const videoUrl = body.url;

  try {
    const timestamps = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
    const promises = timestamps.map(timestamp =>
      cloudinary.v2.uploader.upload(videoUrl, {
        resource_type: 'video', // Specify that the source is a video
        transformation: [
          { width: 300, height: 300, crop: 'fill', format: 'jpg' },
          { start_offset: timestamp, flags: "layer_apply" } // Correct transformation for extracting still frames
        ]
      })
    );

    const results = await Promise.all(promises);
    const frames = results.map(result => result.secure_url);

    return new NextResponse(JSON.stringify({ message: 'Frames extracted successfully', frames }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Frame extraction failed:', error);
    return new NextResponse(JSON.stringify({ message: 'Frame extraction failed', error: error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
