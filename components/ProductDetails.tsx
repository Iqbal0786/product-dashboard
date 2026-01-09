"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "../app/types/product";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 p-8 lg:p-12">
        <div className="relative aspect-square flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
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
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.rating.rate}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-8">
          <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quantity
          </h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 flex items-center justify-center text-gray-900 dark:text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/30 flex items-center justify-center text-gray-900 dark:text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 dark:bg-gray-800/80 dark:text-white border border-gray-200/50 dark:border-gray-700/50"
          >
            Buy Now
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 dark:bg-gray-800/40 dark:border-gray-700/30">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                Free shipping on orders over $50
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                30-day return policy
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                Secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
