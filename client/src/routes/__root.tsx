import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="fixed top-3 right-3 z-50 flex items-center justify-end gap-2">
        <ModeToggle />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
})
