"use client";

import { useLocalStorage } from "./useLocalStorage";
import { Product } from "../app/types/product";

interface UseFavoritesReturn {
  favorites: Product[];
  favoritesCount: number;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
}

/**
 * Custom hook for managing favorite products
 * Uses local storage to persist favorites across sessions
 * Includes validation to prevent duplicate entries
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useLocalStorage<Product[]>("favorites", []);

  /**
   * Add a product to favorites
   * Validates that the product doesn't already exist
   */
  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      // Validation: Check if product already exists
      const exists = prev.some((p) => p.id === product.id);
      
      if (exists) {
        console.log(`Product ${product.id} is already in favorites`);
        return prev; // Don't add duplicates
      }
      
      // Add new product to the beginning of the array
      return [product, ...prev];
    });
  };

  /**
   * Remove a product from favorites by ID
   */
  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  /**
   * Check if a product is in favorites
   */
  const isFavorite = (productId: number): boolean => {
    return favorites.some((p) => p.id === productId);
  };

  /**
   * Toggle favorite status - add if not favorited, remove if favorited
   */
  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    favoritesCount: favorites.length,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
