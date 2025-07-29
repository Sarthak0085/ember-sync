import { v2 as cloudinary } from 'cloudinary';

if (
  !process.env.NEXT_CLOUDINARY_CLOUD_NAME ||
  !process.env.NEXT_CLOUDINARY_API_KEY ||
  !process.env.NEXT_CLOUDINARY_API_SECRET
) {
  throw new Error(
    'Missing Cloudinary environment variables. Please check .env.local',
  );
}

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export default cloudinary;
