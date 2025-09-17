import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchProducts } from '@/lib/products';

export default async function ProductsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const sortBy = searchParams?.sortBy || '';
  const order = (searchParams?.order as 'asc' | 'desc') || '';
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const productsData = await fetchProducts({ sortBy, order, limit, skip: (page - 1) * limit });
  const products = productsData.products;
  const total = productsData.total;
  const sortFields = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'price', label: 'Price' },
  ];

  return (
    <main className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
  {/* Header with improved typography */}
  <div className="mb-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
    <p className="text-gray-600">Discover our curated collection</p>
  </div>

  {/* Enhanced filter form with better styling */}
  <form className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select 
          name="sortBy" 
          id="sortBy"
          defaultValue={sortBy} 
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">Choose sorting option</option>
          {sortFields.map(field => (
            <option key={field.value} value={field.value}>{field.label}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
          Order
        </label>
        <select 
          name="order" 
          id="order"
          defaultValue={order} 
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      <div className="flex items-end">
        <button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </form>

  {/* Enhanced product grid */}
  <Suspense fallback={
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading products...</span>
    </div>
  }>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <Link 
          href={`/products/${product.id}`} 
          key={product.id} 
          className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image container with overlay effect */}
          <div className="relative overflow-hidden">
            <Image 
              src={product.thumbnail} 
              alt={product.title} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
          
          {/* Content section */}
          <div className="p-5">
            <h2 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
              {product.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {product.description}
            </p>
            
            {/* Price with enhanced styling */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {page > 1 && (
          <Link href={`?sortBy=${sortBy}&order=${order}&page=${page-1}&limit=${limit}`} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold">Previous</Link>
        )}
        <span className="px-4 py-2 text-gray-700">Page {page} of {Math.ceil(total/limit)}</span>
        {page < Math.ceil(total/limit) && (
          <Link href={`?sortBy=${sortBy}&order=${order}&page=${page+1}&limit=${limit}`} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold">Next</Link>
        )}
      </div>
  </Suspense>
</main>
  );
}
