import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth } from '../services/firebase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    
    // Check if using mock Firebase
    if (auth._isMock && auth._mockService) {
      // Use mock auth service
      const unsubscribe = auth._mockService.onAuthStateChanged((user: any) => {
        setUser(user)
        setLoading(false)
      })
      return unsubscribe
    } else {
      // Use real Firebase auth
      const { onAuthStateChanged } = require('firebase/auth')
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setUser(user)
        setLoading(false)
      })
      return unsubscribe
    }
  }, [])

  return { user, loading }
}
