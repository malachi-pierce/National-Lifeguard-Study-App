/**
 * Mock Firebase Authentication Service
 * Simulates Firebase Auth using localStorage for local development
 */

export interface MockUser {
  uid: string
  email: string
  displayName: string | null
  metadata: {
    createdAt: number
  }
}

interface MockAuthUser {
  email: string
  password: string
  uid: string
  displayName: string | null
  metadata: {
    createdAt: number
  }
}

class MockAuthService {
  private users: Map<string, MockAuthUser> = new Map()
  private currentUser: MockUser | null = null
  private authStateCallbacks: Array<(user: MockUser | null) => void> = []

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mock_auth_users')
    if (stored) {
      try {
        const users = JSON.parse(stored)
        this.users = new Map(Object.entries(users))
      } catch (e) {
        console.error('Failed to load mock users from storage:', e)
      }
    }

    const currentUserJson = localStorage.getItem('mock_current_user')
    if (currentUserJson) {
      try {
        this.currentUser = JSON.parse(currentUserJson)
      } catch (e) {
        console.error('Failed to load current user from storage:', e)
      }
    }
  }

  private saveToStorage() {
    const usersObject = Object.fromEntries(this.users)
    localStorage.setItem('mock_auth_users', JSON.stringify(usersObject))
    if (this.currentUser) {
      localStorage.setItem('mock_current_user', JSON.stringify(this.currentUser))
    } else {
      localStorage.removeItem('mock_current_user')
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    if (this.users.has(email)) {
      throw new Error('Firebase: Error (auth/email-already-in-use).')
    }

    const uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const user: MockAuthUser = {
      email,
      password,
      uid,
      displayName: null,
      metadata: {
        createdAt: Date.now()
      }
    }

    this.users.set(email, user)
    this.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      metadata: user.metadata
    }
    this.saveToStorage()
    this.notifyAuthStateChanged()

    return {
      user: this.currentUser,
      credential: null
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const user = this.users.get(email)

    if (!user) {
      throw new Error('Firebase: Error (auth/user-not-found).')
    }

    if (user.password !== password) {
      throw new Error('Firebase: Error (auth/wrong-password).')
    }

    this.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      metadata: user.metadata
    }
    this.saveToStorage()
    this.notifyAuthStateChanged()

    return {
      user: this.currentUser,
      credential: null
    }
  }

  async updateProfile(user: MockUser, updates: { displayName?: string; photoURL?: string }) {
    if (!this.currentUser) {
      throw new Error('No user signed in')
    }

    if (updates.displayName !== undefined) {
      this.currentUser.displayName = updates.displayName
      const storedUser = this.users.get(this.currentUser.email)
      if (storedUser) {
        storedUser.displayName = updates.displayName
      }
    }

    this.saveToStorage()
    this.notifyAuthStateChanged()
  }

  async signOut() {
    this.currentUser = null
    this.saveToStorage()
    this.notifyAuthStateChanged()
  }

  getCurrentUser(): MockUser | null {
    return this.currentUser
  }

  onAuthStateChanged(callback: (user: MockUser | null) => void) {
    // Call immediately with current state
    callback(this.currentUser)

    // Register for future changes
    this.authStateCallbacks.push(callback)

    // Return unsubscribe function
    return () => {
      this.authStateCallbacks = this.authStateCallbacks.filter(cb => cb !== callback)
    }
  }

  private notifyAuthStateChanged() {
    this.authStateCallbacks.forEach(callback => {
      callback(this.currentUser)
    })
  }
}

export const mockAuthService = new MockAuthService()

