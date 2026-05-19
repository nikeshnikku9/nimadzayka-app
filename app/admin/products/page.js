'use client';

import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Haldi Powder',
    price: '₹70',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Lal Mirch Powder',
    price: '₹90',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dhaniya Powder',
    price: '₹60',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Garam Masala',
    price: '₹120',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] p-8">
      <h1 className="text-5xl font-bold text-[#7f1d1d] mb-2">
        Product Catalog
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Manage your spice collection
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-yellow-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold text-[#7f1d1d]">
                {product.name}
              </h2>

              <p className="text-yellow-700 text-lg mt-2">
                {product.price}
              </p>

              <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
