interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function LoadingSpinner({ size = 'medium', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="w-full h-full"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
          className="text-gray-200 dark:text-gray-700"
        />
        <path 
          d="M12 2C6.48 2 2 6.48 2 12" 
          stroke="currentColor" 
          strokeWidth="4" 
          className="text-primary-500"
        />
      </svg>
    </div>
  )
}
