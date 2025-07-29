import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { getProfileByIdAndOwnership } from '@/app/profile/action';
import { ProfileForm } from '@/components/profile/profile-form';
import { Button } from '@/components/ui/button';

interface ProfileDetailsPageProps {
  params: Promise<{ profileId: string }>;
}

export default async function ProfileDetailsPage({
  params,
}: ProfileDetailsPageProps) {
  const { profileId } = await params;
  const result = await getProfileByIdAndOwnership(profileId);
  const data = result?.data;

  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='font-bold text-2xl'>No Profile Exists</h1>
        <p className='text-lg text-muted-foreground mb-8 max-w-md'>
          It looks like your profile hasn&apos;t been created yet.
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
            <Link href='/profile'>
              Go to My Profile <ArrowRight className='size-5' />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex items-center justify-center min-h-screen py-4'>
      <ProfileForm data={data} />
    </div>
  );
}
