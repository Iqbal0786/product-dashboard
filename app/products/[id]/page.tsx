'use client';

import { use } from 'react';
import Link from 'next/link';
import ProductDetails from '@/components/products/ProductDetails';
import { useProduct } from '../../../hooks/useProductQueries';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { data: product, isLoading, error, refetch } = useProduct(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-pulse dark:bg-purple-600/10"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl animate-pulse delay-1000 dark:bg-indigo-600/10"></div>
      </div>

      <div className="relative z-10 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Loading product details...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
                    Unable to Load Product
                  </h3>
                  <p className="text-red-700 dark:text-red-400">
                    {error instanceof Error ? error.message : 'An error occurred'}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                    Please try again or check back later.
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Not Found */}
          {!isLoading && !error && !product && (
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                    Product Not Found
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-400">
                    The product you're looking for doesn't exist.
                  </p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Product Details */}
          {!isLoading && !error && product && <ProductDetails product={product} />}
        </div>
      </div>
    </div>
  );
}
