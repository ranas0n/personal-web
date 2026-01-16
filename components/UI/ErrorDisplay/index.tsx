import { FC } from 'react';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  title = 'Something went wrong',
  message = 'Unable to load content',
  showRetry = false,
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col justify-center items-center min-h-[60vh] px-4 ${className}`}>
      <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm p-8 rounded-2xl border border-red-700/50 text-center max-w-md shadow-2xl">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-300 text-xl font-semibold mb-2">{title}</p>
        <p className="text-red-400/80 text-sm mb-6">{message}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;