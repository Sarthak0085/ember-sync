'use client';

import * as React from 'react';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RHFCalendarPickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  name: string;
  disabled?: boolean;
  onBlur?: () => void;
}

export function CustomCalendarPicker({
  value,
  onChange,
  name,
  disabled,
  onBlur,
}: RHFCalendarPickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onChange(date);
    setOpen(false);
    onBlur?.();
  };

  return (
    <div className='flex flex-col gap-1'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id={name}
            className={cn(
              'relative bg-transparent hover:bg-transparent max-w-64 !px-8 justify-between font-normal',
              !value && 'text-muted-foreground',
            )}
            disabled={disabled}
            onBlur={onBlur}
          >
            {value ? format(value, 'PPP') : 'Select date'}
            <ChevronDownIcon className='absolute size-4 shrink-0 opacity-50 top-[50%] right-2 -translate-y-1/2' />
            <CalendarIcon className='absolute size-4 shrink-0 opacity-50 top-[50%] left-2 -translate-y-1/2' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={handleDateSelect}
            captionLayout='dropdown'
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
