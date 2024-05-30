// app/page/home.tsx
"use client";
import React, { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);

// Example React component method to call the API
const handleExtractFrames = async () => {
  try {
    const response = await fetch('/api/uploadVideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://utfs.io/f/339d63a2-7d03-4692-ad8a-668237431fab-nz8k0.mp4' })
    });
    const data = await response.json();
    console.log('Response:', data);


  } catch (error) {
    console.error('Error extracting frames:', error);
  }
};





  return (
    <div>
      <button onClick={handleExtractFrames} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default Home;
