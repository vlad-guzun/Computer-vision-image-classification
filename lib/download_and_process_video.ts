// lib/videoDownload.ts
import path from 'path';
import fs from 'fs';
import got from 'got';
import ffmpeg from 'fluent-ffmpeg';

export async function downloadAndProcessVideo(url: string): Promise<string[]> {
  const videoDir = path.join(process.cwd(), 'public', 'videos');
  const framesDir = path.join(process.cwd(), 'public', 'frames');

  // Ensure directories exist
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  const videoPath = path.join(videoDir, 'downloaded_video.mp4');

  // Download video
  const downloadStream = got.stream(url);
  const fileWriterStream = fs.createWriteStream(videoPath);

  await new Promise((resolve, reject) => {
    downloadStream.pipe(fileWriterStream);

    downloadStream.on('error', (error) => {
      fs.unlinkSync(videoPath);
      reject(error);
    });

    fileWriterStream.on('finish', resolve);
    fileWriterStream.on('error', (error) => {
      fs.unlinkSync(videoPath);
      reject(error);
    });
  });

  // Extract frames
  return new Promise((resolve, reject) => {
    const frames: string[] = [];
    ffmpeg(videoPath)
      .on('filenames', (filenames: string[]) => {
        filenames.forEach((filename, index) => frames.push(`/frames/frame${index + 1}.png`));
      })
      .on('end', () => {
        console.log('Screenshots taken');
        resolve(frames);
      })
      .on('error', (err) => {
        console.error('Error during frame extraction:', err);
        reject(err);
      })
      .screenshots({
        count: 10,  // Extract 10 frames
        folder: framesDir,
        filename: 'frame%d.png'  // Simplified filename format
      });
  });
}
