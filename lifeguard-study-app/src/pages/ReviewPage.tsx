import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Filter, ChevronDown } from 'lucide-react'

// Sample past attempts
const sampleAttempts = [
  {
    id: '1',
    topicName: 'CPR Fundamentals',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    score: 8,
    total: 10,
    passed: true,
    avgConfidence: 7.2,
  },
  {
    id: '2',
    topicName: 'Drowning Recognition',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    score: 6,
    total: 10,
    passed: false,
    avgConfidence: 5.8,
  },
  {
    id: '3',
    topicName: 'CPR Fundamentals',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    score: 9,
    total: 10,
    passed: true,
    avgConfidence: 8.1,
  },
]

export function ReviewPage() {
  const [filterTopic, setFilterTopic] = useState('all')
  const [filterResult, setFilterResult] = useState('all')

  const filteredAttempts = sampleAttempts.filter(attempt => {
    if (filterTopic !== 'all' && attempt.topicName !== filterTopic) return false
    if (filterResult === 'passed' && !attempt.passed) return false
    if (filterResult === 'failed' && attempt.passed) return false
    return true
  })

  const topics = [...new Set(sampleAttempts.map(a => a.topicName))]

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Past Attempts
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Topic
            </label>
            <div className="relative">
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="w-full appearance-none px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Result
            </label>
            <div className="relative">
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
                className="w-full appearance-none px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Results</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        {filteredAttempts.map((attempt) => (
          <div
            key={attempt.id}
            className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {attempt.topicName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {attempt.date.toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                attempt.passed
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {attempt.passed ? '✓ Passed' : '✗ Failed'}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {attempt.score}/{attempt.total}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((attempt.score / attempt.total) * 100)}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Percentage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {attempt.avgConfidence.toFixed(1)}/10
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg Confidence</p>
              </div>
            </div>

            <button className="mt-4 text-primary-500 hover:text-primary-600 font-medium text-sm">
              View Details →
            </button>
          </div>
        ))}

        {filteredAttempts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No attempts match your filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
