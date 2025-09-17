import { fetchProduct } from '@/lib/products';
import { notFound } from 'next/navigation';
import BackButton from './BackButton';
import { ProductCarousel } from '../ProductCarousel';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  if (isNaN(productId)) return notFound();
  const product = await fetchProduct(productId);
  if (!product) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <div className="mb-4 text-gray-700">{product.description}</div>
      <div className="flex gap-4 items-center mb-4">
        <span className="text-xl font-bold text-blue-700">${product.price}</span>
        <span className={`px-3 py-1 rounded text-white text-sm ${product.stock > 0 ? 'bg-green-600' : 'bg-red-600'}`}>{product.stock > 0 ? 'Available' : 'Out of Stock'}</span>
      </div>
      <div className="mb-6">
        <ProductCarousel images={product.images} />
      </div>
      <div className="text-sm text-gray-500">Category: {product.category} | Brand: {product.brand}</div>
    </main>
  );

}
