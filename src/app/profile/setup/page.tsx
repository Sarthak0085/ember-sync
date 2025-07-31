import { ProfileForm } from '@/components/profile/profile-form';
import { getProfileByUserId } from '../action';
import { Profile } from '@/types';

export default async function ProfileFormPage() {
  const response = await getProfileByUserId();
  console.log('data', response);
  const data = response?.data;
  return (
    <div className='w-full flex items-center justify-center min-h-screen my-4'>
      <ProfileForm data={data as unknown as Profile} />
    </div>
  );
}
