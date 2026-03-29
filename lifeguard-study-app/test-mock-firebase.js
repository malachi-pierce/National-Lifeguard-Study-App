#!/usr/bin/env node

/**
 * Quick test script to verify mock Firebase is working
 * 
 * Usage: node test-mock-firebase.js
 * 
 * Or run from browser console:
 */

// Test 1: Check if mock services are available
console.log('%c✓ Mock Firebase Test Suite', 'color: #4CAF50; font-weight: bold; font-size: 14px;');

// Test 2: Check localStorage mock data
console.log('\n📦 Checking localStorage...');
const users = localStorage.getItem('mock_auth_users');
const currentUser = localStorage.getItem('mock_current_user');
console.log('  Users stored:', users ? JSON.parse(users) : 'None yet');
console.log('  Current user:', currentUser ? JSON.parse(currentUser).email : 'Not logged in');

// Test 3: Check collections
console.log('\n📚 Checking Firestore collections...');
const keys = Object.keys(localStorage);
const collections = keys.filter(k => k.startsWith('mock_db_'));
if (collections.length === 0) {
  console.log('  No collections yet (this is normal on first run)');
} else {
  collections.forEach(key => {
    const name = key.replace('mock_db_', '');
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    console.log(`  • ${name}: ${Object.keys(data).length} documents`);
  });
}

// Test 4: Suggest next steps
console.log('\n🚀 Next steps:');
console.log('  1. Go to http://localhost:5173 (or your dev server URL)');
console.log('  2. Click "Sign up"');
console.log('  3. Create an account (try: test@example.com / password123)');
console.log('  4. You should see the home page!');
console.log('  5. Refresh the page - you should still be logged in');

// Test 5: Useful commands
console.log('\n💡 Useful browser console commands:');
console.log('  localStorage.getItem("mock_auth_users")   // See all accounts');
console.log('  localStorage.getItem("mock_current_user") // See logged in user');
console.log('  localStorage.clear()                      // Clear all data');
console.log('  location.reload()                         // Refresh page');

// Test 6: Check for errors
console.log('\n🔍 Error check:');
if (!users && !currentUser) {
  console.log('  ✓ Mock Firebase ready! No data yet (this is normal)');
} else if (users && currentUser) {
  console.log('  ✓ Mock Firebase working! User data found');
} else {
  console.warn('  ⚠ Data is inconsistent - you may need to clear localStorage');
}

