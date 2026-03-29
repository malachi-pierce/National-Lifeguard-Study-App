# Mock Firebase Setup - Local Development Guide

## Overview

This app now includes a **complete mock Firebase system** that runs entirely locally without requiring any Firebase configuration or internet connection. This is perfect for learning and development!

## How It Works

### Automatic Dependency Injection

The app uses **dependency injection** to automatically choose between:
- **Real Firebase** - when you add your Firebase credentials
- **Mock Firebase** - when credentials are missing (default)

This is handled in `src/services/firebase.ts`. The system checks if the API key is the placeholder value. If it is, it uses mock services instead.

### What Gets Stored

All data is persisted in your **browser's localStorage**:

```
Mock Auth Users      → localStorage['mock_auth_users']
Current User         → localStorage['mock_current_user']
Firestore Collections → localStorage['mock_db_<collection_name>']
Storage Files        → localStorage['mock_storage_files']
```

## Quick Start

Just run the app normally:

```bash
cd lifeguard-study-app
npm install
npm run dev
```

You'll see a console message like:
```
🔧 Using Mock Firebase (Local Development)
All data is stored locally. Add Firebase credentials to switch to real backend.
```

## Features

### ✅ Mock Authentication
- **Sign Up**: Create accounts with email/password
- **Sign In**: Log in with any account you created
- **Sign Out**: Logout works normally
- **Profile Updates**: Display names are supported
- Passwords are stored (only for local testing!)
- Persistent sessions across browser refreshes

### ✅ Mock Firestore
- Add documents to collections
- Query documents
- Update/delete documents
- All data persists in localStorage

### ✅ Mock Storage
- Upload files (stored as base64 in localStorage)
- Download files
- Delete files

## Example Usage

### Testing Sign Up / Login

1. Click "Sign up"
2. Use any email like `test@example.com`
3. Create a password
4. You'll be logged in automatically
5. Refresh the page - you'll still be logged in (session persists)

### Testing with Multiple Accounts

```javascript
// In browser console
localStorage.getItem('mock_auth_users') // See all accounts
localStorage.getItem('mock_current_user') // See current user
```

### Clearing Data

```javascript
// In browser console - clear everything
localStorage.clear()

// Or selectively:
localStorage.removeItem('mock_auth_users')
localStorage.removeItem('mock_current_user')
```

## Switching to Real Firebase

When you want to add real Firebase credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Get your web app config
4. Replace the placeholder values in `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                    // Replace these
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

5. That's it! The app will automatically detect the real config and use Firebase instead of mocks.

No other code changes needed - the dependency injection handles everything!

## Files Modified/Added

### New Files
- `src/services/mockAuth.ts` - Mock authentication service
- `src/services/mockFirestore.ts` - Mock database service
- `src/services/mockStorage.ts` - Mock file storage service

### Updated Files
- `src/services/firebase.ts` - Dependency injection logic
- `src/hooks/useAuth.ts` - Works with both real and mock auth
- `src/pages/LoginPage.tsx` - Works with both real and mock auth
- `src/pages/SignupPage.tsx` - Works with both real and mock auth

## For You

This setup is great for learning because:

1. **No Setup Required** - Just `npm run dev` and go
2. **Works Offline** - Study anywhere without WiFi
3. **Real Data Persistence** - See how data actually persists
4. **Easy to Debug** - Can inspect localStorage directly
5. **Future Proof** - Can switch to real Firebase anytime without changing code

## Troubleshooting

### "Still seeing blank page"

Make sure you see the orange console message. If not:
1. Run `npm run dev` again
2. Do a hard refresh (Cmd+Shift+R on Mac)
3. Check browser console for errors

### "Data disappeared after refresh"

localStorage only persists if the browser tab isn't cleared. Try:
1. Hard refresh (don't just refresh)
2. Check browser console for errors
3. Verify localStorage still has data: `Object.keys(localStorage)` in console

### "Want to test with real Firebase now"

Add your credentials to `firebase.ts` and you're done! No other changes needed.

## Questions?

The mock services are fully compatible with Firebase's API, so any Firebase documentation will help you understand how the app works!
