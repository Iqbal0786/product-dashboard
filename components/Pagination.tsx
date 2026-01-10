"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
          currentPage === 1
            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-white/60 backdrop-blur-md text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 hover:shadow-lg hover:scale-105 cursor-pointer"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1);

          const showEllipsis =
            (page === currentPage - 2 && currentPage > 3) ||
            (page === currentPage + 2 && currentPage < totalPages - 2);

          if (showEllipsis) {
            return (
              <span key={page} className="px-2 text-gray-400 dark:text-gray-500">
                ...
              </span>
            );
          }

          if (!showPage) return null;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 cursor-pointer rounded-full font-medium transition-all duration-300 ${
                currentPage === page
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110"
                  : "bg-white/60 backdrop-blur-md text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 hover:shadow-md hover:scale-105"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
          currentPage === totalPages
            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-white/60 backdrop-blur-md text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 hover:shadow-lg hover:scale-105 cursor-pointer"
        }`}
      >
        Next
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
