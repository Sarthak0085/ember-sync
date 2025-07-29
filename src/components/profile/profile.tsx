'use client';

import { format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Profile as ProfileType } from '@/types';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  data: ProfileType;
}

export const Profile = ({ data: profile }: ProfileProps) => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-emerald-50 dark:bg-gray-950'>
      <Card className='w-full max-w-3xl bg-transparent dark:bg-gray-900 p-8 rounded-lg shadow-xl'>
        <CardHeader className='text-center pb-6 border-b dark:border-gray-700'>
          <div className='flex justify-end'>
            <Button
              variant={'default'}
              className='bg-gradient-to-br to-blue-400 from-emerald-500 font-bold'
              onClick={() => router.push(`/profile/${profile?.id}/edit`)}
            >
              Edit
              <ArrowRight className='size-4' />
            </Button>
          </div>
          <div className='flex flex-col items-center gap-4 mb-4'>
            <Avatar className='h-28 w-28 border-4 border-primary/20 '>
              <AvatarImage src={profile?.image} alt={profile?.fullName} />
              <AvatarFallback className='text-4xl bg-blue-400'>
                {profile?.fullName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className='text-3xl font-extrabold text-gray-900 dark:text-white'>
              {profile?.fullName}
            </CardTitle>
            <CardDescription className='text-lg text-gray-600 dark:text-gray-400'>
              @{profile?.username}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='pt-6 space-y-8'>
          {/* Personal Information */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold border-b pb-2 mb-4 text-gray-800 dark:text-gray-200'>
              Personal Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Email
                </Label>
                <p className='text-gray-900 dark:text-gray-100 font-medium'>
                  {profile?.email}
                </p>
              </div>
              {profile?.phoneNumber && (
                <div>
                  <Label className='text-gray-500 dark:text-gray-400'>
                    Phone Number
                  </Label>
                  <p className='text-gray-900 dark:text-gray-100'>
                    {profile?.phoneNumber}
                  </p>
                </div>
              )}
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Joined On
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {format(new Date(profile?.createdAt as Date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* About Me */}

          <div className='space-y-4'>
            <h3 className='text-xl font-semibold border-b pb-2 mb-4 text-gray-800 dark:text-gray-200'>
              About Me
            </h3>
            <div>
              <Label className='text-gray-500 dark:text-gray-400 mt-2'>
                Description
              </Label>
              <p className='text-gray-900 dark:text-gray-100 whitespace-pre-line'>
                {profile?.description}
              </p>
            </div>
          </div>

          {/* Education Details */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold border-b pb-2 mb-4 text-gray-800 dark:text-gray-200'>
              Education Details
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Degree
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {profile?.degree}
                </p>
              </div>
              {profile?.field && (
                <div>
                  <Label className='text-gray-500 dark:text-gray-400'>
                    Field of Study
                  </Label>
                  <p className='text-gray-900 dark:text-gray-100'>
                    {profile?.field}
                  </p>
                </div>
              )}
              <div className='col-span-1 md:col-span-2'>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Institute
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {profile?.institute}
                </p>
              </div>
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Start Year
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {format(profile?.startYear, 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Pass Year
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {format(profile?.passYear, 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <Label className='text-gray-500 dark:text-gray-400'>
                  Grade/CGPA
                </Label>
                <p className='text-gray-900 dark:text-gray-100'>
                  {profile?.grade}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
