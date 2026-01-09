export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Product Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our curated collection of amazing products
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 p-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <svg
                    className="h-10 w-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Products Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                We're working on bringing you an amazing product catalog. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
