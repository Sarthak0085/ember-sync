'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/client';
import { getRedirectResult } from 'firebase/auth';
import { setToken } from '@/context/action';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result: any = await getRedirectResult(auth);

        if (result) {
          const user = result.user;
          const isNewUser = result._tokenResult?.isNewUser;

          console.log('User signed in via redirect:', user);
          const tokenResult = await user.getIdTokenResult();
          await setToken({
            token: tokenResult.token,
            refreshToken: user.refreshToken,
          });

          if (isNewUser) {
            router.push('/profile');
          } else {
            router.push('/');
          }
        } else {
          console.log(
            'No redirect result found. User might be already logged in or navigating directly.',
          );
          if (!auth.currentUser) {
            router.push('/auth/login');
          } else {
            router.push('/');
          }
        }
      } catch (err) {
        console.error('Error during redirect result processing:', err);
        setError('Authentication failed. Please try again.');
        router.push('/auth/login?error=auth_failed');
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, [router]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Processing login... Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen text-red-500'>
        <p>{error}</p>
      </div>
    );
  }

  return null;
}
