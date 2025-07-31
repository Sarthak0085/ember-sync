import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must atleast 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        'Password must contain uppercase, lowercase, number, and special character',
      ),
    confirmPassword: z
      .string()
      .min(8, 'Password must atleast 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        'Password must contain uppercase, lowercase, number, and special character',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password and Confirm Password must match',
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string('Password is required')
    .min(8, { message: 'Password must have atleast 8 charcters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const profileSchema = z
  .object({
    displayName: z
      .string('Display Name is required')
      .min(2, 'Display Name must contains atleast 2 characters'),
    username: z
      .string('Username is required')
      .min(2, 'Username must contains atleast 2 characters'),
    email: z.email('Please enter a valid email address'),
    phoneNumber: z
      .string('Phone Number is required')
      .length(10, 'Phone Number must contain the 10 characters')
      .optional(),
    description: z
      .string('Description is required')
      .min(50, 'Description must not be less than 50 characters')
      .max(500, 'Description must not above 500 characters'),
    degree: z.string('Degree is required').min(2, 'Degree is required'),
    field: z.string().optional(),
    institute: z
      .string('Institute is required')
      .min(2, 'Institute is required'),
    grade: z.string('Grade is required').min(1, 'Grade is required'),
    startYear: z.date().min(1, 'Start Year is required'),
    passYear: z.date().min(1, 'Pass Year is required'),
    image: z.string('Image is required').min(1, 'Image is required'),
  })
  .refine((data) => new Date(data.startYear) < new Date(data.passYear), {
    path: ['passYear'],
    message: 'Pass Year must be greater than start year',
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
