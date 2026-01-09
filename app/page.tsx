import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl animate-pulse dark:bg-purple-600/20"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl animate-pulse delay-1000 dark:bg-indigo-600/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl animate-pulse delay-500 dark:bg-pink-600/10"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 md:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">PE</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Product Explorer
            </span>
          </div>
          <Link
            href="/products"
            className="hidden md:block px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:text-white"
          >
            Browse Products
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center py-12 md:py-20">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Discover Amazing Products
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Explore Products
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Like Never Before
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed animate-slide-up delay-100">
              Discover our comprehensive product dashboard featuring the latest and greatest products. 
              Find detailed information, compare features, and make informed decisions with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-up delay-200">
              <Link
                href="/products"
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Products
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:text-white border border-gray-200/50 dark:border-gray-700/50">
                Learn More
              </button>
            </div>

            {/* Feature Pills */}
            <div className="mt-16 flex flex-wrap justify-center gap-4 animate-slide-up delay-300">
              <div className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  ✨ Curated Collection
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  🚀 Fast & Responsive
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  💎 Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 md:px-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 Product Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
