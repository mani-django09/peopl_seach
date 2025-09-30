// components/ErrorMessage.js
export default function ErrorMessage({ title, message, onRetry }) {
  return (
    <div className="text-center py-8">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.876c1.38 0 2.5-1.12 2.5-2.5 0-.54-.216-1.06-.6-1.44L13.44 4.6c-.384-.32-.864-.48-1.36-.48-.496 0-.976.16-1.36.48L3.28 15.06c-.384.38-.6.9-.6 1.44 0 1.38 1.12 2.5 2.5 2.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {title || 'Something went wrong'}
      </h2>
      <p className="text-gray-600 mb-4">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}