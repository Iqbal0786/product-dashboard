"use client";

import Link from "next/link";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 p-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Failed to Load Product
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message || "An error occurred while loading the product details. Please try again."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
          
          <Link
            href="/products"
            className="flex-1 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:text-white border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
