'use server';

import { auth, firestore } from '@/firebase/server';
import { sendEmail } from '@/lib/actions/nodemailer';
import { ProfileFormData, profileSchema } from '@/lib/schemas';
import { Profile } from '@/types';
import { cookies } from 'next/headers';

interface SaveProfileProps {
  values: ProfileFormData;
  token: string;
}

export const saveProfile = async ({ values, token }: SaveProfileProps) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return {
        error: true,
        message: 'Unauthorized. Please login to access this.',
      };
    }

    const userId = verifiedToken.uid;

    const validation = profileSchema.safeParse(values);
    if (!validation.success) {
      return {
        error: true,
        message:
          validation.error.issues[0]?.message ?? 'Validation error occured',
      };
    }

    const userDocRef = firestore.collection('users').doc(userId);
    const user = await userDocRef.get();

    if (!user.exists) {
      console.log(
        `Profile not found for email: ${values.email}. Cannot update.`,
      );
      return {
        success: false,
        message:
          'Profile not found with this email. Please ensure the email is correct.',
      };
    }

    const existingUserData = user.data();
    if (existingUserData && existingUserData.email !== values.email) {
      return {
        error: true,
        message:
          'Email cannot be updated via this function. Please use a separate email change flow.',
      };
    }

    const updatedData = {
      ...values,
      id: userId,
      updatedAt: new Date(),
      emailVerified: true,
    };

    await userDocRef.update(updatedData);

    await sendEmail({
      beforeProfile: existingUserData as Profile,
      afterProfile: updatedData as Profile,
      subject: 'Profile updated successfully',
    });

    console.log(
      `Profile with ID ${userId} (email: ${values.email}) updated successfully.`,
    );
    return {
      success: true,
      profileId: userId,
      message: 'Profile updated successfully.',
    };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      message: `An error occurred during profile update: ${error.message}`,
      error: error,
    };
  }
};

export const getProfileByUserId = async () => {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore?.get(
    'firebase_auth_access_token',
  )?.value;

  if (!accessTokenCookie) {
    console.warn('No firebase_auth_access_token cookie found.');
    return null;
  }

  let userId: string | null = null;

  try {
    const verifiedToken = await auth?.verifyIdToken(accessTokenCookie);
    userId = verifiedToken?.uid;
  } catch (error) {
    console.error('Error verifying firebase_auth_access_token:', error);
    cookieStore.delete('firebase_auth_access_token');
    return null;
  }

  try {
    const doc = await firestore.collection('users').doc(userId).get();

    if (!doc.exists) {
      console.error(
        `No profile found for user ${userId} in 'profile' collection.`,
      );
      return null;
    }
    const data = doc.data();

    const profileData = {
      id: doc?.id,
      displayName: data?.displayName ?? '',
      email: data?.email ?? '',
      username: data?.username ?? '',
      image: data?.image ?? '',
      phoneNumber: data?.phoneNumber ?? null,
      degree: data?.degree ?? '',
      field: data?.field ?? null,
      grade: data?.grade ?? '',
      description: data?.description ?? '',
      institute: data?.institute ?? '',
      startYear: data?.startYear?.toDate() ?? undefined,
      passYear: data?.passYear?.toDate() ?? undefined,
      createdAt: data?.createdAt?.toDate() ?? new Date(0),
      updatedAt: data?.updatedAt?.toDate() ?? new Date(0),
    };

    return {
      success: true,
      data: profileData,
    };
  } catch (error) {
    console.error('Error fetching user profile :', error);
    return null;
  }
};

export const getProfileById = async (userId: string) => {
  try {
    const doc = await firestore.collection('users').doc(userId).get();

    if (!doc.exists) {
      console.error(
        `No profile found for user ${userId} in 'profile' collection.`,
      );
      return null;
    }
    const data = doc.data();

    const profileData = {
      id: doc?.id,
      displayName: data?.displayName ?? '',
      email: data?.email ?? '',
      username: data?.username ?? '',
      image: data?.image ?? '',
      phoneNumber: data?.phoneNumber ?? null,
      degree: data?.degree ?? '',
      field: data?.field ?? null,
      grade: data?.grade ?? '',
      description: data?.description ?? '',
      institute: data?.institute ?? '',
      startYear: data?.startYear?.toDate() ?? undefined,
      passYear: data?.passYear?.toDate() ?? undefined,
      createdAt: data?.createdAt?.toDate() ?? new Date(0),
      updatedAt: data?.updatedAt?.toDate() ?? new Date(0),
    };

    return {
      success: true,
      data: profileData,
    };
  } catch (error) {
    console.error('Error fetching user profile :', error);
    return null;
  }
};
