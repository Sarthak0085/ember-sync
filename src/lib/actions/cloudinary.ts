'use server';

import cloudinary from '@/lib/cloudinary';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function getPublicIdFromCloudinaryUrl(imageUrl: string): string | null {
  const parts = imageUrl.split('/');
  const uploadIndex = parts.indexOf('upload');

  if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
    return null;
  }

  const publicIdWithVersionAndExtension = parts
    .slice(uploadIndex + 1)
    .join('/');

  const publicIdMatch = publicIdWithVersionAndExtension.match(
    /(?:v\d+\/)?(.+?)(?:\.\w+)?$/,
  );

  if (publicIdMatch && publicIdMatch[1]) {
    return publicIdMatch[1];
  }
  return null;
}

// upload image action
export const uploadImageToCloudinary = async (image: string, size: number) => {
  try {
    if (!image) {
      return {
        success: false,
        message: 'No image uploaded',
      };
    }

    if (size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `File size exceeds ${MAX_FILE_SIZE}MB limit.`,
      };
    }

    // const uploadResult = await new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload(
    //     fileBase64,
    //     {
    //       folder: 'user_profiles', // Cloudinary folder
    //       resource_type: 'auto',
    //       // Add any other Cloudinary upload options here
    //     },
    //     (error, result) => {
    //       if (error) return reject(error);
    //       resolve(result);
    //     },
    //   );
    // });
    const upload = await cloudinary.uploader.upload(image, {
      folder: 'profile_images',
      resource_type: 'image',
    });

    if (!upload || !upload.secure_url) {
      return {
        success: false,
        message: 'Error while uploading the file',
      };
    }

    const result = upload as { secure_url: string; public_id: string };

    return {
      success: true,
      message: 'Image uploaded successfully!',
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return {
      success: false,
      message: 'Failed to upload image due to a server error.',
    };
  }
};

// delete image if present
export async function deleteImageFromCloudinary(imageUrl: string) {
  try {
    if (!imageUrl) {
      return { success: false, message: 'No image url provided for deletion.' };
    }
    const publicId = getPublicIdFromCloudinaryUrl(imageUrl);

    if (!publicId) {
      return { success: false, message: 'No public ID found for deletion.' };
    }

    const destroy = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    if (destroy.result !== 'ok') {
      console.error('Cloudinary deletion failed:', destroy);
      return {
        success: false,
        message: `Failed to delete image: ${destroy.result}.`,
      };
    }

    return { success: true, message: 'Image deleted successfully!' };
  } catch (error) {
    console.error('Cloudinary deletion failed:', error);
    return {
      success: false,
      message: 'Failed to delete image due to a server error.',
    };
  }
}
