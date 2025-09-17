import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchProducts } from '@/lib/products';

export default async function ProductsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const sortBy = searchParams?.sortBy || '';
  const order = (searchParams?.order as 'asc' | 'desc') || 'asc';
  const productsData = await fetchProducts({ sortBy, order, limit: 20 });
  const products = productsData.products;
  const sortFields = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'price', label: 'Price' },
  ];

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form className="flex gap-4 mb-6">
        <select name="sortBy" defaultValue={sortBy} className="border p-2 rounded">
          <option value="">Sort By</option>
          {sortFields.map(field => (
            <option key={field.value} value={field.value}>{field.label}</option>
          ))}
        </select>
        <select name="order" defaultValue={order} className="border p-2 rounded">
          <option value="">Order By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
      </form>
      <Suspense fallback={<div>Loading products...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Link href={`/products/${product.id}`} key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <Image src={product.thumbnail} alt={product.title} width={300} height={200} className="object-cover rounded mb-2" />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <div className="mt-2 font-bold text-blue-700">${product.price}</div>
            </Link>
          ))}
        </div>
      </Suspense>
    </main>
  );
}
