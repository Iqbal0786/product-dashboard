import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/app/types/product';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test description',
  category: "men's clothing",
  image: '/test.jpg',
  rating: { rate: 4.5, count: 100 },
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 39.99,
  description: 'Test description 2',
  category: "women's clothing",
  image: '/test2.jpg',
  rating: { rate: 4.0, count: 50 },
};

describe('useFavorites Hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('adds a product to favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockProduct);
    expect(result.current.favoritesCount).toBe(1);
  });

  it('removes a product from favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    // Add product
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    expect(result.current.favorites).toHaveLength(1);
    
    // Remove product
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('checks if a product is favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.isFavorite(mockProduct.id)).toBe(false);
    
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    expect(result.current.isFavorite(mockProduct.id)).toBe(true);
  });

  it('handles multiple favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    act(() => {
      result.current.toggleFavorite(mockProduct2);
    });
    
    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.favoritesCount).toBe(2);
    expect(result.current.isFavorite(mockProduct.id)).toBe(true);
    expect(result.current.isFavorite(mockProduct2.id)).toBe(true);
  });

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    
    const stored = localStorage.getItem('favorites');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe(mockProduct.id);
  });

  it('loads favorites from localStorage on mount', () => {
    // Pre-populate localStorage
    localStorage.setItem('favorites', JSON.stringify([mockProduct]));
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(mockProduct.id);
    expect(result.current.favoritesCount).toBe(1);
  });
});
