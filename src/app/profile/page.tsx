import { Suspense } from 'react';

import { Profile } from '@/components/profile/profile';
import { ProfilePageSkeleton } from '@/components/profile/skeleton';
import { getProfileByUserId } from '@/app/profile/action';
import { Profile as ProfileType } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function ProfileDetailsPage() {
  const result = await getProfileByUserId();
  const data = result?.data;

  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='font-bold text-2xl'>No Profile Exists</h1>
        <p className='text-lg text-muted-foreground mb-8 max-w-md'>
          It looks like your profile hasn't been created yet.
        </p>
        <div className='grid sm:grid-cols-2 gap-4'>
          <Button
            variant={'outline'}
            className='p-4 font-semibold button-background'
            asChild
          >
            <Link href='/'>
              <ArrowLeft className='size-5' /> Go Back Home
            </Link>
          </Button>
          <Button variant={'default'} className='p-4 font-semibold' asChild>
            <Link href='/profile/setup'>
              Go to Profile Setup <ArrowRight className='size-5' />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <Profile data={data as ProfileType} />
    </Suspense>
  );
}
