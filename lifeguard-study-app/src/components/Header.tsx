import { Link } from 'react-router-dom'
import { Menu, Bell, User, LifeBuoy } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'

export function Header() {
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <LifeBuoy className="w-8 h-8 text-primary-500" />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
          Lifeguard Study
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="relative group">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.email}
              </p>
            </div>
            <nav className="p-2">
              <Link 
                to="/settings" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
              >
                <User className="w-4 h-4" />
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
