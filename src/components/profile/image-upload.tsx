'use client';

import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Camera, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/lib/actions/cloudinary';

interface ImageUploadProps {
  form: UseFormReturn<any, any>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const ImageUpload = ({
  form,
  isLoading,
  setIsLoading,
}: ImageUploadProps) => {
  const [image, setImage] = React.useState<string>(
    form.getValues('image') ?? '',
  );
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (image) {
          try {
            setIsLoading(true);
            toast.warning('Please wait. Image is uploading to the database');
            const deleteFile = await deleteImageFromCloudinary(image);
            if (!deleteFile.success) {
              toast.error('Error while deleting previous image');
            }
          } catch (error) {
            console.error('Image deleting from cloudinary error :', error);
            toast.error('Error while deleting previous image from cloudinary');
          } finally {
            setIsLoading(false);
          }
        }

        try {
          setIsLoading(true);
          const upload = await uploadImageToCloudinary(
            reader.result as string,
            file.size,
          );
          if (upload.success) {
            toast.success('Image upload successfully');
            setImage(upload?.url as string);
            form.setValue('image', upload?.url);
          } else {
            toast.error(upload.message);
          }
        } catch (error) {
          console.error('Image Uploading to cloudinary error :', error);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='w-full flex flex-col items-center justify-center my-8'>
      <div className='relative size-32'>
        <Avatar className='w-full h-full border-2 border-gray-300 dark:border-gray-700'>
          {image ? (
            <AvatarImage
              src={image}
              alt='Profile Image'
              className='object-cover'
            />
          ) : (
            <AvatarFallback className='flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500'>
              <ImageIcon className='h-1/2 w-1/2' />
              <span className='sr-only'>Profile Image</span>
            </AvatarFallback>
          )}
        </Avatar>
        <Input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          accept='image/*'
          disabled={form.formState.isSubmitting || isLoading}
        />
        <Button
          type='button'
          onClick={handleButtonClick}
          variant='secondary'
          size='icon'
          className='absolute bottom-0 right-0 size-8 rounded-full border-2 border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          disabled={form.formState.isSubmitting || isLoading}
        >
          <Camera className='h-4 w-4' />
          <span className='sr-only'>Upload image</span>
        </Button>
      </div>
      {!image && form.formState.isSubmitted && (
        <span className='text-destructive text-sm mt-2'>
          Image Upload is required
        </span>
      )}
    </div>
  );
};
