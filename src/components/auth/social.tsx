'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/client';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { setToken } from '@/context/action';

export const Social = () => {
  const router = useRouter();
  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const userResult = await signInWithPopup(auth, provider);
    handleAuthResult(userResult);
  };
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userResult = await signInWithPopup(auth, provider);
    handleAuthResult(userResult);
  };
  const handleAuthResult = async (userResult: UserCredential) => {
    try {
      const user = userResult.user;

      const token = await user.getIdToken();
      const refreshToken = user.refreshToken;
      const isNewUser = (userResult as any)._tokenResponse.isNewUser;
      console.log('userResult', userResult);
      if (token && refreshToken) {
        await setToken({ token, refreshToken });
      }
      console.log('outside token');
      toast.success('Logged In successful');
      if (isNewUser) {
        console.log('profile');
        router.push('/profile/setup');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Social Error:', err);

      // Add specific error handling for GitHub/Social Providers
      if (err.code === 'auth/account-exists-with-different-credential') {
        const email = err.customData?.email; // Get the email from the error object if available
        toast.error(
          `This email (${
            email || 'your email'
          }) is already registered with another provider. ` +
            `Please sign in using your existing method or link your accounts.`,
        );
      }
      // General Firebase Auth errors
      else if (err.code === 'auth/email-already-in-use') {
        // This might still occur for email/password based sign-ups
        toast.error('This email is already registered. Please try logging in.');
      } else if (err.code === 'auth/weak-password') {
        // These are less common for social logins
        toast.error(
          'Password is too weak. Please choose a stronger one (minimum 6 characters).',
        );
      } else if (err.code === 'auth/invalid-email') {
        // Also less common for social logins
        toast.error('The email address is not valid.');
      } else if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        toast.info('Sign-in process cancelled.'); // User closed the popup
      }
      // Common network/server errors during login
      else if (err.code === 'auth/network-request-failed') {
        toast.error(
          'Network error. Please check your internet connection and try again.',
        );
      }
      // Unexpected errors
      else {
        toast.error(
          err.message ||
            'An unexpected error occurred during GitHub sign-in. Please try again.',
        );
      }
    }
  };
  return (
    <div className='w-full flex items-center gap-2'>
      <Button
        variant={'outline'}
        size={'lg'}
        className='flex-1 bg-gradient-to-br from-blue-100 to-emerald-100'
        onClick={() => loginWithGoogle()}
      >
        <Image src={`/google.svg`} alt='Google Logo' height={20} width={20} />
      </Button>
      <Button
        variant={'outline'}
        size={'lg'}
        className='flex-1 bg-gradient-to-br from-blue-100 to-emerald-100'
        onClick={() => loginWithGithub()}
      >
        <Image src={`/github.svg`} alt='Github Logo' height={25} width={25} />
      </Button>
    </div>
  );
};
