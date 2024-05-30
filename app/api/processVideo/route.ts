// app/api/processVideo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadVideo } from "../../../lib/videoDownload";

export async function GET(req: NextRequest) {
  const videoUrl = 'https://utfs.io/f/8111cb7b-788f-4f5f-ba7f-06ba7b5876e2-f11f4y.mp4'; // Hardcoded URL

  try {
    const uploadResponse = await uploadVideo(videoUrl);
    console.log('Uploaded video info:', uploadResponse);
    return NextResponse.json({ message: 'Video uploaded successfully', uploadResponse }, { status: 200 });
  } catch (error) {
    console.error('Failed to upload video:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  }
}
