"use client";
import '@tensorflow/tfjs';
import React, { useState } from 'react';
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

      // Load MobileNet and classify each frame
      const model = await mobilenet.load();

      for (let i = 0; i < frames.length; i++) {
        const img = new Image();
        img.src = frames[i];
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        const predictions = await model.classify(img);
        console.log(`Frame (${img.src}):`, predictions);
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
