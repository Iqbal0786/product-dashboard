import { render, screen } from '@testing-library/react';
import ProductsPage from '@/app/products/page';
import { getAllProducts } from '@/lib/api/products';

// Mock the API function
jest.mock('@/lib/api/products', () => ({
  getAllProducts: jest.fn(),
}));

// Mock the ProductGrid component
jest.mock('@/components/ProductGrid', () => {
  return function MockProductGrid({ initialProducts }: any) {
    return (
      <div data-testid="product-grid">
        <div>Products Count: {initialProducts.length}</div>
        {initialProducts.map((product: any) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    );
  };
});

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    description: 'Description 1',
    category: "men's clothing",
    image: '/test1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'Description 2',
    category: "women's clothing",
    image: '/test2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
];

describe('Products Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders products page with fetched data', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    
    const page = await ProductsPage();
    render(page);
    
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByText('Products Count: 2')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calls getAllProducts API', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    
    await ProductsPage();
    
    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });

  it('handles empty products array', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue([]);
    
    const page = await ProductsPage();
    render(page);
    
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
    expect(screen.getByText('Products Count: 0')).toBeInTheDocument();
  });

  it('renders page title', async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    
    const page = await ProductsPage();
    render(page);
    
    const heading = screen.getByRole('heading', { name: /product catalog/i });
    expect(heading).toBeInTheDocument();
  });
});
