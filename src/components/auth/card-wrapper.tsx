'use client';

import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ChangeOption } from './change-option';
import { Social } from './social';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  headerDescription: string;
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  headerDescription,
}: CardWrapperProps) => {
  return (
    <Card className='w-full bg-transparent shadow-md mx-4 xs:w-md'>
      <CardHeader>
        <div className='w-full flex flex-col items-center justify-center pb-3'>
          <h1
            className={cn(
              'text-2xl font-semibold flex items-center gap-2',
              font.className,
            )}
          >
            🔐<span className='text-3xl logo-style'>EmberSync</span>
          </h1>
        </div>
        <CardTitle>{headerLabel}</CardTitle>
        <CardDescription className='text-muted-foreground text-sm'>
          {headerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
      {showSocial && (
        <>
          <div className='flex items-center mb-3 px-3'>
            <div className='flex-grow border-t border-gray-300' />
            <span className='mx-2 text-gray-600 dark:text-gray-100 text-sm'>
              OR
            </span>
            <div className='flex-grow border-t border-gray-300' />
          </div>
          <CardFooter className='max-w-full'>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <ChangeOption label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
