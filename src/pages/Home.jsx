import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard'; // Import komponen baru

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=20');

  if (loading) return <p className="text-center py-10 text-sky-400 animate-pulse">Loading data...</p>;
  if (error) return <p className="text-center py-10 text-rose-400">Error: {error}</p>;

  const productsList = data?.products || [];

  // 1. Ekstraksi kategori unik
  const categories = ['All', ...new Set(productsList.map((p) => p.category))];

  // 2. Filter berdasarkan Search & Kategori
  const produkTersaring = productsList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 3. Sorting Harga
  const produkTersortir = [...produkTersaring].sort((a, b) => {
    if (sortBy === 'lowest') return a.price - b.price;
    if (sortBy === 'highest') return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-sky-400 mb-6 text-center">Katalog Produk </h1>

      {/* Panel Pencarian + Dropdown Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
        >
          <option value="default">Urutkan: Bawaan</option>
          <option value="lowest">Harga: Termurah</option>
          <option value="highest">Harga: Termahal</option>
        </select>
      </div>

      {/* Tombol Filter Kategori */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 justify-start md:justify-center">
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

      {/* Grid Produk - Menggunakan Komponen ProductCard */}
      {produkTersortir.length === 0 ? (
        <p className="text-center text-slate-400 py-10">Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produkTersortir.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}