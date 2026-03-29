import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, X } from 'lucide-react'
import { Question, QuizAttempt } from '../types'
import { ConfidenceSlider } from '../components/ConfidenceSlider'
import { LoadingSpinner } from '../components/LoadingSpinner'

// Sample questions
const sampleQuestions: Question[] = [
  {
    id: 'q1',
    topicId: 'cpr-fundamentals',
    type: 'multipleChoice',
    text: 'During CPR on an adult, what is the correct hand placement for chest compressions?',
    options: [
      { id: 'a', text: 'Heel of one hand on upper chest, near the collarbone', isCorrect: false },
      { id: 'b', text: 'Heel of one hand on lower half of sternum (2 finger-widths above xiphoid process)', isCorrect: true },
      { id: 'c', text: 'Two hands interlocked on the abdomen', isCorrect: false },
      { id: 'd', text: 'Interlocked hands on upper ribs', isCorrect: false },
      { id: 'e', text: 'All of the above', isCorrect: false },
    ],
    explanation: 'The lower half of the sternum is the optimal compression point. Compressions here maximize blood flow to the brain and heart while minimizing risk of rib fractures. The sternum is located between the nipples. Never compress the abdomen (risk of internal injuries) or upper ribs (less effective and causes injury).',
    pageReferences: ['Alert Manual p. 45', 'AMOA Guide Section 3.1'],
  },
  {
    id: 'q2',
    topicId: 'cpr-fundamentals',
    type: 'multipleChoice',
    text: 'What is the recommended compression rate for adult CPR?',
    options: [
      { id: 'a', text: '60-80 compressions per minute', isCorrect: false },
      { id: 'b', text: '80-100 compressions per minute', isCorrect: false },
      { id: 'c', text: '100-120 compressions per minute', isCorrect: true },
      { id: 'd', text: '120-140 compressions per minute', isCorrect: false },
      { id: 'e', text: 'As fast as possible', isCorrect: false },
    ],
    explanation: 'The American Heart Association recommends a compression rate of 100-120 per minute for adult CPR. Going faster than 120 can reduce the quality of compressions and decrease blood flow. Going slower than 100 may not provide adequate circulation.',
    pageReferences: ['AMOA Guide p. 24'],
  },
  {
    id: 'q3',
    topicId: 'cpr-fundamentals',
    type: 'multipleChoice',
    text: 'What is the recommended compression depth for an adult victim?',
    options: [
      { id: 'a', text: 'At least 1 inch (2.5 cm)', isCorrect: false },
      { id: 'b', text: 'At least 2 inches (5 cm) but not more than 2.4 inches (6 cm)', isCorrect: true },
      { id: 'c', text: 'At least 3 inches (7.5 cm)', isCorrect: false },
      { id: 'd', text: 'Until you feel resistance', isCorrect: false },
      { id: 'e', text: 'Just enough to move the chest', isCorrect: false },
    ],
    explanation: 'For adults, compress the chest at least 2 inches (5 cm) but not more than 2.4 inches (6 cm). This depth ensures adequate blood flow without causing excessive trauma. Use the heel of your hand and straight arms to achieve proper depth.',
    pageReferences: ['AMOA Guide p. 25'],
  },
]

export function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(5)
  const [answers, setAnswers] = useState<{
    questionId: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
    confidence: number
    timeSpentSeconds: number
  }[]>([])
  const [questionStartTime] = useState(Date.now())
  const [quizStartTime] = useState(Date.now())
  const [loading, setLoading] = useState(false)

  const questions = sampleQuestions
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswer = useCallback((optionId: string) => {
    setSelectedAnswer(optionId)
  }, [])

  const handleContinue = useCallback(() => {
    if (!selectedAnswer || !currentQuestion) return

    const timeSpentSeconds = Math.round((Date.now() - questionStartTime) / 1000)
    const correctOption = currentQuestion.options?.find(o => o.isCorrect)
    const isCorrect = selectedAnswer === correctOption?.id

    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      correctAnswer: correctOption?.id || '',
      isCorrect,
      confidence,
      timeSpentSeconds,
    }

    setAnswers(prev => [...prev, newAnswer])

    if (isLastQuestion) {
      // Submit quiz
      setLoading(true)
      
      const totalCorrect = [...answers, newAnswer].filter(a => a.isCorrect).length
      const totalTimeSeconds = Math.round((Date.now() - quizStartTime) / 1000)
      const averageConfidence = [...answers, newAnswer].reduce((sum, a) => sum + a.confidence, 0) / (answers.length + 1)
      
      const attempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        topicId: topicId || '',
        dateAttempted: new Date(),
        score: totalCorrect,
        totalQuestions: questions.length,
        passed: (totalCorrect / questions.length) >= 0.8,
        answers: [...answers, newAnswer],
        totalTimeSeconds,
        averageConfidence,
        deviceType: 'Mac',
      }

      // Navigate to results
      navigate(`/results/${attempt.id}`, { state: { attempt, questions } })
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setConfidence(5)
    }
  }, [selectedAnswer, currentQuestion, confidence, answers, isLastQuestion, questionStartTime, quizStartTime, questions.length, topicId, navigate])

  const handleQuit = useCallback(() => {
    if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
      navigate('/')
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">
        No questions available
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleQuit}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quit Quiz
        </button>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleQuit}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {currentQuestion.text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedAnswer === option.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => handleAnswer(option.id)}
                className="w-5 h-5 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {option.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Confidence Slider */}
      <ConfidenceSlider value={confidence} onChange={setConfidence} />

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedAnswer}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
      >
        {isLastQuestion ? 'Submit Quiz' : 'Continue'}
      </button>
    </div>
  )
}
