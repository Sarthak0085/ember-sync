'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  CogIcon,
  GraduationCap,
  MailIcon,
  PhoneIcon,
  TargetIcon,
  UniversityIcon,
  UserIcon,
  UserPenIcon,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { ImageUpload } from '@/components/profile/image-upload';
import { CustomInput } from '@/components/custom-input';
import { CustomCalendarPicker } from '@/components/custom-date';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProfileFormData, profileSchema } from '@/lib/schemas';
import { useAuth } from '@/context/auth';
import { saveProfile } from '@/app/profile/action';
import { Profile } from '@/types';

interface ProfileFormProps {
  data?: Profile;
}

export const ProfileForm = ({ data }: ProfileFormProps) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: data?.displayName || '',
      username: data?.username ?? '',
      email: data?.email ?? '',
      description: data?.description ?? '',
      degree: data?.degree ?? '',
      field: data?.field ?? undefined,
      institute: data?.institute ?? '',
      grade: data?.grade ?? '',
      startYear: data?.startYear ?? undefined,
      passYear: data?.passYear ?? undefined,
      phoneNumber: data?.phoneNumber ?? undefined,
      image: data?.image ?? '',
    },
  });

  const onSubmit = async (values: ProfileFormData) => {
    console.log('data', values);
    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      toast.error('Please login to access this.');
      return;
    }
    const response = await saveProfile({ values, token });
    console.log('Response', response);
    if (response.error || response.success === false) {
      toast.error(response?.error ?? response?.message);
      return;
    } else {
      toast.success('Profile updated successfully');
      router.push(`/profile`);
    }
  };

  return (
    <Card className='w-full max-w-3xl bg-transparent p-8 rounded-lg shadow-xl'>
      <CardHeader>
        <CardTitle className='text-lg'>Personal Details</CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          View and manage your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='text-md my-6 justify-start'>Personal Info</div>
            <ImageUpload
              form={form}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <fieldset
              className='space-y-6'
              disabled={form.formState.isSubmitting || isLoading}
            >
              <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='displayName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Full Name <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='John Doe'
                          icon={UserIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Username <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='john@doe'
                          icon={UserIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Email Address{' '}
                        <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='example@gmail.com'
                          icon={MailIcon}
                          field={field}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='62808*****'
                          icon={PhoneIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      About Me (upto 500 characters){' '}
                      <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <CustomInput
                        type='text'
                        placeholder='Software engineer passionate about building high-performance web applications. I specialize in Next.js, crafting engaging user experiences with a focus on efficient server-side rendering and scalable architecture. Constantly exploring the latest in web tech to deliver impactful digital solutions.'
                        icon={UserPenIcon}
                        textarea={{ rows: 6 }}
                        field={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <div className='text-md my-6'>Education</div>
            <fieldset
              className='space-y-6'
              disabled={form.formState.isSubmitting || isLoading}
            >
              <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='degree'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Qualification{' '}
                        <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='Bachelor of Technology'
                          icon={GraduationCap}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='field'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Field</FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='Computer Science'
                          icon={CogIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='institute'
                  render={({ field }) => (
                    <FormItem className='w-full sm:w-[70%]'>
                      <FormLabel>
                        Institute <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='NIT, Jalandhar'
                          icon={UniversityIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='grade'
                  render={({ field }) => (
                    <FormItem className='w-full sm:w-[30%]'>
                      <FormLabel>
                        CGPA/Percentage{' '}
                        <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomInput
                          type='text'
                          placeholder='7.9'
                          icon={TargetIcon}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full flex flex-col sm:flex-row items-center gap-4'>
                <FormField
                  control={form.control}
                  name='startYear'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Start Year <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomCalendarPicker
                          name='startYear'
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='passYear'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Pass Year <span className='text-destructive'>*</span>
                      </FormLabel>
                      <FormControl>
                        <CustomCalendarPicker
                          name='passYear'
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
            <div className='flex justify-end mt-6'>
              <Button
                type='submit'
                variant={'default'}
                className='text-md w-[80px] bg-blue-500 hover:bg-blue-700'
                disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
