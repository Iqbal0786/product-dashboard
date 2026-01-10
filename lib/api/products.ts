import { Product } from "../../app/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

/**
 * Fetch all products from the API
 * @returns Promise with array of products
 * @throws Error if the API request fails
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products. Please try again later.");
  }
}

/**
 * Fetch a single product by ID
 * @param id - Product ID
 * @returns Promise with product data or null if not found
 * @throws Error if the API request fails
 */
export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error("Failed to load product details. Please try again later.");
  }
}

/**
 * Get all unique categories from products
 * @returns Promise with array of category names
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return default categories as fallback
    return ["men's clothing", "women's clothing", "jewelery", "electronics"];
  }
}
