interface ConfidenceSliderProps {
  value: number
  onChange: (value: number) => void
}

export function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  const getLabel = (val: number) => {
    if (val <= 3) return '😐 Uncertain'
    if (val <= 6) return '😐 Moderate'
    return '😊 Confident'
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          How confident are you?
        </h3>
        <span className="text-sm font-medium text-primary-500">
          {getLabel(value)}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  )
}
