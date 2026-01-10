import { render, screen } from '@testing-library/react';
import ProductDetailPage from '@/app/products/[id]/page';
import { getProductById } from '@/lib/api/products';
import { notFound } from 'next/navigation';

// Mock the API function
jest.mock('@/lib/api/products', () => ({
  getProductById: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock the ProductDetails component
jest.mock('@/components/ProductDetails', () => {
  return function MockProductDetails({ product }: any) {
    return (
      <div data-testid="product-details">
        <h1>{product.title}</h1>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
    );
  };
});

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: "men's clothing",
  image: '/test.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('Product Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product detail page with fetched data', async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);
    
    const page = await ProductDetailPage({ params: Promise.resolve({ id: '1' }) });
    render(page);
    
    expect(screen.getByTestId('product-details')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls getProductById with correct id', async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);
    
    await ProductDetailPage({ params: Promise.resolve({ id: '1' }) });
    
    expect(getProductById).toHaveBeenCalledWith('1');
    expect(getProductById).toHaveBeenCalledTimes(1);
  });

  it('calls notFound when product is not found', async () => {
    (getProductById as jest.Mock).mockResolvedValue(null);
    
    await ProductDetailPage({ params: Promise.resolve({ id: '999' }) });
    
    expect(notFound).toHaveBeenCalled();
  });

  it('handles different product ids', async () => {
    (getProductById as jest.Mock).mockResolvedValue({
      ...mockProduct,
      id: 5,
      title: 'Different Product',
    });
    
    await ProductDetailPage({ params: Promise.resolve({ id: '5' }) });
    
    expect(getProductById).toHaveBeenCalledWith('5');
  });
});
