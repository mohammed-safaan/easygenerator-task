import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/signup', { email, password, name })
    return response.data
  },
  logout: async () => {
    useAuth.getState().logout()
  },
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile')
      return response.data
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Invalid token')
      }
      throw error
    }
  },
}
