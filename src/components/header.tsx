'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const Header = () => {
  const router = useRouter();
  const auth = useAuth();
  return (
    <div className='h-15 w-full fixed top-0 left-0 right-0 backdrop-blur-lg flex items-center justify-between border-neutral-400 shadow-md z-2'>
      <div className='md:px-8 px-4 logo-style'>
        <div className='text-2xl font-bold'>
          <Link href={'/'}>EmberSync</Link>
        </div>
      </div>
      {!auth?.currentUser && (
        <div className='flex items-center gap-4 px-4'>
          <Link href={'/auth/login'} passHref>
            <Button
              variant={'outline'}
              size={'default'}
              className='w-auto bg-gradient-to-br from-blue-50 to-emerald-100'
            >
              Log In
            </Button>
          </Link>
          <Link href={'/auth/register'} passHref>
            <Button
              variant={'default'}
              className='w-auto bg-gradient-to-br from-blue-300 to-emerald-400'
            >
              Create
              <ArrowRight className='size-4' />
            </Button>
          </Link>
        </div>
      )}
      {auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger className='border-none focus-visible:outline-0 md:px-8 px-4'>
            <Avatar className='size-10'>
              <AvatarImage
                src={auth?.currentUser?.photoURL ?? ''}
                alt='Profile Image'
              />
              <AvatarFallback className='bg-blue-300 text-center text-xl'>
                U
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={6} className='bg-accent'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => auth.logout()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
