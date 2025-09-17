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
   <main className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <ProductCarousel images={product.images} />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title and Category Badge */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {product.category}
                </span>
                {product.brand && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {product.brand}
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price and Stock Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    Price per unit
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button 
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    product.stock > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                </button>
                <button className="flex-1 sm:flex-none py-3 px-6 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-50">
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-blue-600 font-semibold text-sm mb-1">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders over $50</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-green-600 font-semibold text-sm mb-1">Easy Returns</div>
                <div className="text-xs text-gray-600">30-day return policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 p-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 bg-gray-50 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">Premium quality products</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and secure shipping</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 109.5 9.5 9.5 9.5 0 00-9.5-9.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
