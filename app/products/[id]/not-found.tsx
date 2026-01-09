import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 p-8 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-6">
          <svg
            className="h-10 w-10 text-indigo-600 dark:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Product Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn't find the product you're looking for. It may have been removed or the link might be incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
          >
            Browse Products
          </Link>
          
          <Link
            href="/"
            className="flex-1 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:text-white border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
