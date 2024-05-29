// app/api/processVideo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadAndProcessVideo } from "../../../lib/videoDownload";

export async function GET(req: NextRequest) {
  const videoUrl = 'https://utfs.io/f/8111cb7b-788f-4f5f-ba7f-06ba7b5876e2-f11f4y.mp4'; // Hardcoded URL

  try {
    const frames = await uploadAndProcessVideo(videoUrl);
    console.log('Extracted frames:', frames);
    return NextResponse.json({ message: 'Video processed successfully', frames }, { status: 200 });
  } catch (error) {
    console.error('Failed to process video:', error);
    return NextResponse.json({ error: 'Failed to process video' }, { status: 500 });
  }
}
