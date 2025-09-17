export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProducts(params?: {
  sortBy?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}): Promise<ProductsResponse> {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
  const query: string[] = [];
  if (params?.sortBy) query.push(`category=${params.sortBy}`);
  if (params?.limit) query.push(`limit=${params.limit}`);
  if (params?.skip) query.push(`skip=${params.skip}`);
  if (query.length) url += '?' + query.join('&');
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data: ProductsResponse = await res.json();
  if (params?.order) {
    data.products = data.products.sort((a, b) =>
      params.order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }
  return data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
