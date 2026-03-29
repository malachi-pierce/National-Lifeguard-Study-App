import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { StatsPage } from './pages/StatsPage'
import { SettingsPage } from './pages/SettingsPage'
import { ReviewPage } from './pages/ReviewPage'
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { LoadingSpinner } from './components/LoadingSpinner'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header />
      <main className="pb-20 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn/:topicId" element={<LearnPage />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/results/:attemptId" element={<ResultsPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default App
