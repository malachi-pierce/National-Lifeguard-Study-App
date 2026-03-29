import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trophy, Target, Clock, TrendingUp, Calendar } from 'lucide-react'

// Sample stats data
const sampleStats = {
  mastered: 12,
  inProgress: 23,
  notStarted: 65,
  total: 100,
  currentStreak: 7,
  longestStreak: 14,
  totalDaysStudied: 28,
  averageDailyTime: 18,
  hoursAllTime: 8.7,
  hoursThisWeek: 2.3,
  hoursThisMonth: 5.5,
}

const topicAccuracy = [
  { name: 'CPR Fundamentals', accuracy: 87, attempts: 10 },
  { name: 'Chest Compressions', accuracy: 91, attempts: 8 },
  { name: 'Rescue Breathing', accuracy: 62, attempts: 5 },
  { name: 'Drowning Recognition', accuracy: 75, attempts: 4 },
]

const milestones = [
  { name: 'First topic mastered!', achieved: true, date: '2 weeks ago' },
  { name: '7-day streak!', achieved: true, date: 'Today' },
  { name: '25 topics mastered', achieved: false },
  { name: '5-hour total study time', achieved: false },
]

export function StatsPage() {
  const percentage = useMemo(() => 
    Math.round((sampleStats.mastered / sampleStats.total) * 100),
    []
  )

  const focusAreas = useMemo(() => 
    topicAccuracy.filter(t => t.accuracy < 70),
    []
  )

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
          Statistics & Progress
        </h1>
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Overall Progress</h2>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Topics mastered: {sampleStats.mastered}/{sampleStats.total}
            </span>
            <span className="font-medium text-primary-500">{percentage}%</span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{sampleStats.mastered}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Mastered</p>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{sampleStats.inProgress}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xl font-bold text-gray-600 dark:text-gray-400">{sampleStats.notStarted}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Not Started</p>
          </div>
        </div>
      </div>

      {/* Streaks & Habits */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Streaks & Habits</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sampleStats.currentStreak}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak (days)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sampleStats.longestStreak}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Investment */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Time Investment</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{sampleStats.hoursAllTime}h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">All Time</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{sampleStats.hoursThisWeek}h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{sampleStats.hoursThisMonth}h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Average daily time:</span> {sampleStats.averageDailyTime} minutes
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Total days studied:</span> {sampleStats.totalDaysStudied}
          </p>
        </div>
      </div>

      {/* Accuracy by Topic */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Accuracy by Topic</h2>

        <div className="space-y-3">
          {topicAccuracy.map((topic) => (
            <div key={topic.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                <span className={`font-medium ${
                  topic.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                  topic.accuracy >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {topic.accuracy}% ({topic.attempts} attempts)
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    topic.accuracy >= 80 ? 'bg-green-500' :
                    topic.accuracy >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      {focusAreas.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-red-700 dark:text-red-400 mb-4">⚠️ Focus Areas (Accuracy &lt; 70%)</h2>
          <div className="space-y-2">
            {focusAreas.map((topic) => (
              <p key={topic.name} className="text-red-600 dark:text-red-400">
                {topic.name}: {topic.accuracy}%
              </p>
            ))}
          </div>
          <p className="mt-3 text-sm text-red-600/80 dark:text-red-400/80">
            Recommend: intensive review of these topics
          </p>
        </div>
      )}

      {/* Milestones */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">🏆 Milestones</h2>

        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div 
              key={milestone.name}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                milestone.achieved 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : 'bg-gray-50 dark:bg-gray-800 opacity-60'
              }`}
            >
              <span className={`text-lg ${milestone.achieved ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                {milestone.achieved ? '✓' : '•'}
              </span>
              <div className="flex-1">
                <p className={`font-medium ${
                  milestone.achieved 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {milestone.name}
                </p>
                {milestone.achieved && milestone.date && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Achieved: {milestone.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors">
        Export as PDF Report
      </button>
    </div>
  )
}
