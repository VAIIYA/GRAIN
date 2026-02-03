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
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#EADDD2]">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF6A3D] font-semibold mb-3">System note</p>
          <h2 className="text-2xl font-serif text-[#213453] mb-3">Something went wrong.</h2>
          <p className="text-muted mb-4 text-sm">
            {error.message || 'An unexpected error occurred.'}
          </p>
          {error.digest && (
            <p className="text-xs text-muted mb-4">
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            className="w-full btn-premium py-3 text-sm font-semibold"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
