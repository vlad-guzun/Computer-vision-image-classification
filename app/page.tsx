// In your React component or wherever you handle the button click
"use client";
import React, { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const uploadVideo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/processVideo');
      const data = await response.json();

      console.log('Uploaded Video Information:', data.uploadResponse.secure_url);  // Log the uploaded video info to the browser console
    } catch (error) {
      console.error('Error uploading video:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={uploadVideo} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default Home;
