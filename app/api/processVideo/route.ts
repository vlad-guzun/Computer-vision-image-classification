// app/api/processVideo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { downloadAndProcessVideo } from "../../../lib/download_and_process_video";

export async function GET(req: NextRequest) {
  const videoUrl = 'https://utfs.io/f/17f29841-6fcc-46f9-b954-6ced0f461f01-en7l1i.mp4'; // Hardcoded URL
  //const videoUrl = await req.json();
  //$vectorSearch = $this->getVectorSearch($videoUrl);

  try {
    const frames = await downloadAndProcessVideo(videoUrl);
    console.log('Extracted frames before replacing %d:', frames);

    // Replace %d with the actual frame numbers
    const processedFrames = frames.map((frame:any, index:number) => frame.replace('%d', (index + 1).toString()));
    console.log('Processed frames:', processedFrames);

    return NextResponse.json({ message: 'Video processed successfully', frames: processedFrames }, { status: 200 });
  } catch (error) {
    console.error('Failed to process video:', error);
    return NextResponse.json({ error: 'Failed to process video' }, { status: 500 });
  }
}
