"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../../types/product";
import { useFavorites } from "../../hooks/useFavorites";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/Pagination";

interface ProductGridProps {
  initialProducts: Product[];
}

type Category = "all" | "men's clothing" | "women's clothing" | "jewelery" | "electronics";
type SortOption = "default" | "price-asc" | "price-desc";

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const { isFavorite, toggleFavorite, favoritesCount, favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchQuery, showFavoritesOnly, sortBy]);

  useEffect(() => {
    let products = initialProducts;
    
    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((product) => product.category === selectedCategory);
    }
    
    // Filter by search query (title only)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      products = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }
    
    // Filter by favorites - use favorites array directly to avoid function dependency
    if (showFavoritesOnly) {
      const favoriteIds = favorites.map(f => f.id);
      products = products.filter((product) => favoriteIds.includes(product.id));
    }
    
    // Apply sorting
    let sortedProducts = [...products];
    if (sortBy === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(sortedProducts);
  }, [selectedCategory, initialProducts, showFavoritesOnly, favorites, debouncedSearchQuery, sortBy]);

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: "jewelery", label: "Jewelery" },
    { value: "electronics", label: "Electronics" },
  ];

  // Memoized pagination calculations
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const productCountText = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalProducts);

    if (totalProducts === 0) {
      return "No products found";
    }

    return `Showing ${startIndex}-${endIndex} of ${totalProducts} ${
      totalProducts === 1 ? "product" : "products"
    }${showFavoritesOnly ? " from favorites" : ""}`;
  }, [filteredProducts.length, currentPage, itemsPerPage, showFavoritesOnly]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-300"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={` cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white/60 backdrop-blur-md text-gray-700 dark:bg-gray-800/60 dark:text-gray-200 hover:shadow-md hover:scale-105"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites Link and Toggle */}
      {mounted && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Favorites Link */}
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-5 h-5 fill-red-500 text-red-500"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                My Favorites
              </span>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div>

          {/* Show Favorites Only Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Show Favorites Only
            </span>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
                showFavoritesOnly
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label="Toggle show favorites only"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  showFavoritesOnly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Sort and Product Count */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-300 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product Count */}
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {productCountText}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="h-full bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
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
                {/* Favorite Button */}
                {mounted && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 dark:bg-gray-800/80 cursor-pointer"
                    aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isFavorite(product.id)
                          ? "fill-red-500 text-red-500"
                          : "fill-none text-gray-600 dark:text-gray-300"
                      }`}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                )}
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
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {/* Pagination Controls */}
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 mb-4">
            <svg
              className="h-10 w-10 text-gray-400"
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different category
          </p>
        </div>
      )}
    </>
  );
}
