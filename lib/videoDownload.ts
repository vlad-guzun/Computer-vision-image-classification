// // app/api/uploadVideo.ts
// import { NextRequest, NextResponse } from 'next/server';
// import cloudinary from 'cloudinary';

// // Configure your Cloudinary account
// cloudinary.v2.config({
//   cloud_name: 'dlqcwi0te',
//   api_key: '235634228739685',
//   api_secret: 'p_0NcPsQTFt1r30QBVacv1gmA_c'
// });

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const videoUrl = body.url;

//     // Perform the upload to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(videoUrl, {
//       resource_type: 'video',
//       upload_preset: 'mdlirgky' // Use your predefined unsigned preset
//     });

//     // Return the result as JSON
//     return new NextResponse(JSON.stringify({ message: 'Upload successful', data: result }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   } catch (error) {
//     console.error('Upload failed:', error);
//     return new NextResponse(JSON.stringify({ message: 'Upload failed', error: error.message }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
// }
