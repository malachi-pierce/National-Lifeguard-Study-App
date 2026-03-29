import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, BarChart3, Settings } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/review', label: 'Review', icon: BookOpen },
  { path: '/stats', label: 'Stats', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 h-16 flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        const Icon = item.icon
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive 
                ? 'text-primary-500' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
