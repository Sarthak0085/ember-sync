'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[90vh] my-auto text-gray-900 dark:text-gray-100 p-4 text-center'>
      <h1 className='text-6xl md:text-9xl font-extrabold text-primary-500 dark:text-primary-400 mb-4 animate-bounce-slow'>
        404
      </h1>
      <h2 className='text-2xl md:text-4xl font-bold mb-4'>Page Not Found</h2>
      <p className='text-lg md:text-xl mb-8 max-w-md'>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        onClick={handleGoHome}
        className='px-6 py-3 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
      >
        <ArrowLeft className='size-6' /> Go Back Home
      </Button>
    </div>
  );
}
