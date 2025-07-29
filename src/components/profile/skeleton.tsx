import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfilePageSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-950'>
      <Card className='w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl space-y-6 animate-pulse'>
        <div className='flex flex-col items-center mb-6'>
          <Skeleton className='h-28 w-28 rounded-full mb-4' />
          <Skeleton className='h-8 w-48 mb-2' />
          <Skeleton className='h-5 w-64' />
        </div>

        <div className='space-y-4'>
          <Skeleton className='h-6 w-48' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>

        <div className='space-y-4'>
          <Skeleton className='h-6 w-36' />
          <Skeleton className='h-24 w-full' />
        </div>

        <div className='space-y-4'>
          <Skeleton className='h-6 w-40' />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full col-span-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </Card>
    </div>
  );
};
