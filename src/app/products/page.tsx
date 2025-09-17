import { fetchProducts } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function ProductsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const category = searchParams?.category || '';
  const sort = (searchParams?.sort as 'asc' | 'desc') || 'asc';
  const productsData = await fetchProducts({ category, sort, limit: 20 });
  const products = productsData.products;
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form className="flex gap-4 mb-6">
        <select name="category" defaultValue={category} className="border p-2 rounded">
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className="border p-2 rounded">
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
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
