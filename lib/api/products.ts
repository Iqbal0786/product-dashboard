import axios, { AxiosError } from "axios";
import { Product } from "../../types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
});

/**
 * Fetch all products from the API
 * @returns Promise with array of products
 * @throws Error if the API request fails
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(`Failed to fetch products: ${axiosError.response.status} ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        throw new Error("Failed to load products. No response from server.");
      }
    }
    
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
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Return null for 404 errors (product not found)
      if (axiosError.response?.status === 404) {
        return null;
      }
      
      if (axiosError.response) {
        throw new Error(`Failed to fetch product: ${axiosError.response.status} ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        throw new Error("Failed to load product details. No response from server.");
      }
    }
    
    throw new Error("Failed to load product details. Please try again later.");
  }
}

/**
 * Get all unique categories from products
 * @returns Promise with array of category names
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await apiClient.get<string[]>("/products/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    
    // Return default categories as fallback
    return ["men's clothing", "women's clothing", "jewelery", "electronics"];
  }
}
