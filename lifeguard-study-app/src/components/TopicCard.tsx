import { Topic } from '../types'
import { CheckCircle, Circle, Clock, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TopicCardProps {
  topic: Topic
}

export function TopicCard({ topic }: TopicCardProps) {
  const statusConfig = {
    not_started: {
      icon: Circle,
      label: 'Not Started',
      color: 'text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
    },
    learning: {
      icon: Clock,
      label: 'Learning',
      color: 'text-warning-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    mastered: {
      icon: CheckCircle,
      label: 'Mastered',
      color: 'text-success-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    maintenance: {
      icon: CheckCircle,
      label: 'Maintenance',
      color: 'text-primary-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
  }

  const config = statusConfig[topic.status]
  const StatusIcon = config.icon

  const actionButton = () => {
    if (topic.status === 'not_started' || topic.status === 'learning') {
      return (
        <Link
          to={`/learn/${topic.id}`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Learn
        </Link>
      )
    }
    
    return (
      <Link
        to={`/quiz/${topic.id}`}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
      >
        Quiz
      </Link>
    )
  }

  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}>
          <StatusIcon className={`w-5 h-5 ${config.color}`} />
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{topic.name}</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className={`${config.color}`}>{config.label}</span>
            {topic.lastReviewedAt && (
              <span className="text-gray-500 dark:text-gray-400">
                • Last reviewed: {topic.lastReviewedAt.toLocaleDateString()}
              </span>
            )}
            {topic.nextReviewAt && topic.status === 'mastered' && (
              <span className="text-gray-500 dark:text-gray-400">
                • Next: {topic.nextReviewAt.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {actionButton()}
    </div>
  )
}
