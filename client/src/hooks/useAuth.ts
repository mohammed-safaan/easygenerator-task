import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/services/api'

interface AuthState {
  token: string | null
  user: any | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const data = await authApi.login(email, password)
        set({
          token: data.access_token,
          user: data.user,
          isAuthenticated: true,
        })
      },
      signup: async (email: string, password: string, name: string) => {
        const data = await authApi.signup(email, password, name)
        set({
          token: data.access_token,
          user: data.user,
          isAuthenticated: true,
        })
      },
      logout: async () => {
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
