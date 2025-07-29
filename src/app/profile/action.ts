'use server';

import { auth, firestore } from '@/firebase/server';
import { ProfileFormData, profileSchema } from '@/lib/schemas';
import { cookies } from 'next/headers';

interface SaveProfileProps {
  values: ProfileFormData;
  token: string;
}

export const saveProfile = async ({ values, token }: SaveProfileProps) => {
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

  const query = await firestore
    .collection('profile')
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (!query.empty) {
    return {
      success: false,
      message:
        'You already have one profile. You are not allowed to create new one.',
    };
  }

  const profile = await firestore.collection('profile').add({
    values,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    success: true,
    profileId: profile?.id,
  };
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
    const query = await firestore
      .collection('profile')
      .where('userId', '==', userId)
      .limit(1)
      .get();
    if (query.empty) {
      console.error(
        `No profile found for user ${userId} in 'profile' collection.`,
      );
      return null;
    }

    const doc = query.docs[0];
    const data = doc.data();

    const profileData = {
      id: doc.id,
      userId: data.userId,
      fullName: data.values.fullName ?? '',
      email: data.values.email ?? '',
      username: data.values.username ?? '',
      image: data.values.image ?? '',
      phoneNumber: data.values.phoneNumber ?? null,
      degree: data.values.degree ?? '',
      field: data.values.field ?? null,
      grade: data.values.grade ?? '',
      description: data.values.description ?? '',
      institute: data.values.institute ?? '',
      startYear: data.values.startYear.toDate() ?? new Date(0),
      passYear: data.values.passYear.toDate() ?? new Date(0),
      createdAt: data.createdAt.toDate() ?? new Date(0),
      updatedAt: data.updatedAt.toDate() ?? new Date(0),
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

interface UpdateProfileProps {
  values: ProfileFormData;
  profileId: string;
  token: string;
}

export const updateProfile = async ({
  values,
  profileId,
  token,
}: UpdateProfileProps) => {
  const verifiedToken = await auth?.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: 'Unauthorized. Please login to access this.',
    };
  }

  const userId = verifiedToken?.uid;

  const validation = profileSchema.safeParse(values);
  if (!validation.success) {
    return {
      error: true,
      message:
        validation.error.issues[0]?.message ?? 'Validation error occured',
    };
  }

  const profileRef = firestore.collection('profile').doc(profileId);
  const profile = await profileRef.get();

  if (!profile.exists) {
    return {
      success: false,
      message: 'Profile not found. Cannot update a non-existent profile.',
    };
  }

  const profileData = profile.data();

  if (profileData?.userId !== userId) {
    return {
      error: true,
      message: 'Unauthorized: You do not have permission to edit this profile.',
    };
  }

  try {
    await profileRef.update({
      values: { ...validation.data },
      updatedAt: new Date(),
    });

    return {
      success: true,
      profileId: profileId,
      message: 'Profile updated successfully!',
    };
  } catch (updateError) {
    console.error('Error updating profile:', updateError);
    return {
      error: true,
      message: 'Failed to update profile. Please try again.',
    };
  }
};

export const getProfileByIdAndOwnership = async (profileId: string) => {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get(
    'firebase_auth_access_token',
  )?.value;

  if (!accessTokenCookie) {
    console.warn('No firebase_auth_access_token cookie found.');
    return null;
  }

  let userId: string | null = null;

  try {
    const verifiedToken = await auth.verifyIdToken(accessTokenCookie);
    userId = verifiedToken.uid;
  } catch (error) {
    console.error('Error verifying firebase_auth_access_token:', error);
    cookieStore.delete('firebase_auth_access_token');
    return null;
  }

  try {
    const profile = await firestore.collection('profile').doc(profileId).get();

    if (!profile.exists) {
      console.warn(`Profile with ID ${profileId} not found.`);
      return null;
    }

    const data = profile.data();

    if (!data) {
      console.warn(`Profile data is empty for ID ${profileId}.`);
      return null;
    }

    if (data.userId !== userId) {
      console.warn(
        `Unauthorized access. Profile ${profileId} does not belong to user ${userId}.`,
      );
      return null;
    }

    const profileData = {
      id: profile.id,
      userId: data.userId,
      fullName: data.values.fullName ?? '',
      email: data.values.email ?? '',
      username: data.values.username ?? '',
      image: data.values.image ?? '',
      phoneNumber: data.values.phoneNumber ?? null,
      degree: data.values.degree ?? '',
      field: data.values.field ?? null,
      grade: data.values.grade ?? '',
      description: data.values.description ?? '',
      institute: data.values.institute ?? '',
      startYear: data.values.startYear.toDate() ?? new Date(0),
      passYear: data.values.passYear.toDate() ?? new Date(0),
      createdAt: data.createdAt.toDate() ?? new Date(0),
      updatedAt: data.updatedAt.toDate() ?? new Date(0),
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
