import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetails from '@/components/ProductDetails';
import { Product } from '@/types/product';

// Mock the useFavorites hook
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
    favoritesCount: 0,
    favorites: [],
  }),
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product description with detailed information.',
  category: "men's clothing",
  image: 'https://example.com/test-product.jpg',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe('ProductDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  describe('Rendering', () => {
    it('renders product title', () => {
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders product price', () => {
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('renders product description', () => {
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
    });

    it('renders product category', () => {
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText("men's clothing")).toBeInTheDocument();
    });

    it('renders product rating', () => {
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('(120 reviews)')).toBeInTheDocument();
    });

    it('renders product image with correct alt text', () => {
      render(<ProductDetails product={mockProduct} />);
      
      const image = screen.getByAltText('Test Product');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src');
    });
  });

  describe('Favorites Functionality', () => {
    it('shows "Add to Favorites" button when product is not favorited', () => {
      mockIsFavorite.mockReturnValue(false);
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });

    it('shows "Favorited" button when product is favorited', () => {
      mockIsFavorite.mockReturnValue(true);
      render(<ProductDetails product={mockProduct} />);
      
      expect(screen.getByText('Favorited')).toBeInTheDocument();
    });

    it('calls toggleFavorite when favorite button is clicked', async () => {
      const user = userEvent.setup();
      render(<ProductDetails product={mockProduct} />);
      
      const favoriteButton = screen.getByText('Add to Favorites');
      await user.click(favoriteButton);
      
      expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct);
      expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<ProductDetails product={mockProduct} />);
      
      const heading = screen.getByRole('heading', { name: 'Test Product' });
      expect(heading).toBeInTheDocument();
    });

    it('favorite button has accessible name', () => {
      render(<ProductDetails product={mockProduct} />);
      
      const button = screen.getByRole('button', { name: /favorites/i });
      expect(button).toBeInTheDocument();
    });
  });
});
