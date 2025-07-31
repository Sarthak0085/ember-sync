'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/firebase/client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { CustomInput } from '@/components/custom-input';
import { RegisterFormData, registerSchema } from '@/lib/schemas';
import { setToken } from '@/context/action';

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: 'user',
      email: 'user@example.com',
      password: 'P@$$w0rd',
      confirmPassword: 'P@$$w0rd',
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    try {
      const userResult = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userResult.user;

      await updateProfile(user, {
        displayName: values.name,
      });

      const actionCodeSettings = {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/setup`,
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);
      toast.success('Verify Email send to your email. Please verify that');
    } catch (err: any) {
      console.error('Registration Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please try logging in.');
      } else if (err.code === 'auth/weak-password') {
        toast.error(
          'Password is too weak. Please choose a stronger one (minimum 6 characters).',
        );
      } else if (err.code === 'auth/invalid-email') {
        toast.error('The email address is not valid.');
      } else {
        toast.error(
          err.message ||
            'An unexpected error occurred during registration. Please try again.',
        );
      }
    }
  };

  return (
    <CardWrapper
      headerLabel='Create an account'
      headerDescription='Create an account to continue'
      showSocial={true}
      backButtonHref='/auth/login'
      backButtonLabel='Already have an account? Sign In'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            className='space-y-6'
            disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <CustomInput
                      type='text'
                      icon={UserIcon}
                      field={field}
                      placeholder='John Doe'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <CustomInput
                      type='text'
                      icon={MailIcon}
                      field={field}
                      placeholder='example@gmail.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <CustomInput
                      field={field}
                      icon={LockIcon}
                      type='password'
                      placeholder='********'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <CustomInput
                      field={field}
                      icon={LockIcon}
                      type='password'
                      placeholder='********'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <Button
            type='submit'
            variant={'default'}
            className='flex mt-6 items-center justify-center w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
