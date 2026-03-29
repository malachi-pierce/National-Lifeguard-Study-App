import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Clock, TrendingUp, Search, BookOpen } from 'lucide-react'
import { TopicCard } from '../components/TopicCard'
import { ProgressCard } from '../components/ProgressCard'
import { Topic, TopicStatus } from '../types'

// Sample topics data for Phase 1 (will be replaced with Firestore data in Phase 2)
const sampleTopics: Topic[] = [
  {
    id: 'cpr-fundamentals',
    name: 'CPR Fundamentals',
    source: 'amoaGuide',
    description: 'Learn the basics of cardiopulmonary resuscitation',
    learningObjectives: ['Understand CPR purpose', 'Learn compression technique', 'Practice rescue breathing'],
    status: 'mastered',
    createdAt: new Date(),
    masteredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastReviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    totalAttempts: 3,
    totalCorrect: 27,
    accuracy: 90,
  },
  {
    id: 'drowning-recognition',
    name: 'Drowning Recognition',
    source: 'alertManual',
    description: 'Identify signs of active vs passive drowning',
    learningObjectives: ['Recognize active drowning', 'Identify passive drowning', 'Know when to intervene'],
    status: 'learning',
    createdAt: new Date(),
    totalAttempts: 1,
    totalCorrect: 6,
    accuracy: 60,
  },
  {
    id: 'chest-compressions',
    name: 'Chest Compressions',
    source: 'amoaGuide',
    description: 'Proper hand placement and compression technique',
    learningObjectives: ['Hand placement', 'Compression depth', 'Rate of 100-120 bpm'],
    status: 'not_started',
    createdAt: new Date(),
    totalAttempts: 0,
    totalCorrect: 0,
    accuracy: 0,
  },
  {
    id: 'rescue-breathing',
    name: 'Rescue Breathing',
    source: 'amoaGuide',
    description: 'Mouth-to-mouth and barrier device techniques',
    learningObjectives: ['Airway opening', 'Seal technique', 'Volume delivery'],
    status: 'not_started',
    createdAt: new Date(),
    totalAttempts: 0,
    totalCorrect: 0,
    accuracy: 0,
  },
  {
    id: 'aed-operation',
    name: 'AED Operation',
    source: 'amoaGuide',
    description: 'Automated External Defibrillator use',
    learningObjectives: ['Pad placement', 'Safety protocols', 'Coordination with CPR'],
    status: 'not_started',
    createdAt: new Date(),
    totalAttempts: 0,
    totalCorrect: 0,
    accuracy: 0,
  },
]

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['amoaGuide'])

  const topics = sampleTopics

  const stats = useMemo(() => {
    const mastered = topics.filter(t => t.status === 'mastered').length
    const inProgress = topics.filter(t => t.status === 'learning').length
    const notStarted = topics.filter(t => t.status === 'not_started').length
    const total = topics.length
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0
    
    return { mastered, inProgress, notStarted, total, percentage }
  }, [topics])

  const todaysReview = topics.find(t => 
    t.status === 'mastered' && 
    t.nextReviewAt && 
    t.nextReviewAt <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  )

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topics
    const query = searchQuery.toLowerCase()
    return topics.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    )
  }, [topics, searchQuery])

  const groupedTopics = useMemo(() => {
    const groups: Record<string, Topic[]> = {
      alertManual: [],
      amoaGuide: [],
      amoaFastTrack: [],
      nationalCourse: [],
    }
    
    filteredTopics.forEach(topic => {
      groups[topic.source].push(topic)
    })
    
    return groups
  }, [filteredTopics])

  const toggleSection = (source: string) => {
    setExpandedSections(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  const sourceLabels: Record<string, string> = {
    alertManual: 'Alert Manual',
    amoaGuide: 'AMOA Guide',
    amoaFastTrack: 'AMOA Fast Track',
    nationalCourse: 'National Course',
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Progress Summary */}
      <ProgressCard 
        mastered={stats.mastered}
        total={stats.total}
        percentage={stats.percentage}
        streak={7}
        hoursStudied="4h 32m"
      />

      {/* Today's Review */}
      {todaysReview && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Today&apos;s Review</h2>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{todaysReview.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Next review: {todaysReview.nextReviewAt?.toLocaleDateString()}
              </p>
            </div>
            <Link
              to={`/quiz/${todaysReview.id}`}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Topic Sections */}
      <div className="space-y-4">
        {Object.entries(groupedTopics).map(([source, sourceTopics]) => {
          if (sourceTopics.length === 0) return null
          
          const isExpanded = expandedSections.includes(source)
          const displayCount = isExpanded ? sourceTopics.length : Math.min(3, sourceTopics.length)
          
          return (
            <div key={source} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{sourceLabels[source]}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sourceTopics.length} topics</p>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {sourceTopics.slice(0, displayCount).map(topic => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
              
              {sourceTopics.length > 3 && (
                <button
                  onClick={() => toggleSection(source)}
                  className="w-full py-3 text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
                >
                  {isExpanded ? 'Show Less' : `Show ${sourceTopics.length - 3} More`}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Start FAB */}
      <Link
        to="/learn/chest-compressions"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <BookOpen className="w-6 h-6" />
      </Link>
    </div>
  )
}
