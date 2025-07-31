'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CustomInputProps {
  icon: LucideIcon;
  type: string;
  placeholder?: string;
  field: unknown;
  readOnly?: boolean;
  textarea?: {
    rows: number;
  };
}

export const CustomInput = ({
  icon: Icon,
  type,
  field,
  placeholder,
  readOnly,
  textarea,
}: CustomInputProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  return (
    <div className='w-full relative'>
      {textarea ? (
        <Textarea
          placeholder={placeholder}
          className='px-8'
          rows={textarea.rows}
          {...field!}
        />
      ) : (
        <Input
          type={
            type === 'password' ? (passwordVisible ? 'text' : 'password') : type
          }
          placeholder={placeholder}
          className='px-8'
          readOnly={readOnly}
          disabled={readOnly}
          {...field!}
        />
      )}
      <div
        className={cn(
          'absolute left-2 top-[50%] -translate-y-1/2',
          textarea && 'top-1 translate-y-1/2',
        )}
      >
        <Icon className='size-4' aria-hidden='true' />
      </div>
      {type === 'password' && (
        <div
          className='absolute right-2 cursor-pointer top-[50%] -translate-y-1/2'
          onClick={() => setPasswordVisible((prev) => !prev)}
          aria-label={passwordVisible ? 'Hide password' : 'Show password'}
          aria-pressed={passwordVisible}
        >
          {passwordVisible ? (
            <EyeOffIcon className='size-4' aria-hidden='true' />
          ) : (
            <EyeIcon className='size-4' aria-hidden='true' />
          )}
        </div>
      )}
    </div>
  );
};
