import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Default metadata - will be enhanced by client-side data
  return {
    title: 'Product Details | Product Explorer Dashboard',
    description: 'View detailed information about this product',
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
