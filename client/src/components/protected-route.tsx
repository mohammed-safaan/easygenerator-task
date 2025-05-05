import { useAuth } from '@/hooks/useAuth'
import { authApi } from '@/services/api'
import { Loader2 } from 'lucide-react'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const validateAuth = async () => {
      if (isAuthenticated) {
        try {
          await authApi.getProfile()
          setIsValidating(false)
        } catch (error: unknown) {
          console.error('Authentication validation failed:', error)
          await logout()
          navigate({ to: '/login' })
        }
      } else {
        setIsValidating(false)
        navigate({ to: '/login' })
      }
    }

    validateAuth()
  }, [isAuthenticated, navigate, logout])

  if (isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}
