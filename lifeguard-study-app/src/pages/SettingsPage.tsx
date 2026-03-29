import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, Monitor, Type, Download } from 'lucide-react'
import { useAppStore } from '../stores/appStore'

export function SettingsPage() {
  const { theme, setTheme, textSize, setTextSize } = useAppStore()
  const [notificationTime, setNotificationTime] = useState('09:00')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Notifications
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Enable notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily reminders to study</p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                notificationsEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily reminder time
            </label>
            <input
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Interface */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Interface
        </h2>

        <div className="space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    theme === t
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {t === 'light' && <Sun className="w-6 h-6 text-yellow-500" />}
                  {t === 'dark' && <Moon className="w-6 h-6 text-purple-500" />}
                  {t === 'system' && <Monitor className="w-6 h-6 text-gray-500" />}
                  <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Type className="w-4 h-4" />
              Text Size
            </label>
            <div className="flex gap-3">
              {([100, 125, 150] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    textSize === size
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {size}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Account & Data
        </h2>

        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">Download my data as JSON</span>
          </button>
        </div>
      </div>

      {/* Version */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>App version: 1.0.0</p>
        <p>Last updated: March 29, 2026</p>
      </div>
    </div>
  )
}
