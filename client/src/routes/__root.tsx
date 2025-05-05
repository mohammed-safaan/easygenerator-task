import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="fixed top-3 right-3 z-50 flex items-center justify-end gap-2">
        <ModeToggle />
      </div>
      <Outlet />
      <Toaster />
    </ThemeProvider>
  ),

  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuth.getState()

    // If not authenticated and trying to access protected routes
    if (!isAuthenticated && location.pathname === '/') {
      throw redirect({ to: '/login' })
    }

    // If authenticated and trying to access auth routes
    if (isAuthenticated && ['/login', '/signup'].includes(location.pathname)) {
      throw redirect({ to: '/' })
    }
  },
})
