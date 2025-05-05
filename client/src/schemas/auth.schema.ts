import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string(),
  // .min(8, { message: 'Password must be at least 8 characters long' })
  // .refine((value) => /[A-Za-z]/.test(value), {
  //   message: 'Password must contain at least one letter',
  // })
  // .refine((value) => /\d/.test(value), {
  //   message: 'Password must contain at least one number',
  // })
  // .refine((value) => /[@$!%*#?&]/.test(value), {
  //   message: 'Password must contain at least one special character (@$!%*#?&)',
  // }),
})

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((value) => /[A-Za-z]/.test(value), {
      message: 'Password must contain at least one letter',
    })
    .refine((value) => /\d/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[@$!%*#?&]/.test(value), {
      message:
        'Password must contain at least one special character (@$!%*#?&)',
    }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
