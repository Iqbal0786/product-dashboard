import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Catalog | Product Explorer Dashboard',
  description: "Browse our complete collection of products including men's clothing, women's clothing, jewelry, and electronics. Find the perfect product for you.",
  keywords: ['products', 'catalog', 'shopping', 'e-commerce', 'clothing', 'electronics', 'jewelry'],
  openGraph: {
    title: 'Product Catalog | Product Explorer Dashboard',
    description: 'Browse our complete collection of products',
    type: 'website',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
