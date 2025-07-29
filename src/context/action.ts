'use server';

import { auth, firestore } from '@/firebase/server';
import { cookies } from 'next/headers';

interface SetTokenProps {
  token: string;
  refreshToken: string;
}

export const setToken = async ({ token, refreshToken }: SetTokenProps) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return;
    }
    const uid = verifiedToken.uid;

    const cookieStore = await cookies();
    cookieStore.set('firebase_auth_access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    cookieStore.set('firebase_auth_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    const userDoc = firestore.collection('users').doc(uid);
    const user = await userDoc.get();

    if (!user.exists) {
      await userDoc.set({
        fullName: verifiedToken.name || verifiedToken.fullName || null,
        email: verifiedToken.email || null,
        role: 'user',
        createdAt: new Date(),
        image: verifiedToken.picture || null,
        lastLoginAt: new Date(),
        emailVerified: verifiedToken.email_verified ?? false,
      });
      console.log(`Firestore profile created for new user: ${uid}`);
    } else {
      await userDoc.update({
        lastLoginAt: new Date(),
      });
      console.log(
        `Existing user profile updated for: ${uid} (lastLoginAt updated)`,
      );
    }
  } catch (error) {
    console.error('Set Cookies Error :', error);
  }
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('firebase_auth_access_token');
  cookieStore.delete('firebase_auth_refresh_token');
};
