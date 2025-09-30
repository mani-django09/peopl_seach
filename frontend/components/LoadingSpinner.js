// components/LoadingSpinner.js
export default function LoadingSpinner({ size = 'md', color = 'blue' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white'
  }

  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${colorClasses[color]}`}></div>
  )
}