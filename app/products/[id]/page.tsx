import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "../../../lib/api/products";
import ProductDetails from "@/components/ProductDetails";



interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | Product Explorer Dashboard`,
    description: product.description.substring(0, 160),
    keywords: [product.category, product.title, "buy online", "e-commerce"],
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.substring(0, 160),
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-pulse dark:bg-purple-600/10"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl animate-pulse delay-1000 dark:bg-indigo-600/10"></div>
      </div>

      <div className="relative z-10 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
}
