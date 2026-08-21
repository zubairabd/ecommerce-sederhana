import { useState } from 'react';
import useFetch from '../useFetch';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <div className="text-center py-10 text-slate-300">Loading produk...</div>;
  if (error) return <div className="text-center py-10 text-rose-400">Error: {error}</div>;

  // 1. Ambil daftar kategori unik dari data produk secara otomatis
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // 2. Filter produk berdasarkan Search Term DAN Kategori yang dipilih
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-sky-400 mb-6 text-center">Katalog Produk 🛍️</h1>

      {/* Control Panel: Search Bar + Filter Kategori */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        {/* Filter Buttons / Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-slate-400 py-10">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}