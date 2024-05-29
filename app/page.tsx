"use client";
import '@tensorflow/tfjs';
import React, { useEffect, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';

const Home = () => {
  const [loading, setLoading] = useState(false);



  const processVideo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/processVideo');
      const data = await response.json();
      const frames = data.frames;

      console.log('Original Frames:', frames);  // Log the original frames to the browser console

      // Modify frame paths
      const modifiedFrames = frames.map((frame: any, idx: number) => {
        return frame.replace(/frame(\d+)\.png/, `frame1_${idx + 1}.png`);
      });

      console.log('Modified Frames:', modifiedFrames);  // Log the modified frames to the browser console

      // Load MobileNet and classify each frame
      const model = await mobilenet.load();

      for (const framePath of modifiedFrames) {
        const img = new Image();
        img.src = framePath;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        const predictions = await model.classify(img);
        console.log(`Frame (${framePath}):`, predictions);
      }
    } catch (error) {
      console.error('Error processing video:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={processVideo} disabled={loading}>
        {loading ? 'Processing...' : 'Process Video'}
      </button>
    </div>
  );
};

export default Home;
