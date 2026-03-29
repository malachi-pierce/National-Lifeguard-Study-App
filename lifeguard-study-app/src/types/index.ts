export type TopicStatus = 'not_started' | 'learning' | 'mastered' | 'maintenance'

export type QuestionType = 'multipleChoice' | 'fillBlank' | 'matching' | 'scenario'

export interface Topic {
  id: string
  name: string
  source: 'alertManual' | 'amoaGuide' | 'amoaFastTrack' | 'nationalCourse' | 'additional'
  description: string
  learningObjectives: string[]
  status: TopicStatus
  createdAt: Date
  masteredAt?: Date
  lastReviewedAt?: Date
  nextReviewAt?: Date
  reviewInterval?: number
  totalAttempts: number
  totalCorrect: number
  accuracy: number
}

export interface Material {
  id: string
  topicId: string
  title: string
  content: string
  images: {
    url: string
    caption: string
    altText: string
  }[]
  pdfReferences: {
    title: string
    pageNumber: number
    url?: string
  }[]
  notes: Note[]
}

export interface Note {
  id: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  topicId: string
  type: QuestionType
  text: string
  options?: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  correctAnswers?: string[]
  caseSensitive?: boolean
  matchingPairs?: {
    id: string
    left: string
    right: string
  }[]
  scenarioDescription?: string
  scenarioImage?: string
  scenarioDecisions?: {
    id: string
    text: string
    isCorrect: boolean
    consequence: string
  }[]
  timeLimitSeconds?: number
  explanation: string
  pageReferences?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface QuizAttempt {
  id: string
  topicId: string
  dateAttempted: Date
  score: number
  totalQuestions: number
  passed: boolean
  answers: {
    questionId: string
    userAnswer: string | string[]
    correctAnswer: string | string[]
    isCorrect: boolean
    confidence: number
    timeSpentSeconds: number
  }[]
  totalTimeSeconds: number
  averageConfidence: number
  deviceType: 'iPad' | 'Mac' | 'iPhone'
  syncedAt?: Date
}

export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  createdAt: Date
  lastLogin: Date
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  textSize: 100 | 125 | 150
  notificationTime: string
  snoozeDuration: number
  quietHoursStart: string
  quietHoursEnd: string
  quietHoursEnabled: boolean
}

export interface Notification {
  id: string
  topicId: string
  scheduledTime: string
  lastSentDate?: Date
  snoozedUntil?: Date
  isSnoozed: boolean
  message: string
  enabled: boolean
}
