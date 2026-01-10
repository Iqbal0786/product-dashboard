"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";


export default function FavoritesList() {
  const { favorites, favoritesCount, removeFromFavorites } = useFavorites();

  if (favoritesCount === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 mb-6">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          No Favorites Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start adding products to your favorites to see them here
        </p>
        <Link
          href="/products"
          className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Favorites
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {favoritesCount} {favoritesCount === 1 ? "product" : "products"} saved
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <Link href={`/products/${product.id}`}>
              {/* Product Image */}
              <div className="relative h-64 bg-white dark:bg-gray-900 flex items-center justify-center p-6">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {product.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({product.rating.count})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFromFavorites(product.id);
              }}
              className=" cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Remove from favorites"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
