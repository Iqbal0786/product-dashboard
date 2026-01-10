import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/app/types/product';

// Mock the custom hooks
const mockFavorites: Product[] = [];
jest.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: jest.fn(() => false),
    toggleFavorite: jest.fn(),
    favoritesCount: 0,
    favorites: mockFavorites, // Use stable reference
  }),
}));

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 29.99,
    description: 'Test description 1',
    category: "men's clothing",
    image: '/test1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 19.99,
    description: 'Test description 2',
    category: "women's clothing",
    image: '/test2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 3,
    title: 'Shirt Product',
    price: 39.99,
    description: 'Test shirt',
    category: "men's clothing",
    image: '/test3.jpg',
    rating: { rate: 4.8, count: 200 },
  },
];

describe('ProductGrid Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders products correctly', () => {
      render(<ProductGrid initialProducts={mockProducts} />);
      
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getByText('Shirt Product')).toBeInTheDocument();
    });

    it('displays product prices', () => {
      render(<ProductGrid initialProducts={mockProducts} />);
      
      expect(screen.getByText('$29.99')).toBeInTheDocument();
      expect(screen.getByText('$19.99')).toBeInTheDocument();
      expect(screen.getByText('$39.99')).toBeInTheDocument();
    });

    it('renders category filters', () => {
      render(<ProductGrid initialProducts={mockProducts} />);
      
      expect(screen.getByText('All Products')).toBeInTheDocument();
      expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
      expect(screen.getByText("Women's Clothing")).toBeInTheDocument();
    });
  });

  describe('Category Filtering', () => {
    it('filters products by category', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      const mensButton = screen.getByText("Men's Clothing");
      await user.click(mensButton);
      
      await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Shirt Product')).toBeInTheDocument();
        expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
      });
    });

    it('shows all products when "All Products" is selected', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      // First filter by category
      const mensButton = screen.getByText("Men's Clothing");
      await user.click(mensButton);
      
      // Then click "All Products"
      const allButton = screen.getByText('All Products');
      await user.click(allButton);
      
      await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Shirt Product')).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('filters products by search query', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      await user.type(searchInput, 'Shirt');
      
      await waitFor(() => {
        expect(screen.getByText('Shirt Product')).toBeInTheDocument();
        expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
      });
    });

    it('shows "No products found" when search has no results', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      const searchInput = screen.getByPlaceholderText('Search products...');
      await user.type(searchInput, 'NonexistentProduct');
      
      await waitFor(() => {
        const noProductsElements = screen.getAllByText('No products found');
        expect(noProductsElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Sorting', () => {
    it('sorts products by price low to high', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      const sortSelect = screen.getByLabelText('Sort by:');
      await user.selectOptions(sortSelect, 'price-asc');
      
      await waitFor(() => {
        const products = screen.getAllByRole('link');
        const firstProduct = products.find(p => p.textContent?.includes('$19.99'));
        expect(firstProduct).toBeInTheDocument();
      });
    });

    it('sorts products by price high to low', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={mockProducts} />);
      
      const sortSelect = screen.getByLabelText('Sort by:');
      await user.selectOptions(sortSelect, 'price-desc');
      
      await waitFor(() => {
        const products = screen.getAllByRole('link');
        const firstProduct = products.find(p => p.textContent?.includes('$39.99'));
        expect(firstProduct).toBeInTheDocument();
      });
    });
  });

  describe('Pagination', () => {
    const manyProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10 + i,
      description: `Description ${i + 1}`,
      category: "men's clothing",
      image: `/test${i + 1}.jpg`,
      rating: { rate: 4.0, count: 10 },
    }));

    it('displays pagination when products exceed 10', () => {
      render(<ProductGrid initialProducts={manyProducts} />);
      
      expect(screen.getByText('Showing 1-10 of 25 products')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    it('navigates to next page', async () => {
      const user = userEvent.setup();
      render(<ProductGrid initialProducts={manyProducts} />);
      
      const nextButton = screen.getByText('Next');
      await user.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('Showing 11-20 of 25 products')).toBeInTheDocument();
      });
    });

    it('disables Previous button on first page', () => {
      render(<ProductGrid initialProducts={manyProducts} />);
      
      const previousButton = screen.getByText('Previous');
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Empty State', () => {
    it('shows empty state when no products', () => {
      render(<ProductGrid initialProducts={[]} />);
      
      const noProductsElements = screen.getAllByText('No products found');
      expect(noProductsElements.length).toBeGreaterThan(0);
    });
  });
});
