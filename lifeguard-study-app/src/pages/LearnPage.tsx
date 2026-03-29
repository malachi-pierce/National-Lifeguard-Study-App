import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileText, Flag, StickyNote } from 'lucide-react'

// Sample material data
const sampleMaterials: Record<string, {
  title: string
  content: string
  objectives: string[]
  references: { title: string; page: number }[]
}> = {
  'cpr-fundamentals': {
    title: 'CPR Fundamentals',
    content: `
<h2>Key Concepts</h2>
<p>Cardiopulmonary Resuscitation (CPR) is a life-saving technique used when someone's breathing or heartbeat has stopped. The goal is to maintain blood flow to the brain and heart until emergency medical help arrives.</p>

<h3>When to Use CPR</h3>
<ul>
<li>Victim is unresponsive</li>
<li>No pulse detected</li>
<li>Not breathing or only gasping</li>
</ul>

<h3>Anatomy Basics</h3>
<p>The heart is a muscular pump that circulates blood throughout the body. When the heart stops, blood flow ceases, and the brain begins to suffer damage within 4-6 minutes without oxygen.</p>

<h3>Compression Technique</h3>
<p>Place the heel of one hand on the lower half of the sternum (breastbone), about two finger-widths above the xiphoid process. Place your other hand on top, interlacing your fingers. Keep your elbows straight and position your shoulders directly over your hands.</p>

<h3>Key Points</h3>
<ul>
<li>Compression depth: 2-2.4 inches (5-6 cm)</li>
<li>Rate: 100-120 compressions per minute</li>
<li>Allow full chest recoil between compressions</li>
<li>Minimize interruptions to less than 10 seconds</li>
</ul>
    `,
    objectives: [
      'Understand when CPR is needed',
      'Learn proper hand placement',
      'Master compression rate and depth',
      'Know how to coordinate with rescue breathing'
    ],
    references: [
      { title: 'Alert Manual', page: 45 },
      { title: 'AMOA Guide', page: 23 },
    ]
  },
  'drowning-recognition': {
    title: 'Drowning Recognition',
    content: `
<h2>Active vs. Passive Drowning</h2>
<p>Understanding the difference between active and passive drowning is critical for lifeguards to respond appropriately.</p>

<h3>Active Drowning</h3>
<ul>
<li>Victim is struggling at the surface</li>
<li>Arms may be flailing or pressing down</li>
<li>Head tilted back, mouth open</li>
<li>Vertical position in water</li>
<li>Usually lasts 20-60 seconds</li>
</ul>

<h3>Passive Drowning</h3>
<ul>
<li>Victim is face-down or submerged</li>
<li>No visible movement</li>
<li>Silent - no calls for help</li>
<li>May appear to be floating</li>
<li>Immediate intervention required</li>
</ul>

<h3>Common Myths</h3>
<p>Contrary to popular belief, drowning victims rarely wave their arms or call for help. They are often silent and may appear to be treading water or playing.</p>
    `,
    objectives: [
      'Recognize signs of active drowning',
      'Identify passive drowning victims',
      'Understand the timeline of drowning',
      'Know common misconceptions'
    ],
    references: [
      { title: 'Alert Manual', page: 12 },
      { title: 'National Course', page: 34 },
    ]
  },
}

export function LearnPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const [showNotes, setShowNotes] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [showFlagModal, setShowFlagModal] = useState(false)
  const [flagReason, setFlagReason] = useState('')

  const material = sampleMaterials[topicId || ''] || sampleMaterials['cpr-fundamentals']

  const handleAddNote = () => {
    if (noteText.trim()) {
      // In Phase 2, this would save to Firestore
      setNoteText('')
      setShowNotes(false)
    }
  }

  const handleFlagContent = () => {
    if (flagReason.trim()) {
      // In Phase 2, this would submit to Firestore
      setFlagReason('')
      setShowFlagModal(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            aria-label="Add note"
          >
            <StickyNote className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowFlagModal(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            aria-label="Flag content"
          >
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {material.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {material.objectives.map((obj, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
            >
              {obj}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Material */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div 
              className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: material.content }}
            />
          </div>

          {/* References */}
          <div className="mt-6 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-4">
              <FileText className="w-5 h-5 text-primary-500" />
              Reference Materials
            </h3>
            <ul className="space-y-2">
              {material.references.map((ref, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  See {ref.title} p. {ref.page}
                </li>
              ))}
            </ul>
          </div>

          {/* Ready to Quiz */}
          <div className="mt-6 flex justify-center">
            <Link
              to={`/quiz/${topicId}`}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              Ready to Quiz?
            </Link>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Notes Panel */}
          {showNotes && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">My Notes</h3>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full p-3 rounded-lg border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-dark-bg text-gray-900 dark:text-white resize-none h-32 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowNotes(false)}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* Study Tips */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Study Tip</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take your time with the material. When you&apos;re ready, the quiz will test your understanding with detailed explanations for each answer.
            </p>
          </div>
        </div>
      </div>

      {/* Flag Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Flag Incorrect Content
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Found something wrong? Let us know and we&apos;ll review it.
            </p>
            <textarea
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-900 dark:text-white resize-none h-24 focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowFlagModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleFlagContent}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
