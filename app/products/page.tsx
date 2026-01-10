import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "../../lib/api/products";
import ProductGrid from "../../components/ProductGrid";
import { Product } from "../types/product";

export const metadata: Metadata = {
  title: "Product Catalog | Product Explorer Dashboard",
  description: "Browse our complete collection of products including men's clothing, women's clothing, jewelry, and electronics. Find the perfect product for you.",
  keywords: ["products", "catalog", "shopping", "e-commerce", "clothing", "electronics", "jewelry"],
  openGraph: {
    title: "Product Catalog | Product Explorer Dashboard",
    description: "Browse our complete collection of products",
    type: "website",
  },
};

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getAllProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load products';
    console.error('Error loading products:', e);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-pulse dark:bg-purple-600/10"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl animate-pulse delay-1000 dark:bg-indigo-600/10"></div>
      </div>

      <div className="relative z-10 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4"
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
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Product Catalog
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
                    Unable to Load Products
                  </h3>
                  <p className="text-red-700 dark:text-red-400">
                    {error}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                    Please try refreshing the page or check back later.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid Component (Client) */}
          {!error && <ProductGrid initialProducts={products} />}
        </div>
      </div>
    </div>
  );
}
