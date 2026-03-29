import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { mockAuthService } from './mockAuth'
import { mockFirestoreService } from './mockFirestore'
import { mockStorageService } from './mockStorage'

// Firebase configuration - replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Check if using placeholder config
const isPlaceholder = firebaseConfig.apiKey === "YOUR_API_KEY"

// Initialize Firebase only if not using placeholder
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null
let isUsingMock = false

if (!isPlaceholder) {
  // Use real Firebase
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} else {
  // Use mock services for local development
  isUsingMock = true
  
  // Wrap mock services to provide Firebase-compatible API
  auth = {
    currentUser: mockAuthService.getCurrentUser(),
    _isMock: true,
    _mockService: mockAuthService
  }
  
  db = {
    _isMock: true,
    _mockService: mockFirestoreService
  }
  
  storage = {
    _isMock: true,
    _mockService: mockStorageService
  }
  
  console.log(
    '%c🔧 Using Mock Firebase (Local Development)',
    'color: #ff9800; font-weight: bold; font-size: 12px;',
    'All data is stored locally. Add Firebase credentials to switch to real backend.'
  )
}

// Export services
export { auth, db, storage, app }
export const isUsingMockFirebase = isUsingMock
export { mockAuthService, mockFirestoreService, mockStorageService }
