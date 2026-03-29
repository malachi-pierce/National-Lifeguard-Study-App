import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark' | 'system'
  textSize: 100 | 125 | 150
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setTextSize: (size: 100 | 125 | 150) => void
  applySystemTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      textSize: 100,
      
      setTheme: (theme) => {
        set({ theme })
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark')
        } else {
          get().applySystemTheme()
        }
      },
      
      setTextSize: (textSize) => set({ textSize }),
      
      applySystemTheme: () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }),
    {
      name: 'app-storage'
    }
  )
)

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('app-storage')
  if (stored) {
    const { state } = JSON.parse(stored)
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (state.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) document.documentElement.classList.add('dark')
    }
  }
}
