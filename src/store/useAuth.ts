import { create } from 'zustand'
import { User } from 'types/user/User'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
}

type AuthActions = {
  login: (user: User) => void
  logout: () => void
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
