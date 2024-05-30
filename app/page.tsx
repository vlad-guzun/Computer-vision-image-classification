"use client";
require("@tensorflow/tfjs");

import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [frames, setFrames] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<{ [key: string]: string }>({});
  const [model, setModel] = useState<any>(null);

  // Load the model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setLoading(false);
    };

    setLoading(true);
    loadModel();
  }, []);

  const handleImageLoad = async (index: number) => {
    if (model && frames[index]) {
      const img = document.getElementById(`frame-${index}`) as HTMLImageElement;
      const prediction = await model.classify(img);
      if (prediction.length > 0) {
        // Take the highest probability classification and process it
        const mostProbablePrediction = prediction[0].className.split(',')[0].trim();
        setPredictions(prev => ({ ...prev, [frames[index]]: mostProbablePrediction }));
      }
    }
  };

  const handleExtractFrames = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/uploadVideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://utfs.io/f/17f29841-6fcc-46f9-b954-6ced0f461f01-en7l1i.mp4' })
      });
      const data = await response.json();
      setFrames(data.data);
      setLoading(false);
      console.log('Response:', data);
    } catch (error) {
      console.error('Error extracting frames:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleExtractFrames} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
      <div>
        {frames.map((frame, index) => (
          <div key={index}>
            <img id={`frame-${index}`} crossOrigin="anonymous" src={frame} alt={`Frame ${index}`} onLoad={() => handleImageLoad(index)} />
            <p>{predictions[frame] || 'Loading prediction...'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
