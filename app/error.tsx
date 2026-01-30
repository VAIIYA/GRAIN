'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'An unexpected error occurred.'}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-400 mb-4">
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="w-full bg-[#f6851b] text-white py-2 px-4 rounded-full font-semibold hover:bg-[#e2761b] transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
