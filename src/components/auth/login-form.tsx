'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LockIcon, MailIcon } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '@/firebase/client';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { LoginFormData, loginSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success('Logged In successfully');
      router.push('/');
    } catch (err: any) {
      console.error('Registration Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please try logging in.');
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
      headerLabel='Welcome Back'
      headerDescription='Sign In to your account to continue'
      showSocial={true}
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account? Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            className='space-y-6'
            disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <CustomInput
                      type='email'
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
          </fieldset>
          <Button
            type='submit'
            variant={'default'}
            className='flex items-center justify-center w-full mt-6'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Logging In...' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
