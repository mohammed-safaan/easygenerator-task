import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/schemas/auth.schema'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const loadingToast = toast.loading('Logging in...')

    try {
      await login(values.email, values.password)
      toast.dismiss(loadingToast)
      toast.success('Login successful!')
      navigate({ to: '/' })
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('Invalid email or password')
      console.error('Login error:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md mx-auto py-10 px-4"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  type="email"
                  {...field}
                  onBlur={field.onBlur} // Add blur handler
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  onBlur={field.onBlur} // Add blur handler
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Login
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}
