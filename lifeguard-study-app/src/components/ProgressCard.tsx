import { TrendingUp, Flame, Clock } from 'lucide-react'

interface ProgressCardProps {
  mastered: number
  total: number
  percentage: number
  streak: number
  hoursStudied: string
}

export function ProgressCard({ mastered, total, percentage, streak, hoursStudied }: ProgressCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-primary-500" />
        <h2 className="font-semibold text-gray-900 dark:text-white">This Week&apos;s Progress</h2>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            Mastered: <span className="font-medium text-gray-900 dark:text-white">{mastered}/{total} topics</span>
          </span>
          <span className="font-medium text-primary-500">{percentage}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{hoursStudied}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hours Studied</p>
          </div>
        </div>
      </div>
    </div>
  )
}
