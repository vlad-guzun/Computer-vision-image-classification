"use client";
require("@tensorflow/tfjs");

import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [frames, setFrames] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<{ [key: string]: string }>({});
  const [processedCount, setProcessedCount] = useState(0);  // Tracks number of processed frames
  const [model, setModel] = useState<any>(null);

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
        const mostProbablePrediction = prediction[0].className.split(',')[0].trim();
        setPredictions(prev => ({ ...prev, [frames[index]]: mostProbablePrediction }));
        setProcessedCount(prev => prev + 1);  // Increment the processed count
      }
    }
  };

  useEffect(() => {
    if (processedCount === frames.length && frames.length > 0) {
      const uniquePredictions = new Set(Object.values(predictions));
      const predictionWords = Array.from(uniquePredictions).join(' ').split(' ');
      const reversedPredictions = predictionWords.reverse().join(' ');

      console.log('Reversed Merged Unique Predictions:', reversedPredictions);
    }
  }, [processedCount, predictions]);

  const handleExtractFrames = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/uploadVideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://utfs.io/f/093911a3-ab59-4357-ad21-7e0b5b18b2e7-e6fjr2.mp4' })
      });
      const data = await response.json();
      setFrames(data.data);
      setPredictions({});
      setProcessedCount(0);  // Reset the counter on new data
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
