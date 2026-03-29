import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { QuizAttempt, Question } from '../types'

export function ResultsPage() {
  const location = useLocation()
  const { attempt, questions } = location.state as { 
    attempt: QuizAttempt 
    questions: Question[] 
  } || {}

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No quiz results found</p>
          <Link to="/" className="text-primary-500 hover:text-primary-600">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100)
  const passed = percentage >= 80

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      {/* Result Banner */}
      <div className={`rounded-2xl p-8 text-center mb-8 ${
        passed 
          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' 
          : 'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800'
      }`}>
        <div className="mb-4">
          {passed ? (
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          ) : (
            <XCircle className="w-16 h-16 mx-auto text-orange-500" />
          )}
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 ${
          passed ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'
        }`}>
          {passed ? '🎉 Passed! 🎉' : 'Not quite yet'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {passed 
            ? 'Congratulations! You\'ve mastered this topic.' 
            : 'That\'s okay—let\'s review and try again.'}
        </p>

        {/* Score Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {attempt.score}/{attempt.totalQuestions}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Percentage</p>
          </div>
          <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(attempt.totalTimeSeconds)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
          </div>
        </div>

        {passed && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-blue-700 dark:text-blue-400 font-medium">
              Next review scheduled: Tomorrow
            </p>
          </div>
        )}
      </div>

      {/* Question Breakdown */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Question Breakdown
          </h2>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {attempt.answers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId)
            const userOption = question?.options?.find(o => o.id === answer.userAnswer)
            const correctOption = question?.options?.find(o => o.id === answer.correctAnswer)

            return (
              <div key={answer.questionId} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    answer.isCorrect 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      Question {index + 1}: {question?.text}
                    </p>

                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className={answer.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {userOption?.text || answer.userAnswer}
                        </span>
                      </p>

                      {!answer.isCorrect && (
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Correct answer:</span>{' '}
                          <span className="text-green-600 dark:text-green-400">
                            {correctOption?.text || answer.correctAnswer}
                          </span>
                        </p>
                      )}

                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Confidence:</span>{' '}
                        {answer.confidence}/10
                      </p>

                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Explanation:</span>{' '}
                          {question?.explanation}
                        </p>
                        {question?.pageReferences && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            References: {question.pageReferences.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          to="/"
          className="flex-1 py-4 px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl text-center transition-colors"
        >
          Return to Dashboard
        </Link>
        
        {!passed && (
          <>
            <Link
              to={`/learn/${attempt.topicId}`}
              className="flex-1 py-4 px-6 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl text-center transition-colors"
            >
              Go Back to Learn
            </Link>
            <Link
              to={`/quiz/${attempt.topicId}`}
              className="flex-1 py-4 px-6 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium rounded-xl text-center transition-colors"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
