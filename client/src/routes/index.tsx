import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { GalleryVerticalEnd, LogOutIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Hero } from '@/components/hero'
import { ProtectedRoute } from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate({ to: '/login' })
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto">
        <Button
          onClick={handleLogout}
          className="fixed top-3 right-20 z-50 flex items-center justify-end gap-2"
        >
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>
        <div className="flex flex-col gap-4 py-6 md:py-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Easygenerator Inc.
            </Link>
          </div>
        </div>
        <Hero />
      </div>
    </ProtectedRoute>
  )
}
