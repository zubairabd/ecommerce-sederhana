import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Filter, Search, & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // 1. State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // Jumlah produk per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=100'), // Ambil lebih banyak produk
          fetch('https://dummyjson.com/products/categories'),
        ]);

        const dataProducts = await resProducts.json();
        const dataCategories = await resCategories.json();

        setProducts(dataProducts.products);
        setCategories(dataCategories);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset ke Halaman 1 setiap kali kata kunci / kategori / urutan berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // 2. Filter & Sorting Produk
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'lowest') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'highest') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // 3. Logika Potong Data (Slice) per Halaman
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
  <div>
    <h1 className="text-2xl font-bold text-center text-sky-400 mb-6">
      Katalog Produk
    </h1>

    {/* ... Bagian Search & Filter ... */}

    {/* Grid Produk / Skeleton Loading */}
    {loading ? (
      // 2. Tampilkan 6 kartu skeleton saat status loading = true
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    ) : currentProducts.length === 0 ? (
      <div className="text-center py-10 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-400">Produk tidak ditemukan 🔍</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    )}

    {/* ... Bagian Pagination ... */}
  </div>
);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-sky-400 mb-6">
        Katalog Produk
      </h1>

      {/* Control Panel: Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
        >
          <option value="default">Urutkan: Bawaan</option>
          <option value="lowest">Harga: Terendah</option>
          <option value="highest">Harga: Tertinggi</option>
        </select>
      </div>

      {/* Filter Kategori (Pills Button) */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-sky-500 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {categories.slice(0, 4).map((cat) => {
          const catSlug = typeof cat === 'object' ? cat.slug : cat;
          const catName = typeof cat === 'object' ? cat.name : cat;
          return (
            <button
              key={catSlug}
              onClick={() => setSelectedCategory(catSlug)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                selectedCategory === catSlug
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Grid Produk (Menggunakan currentProducts) */}
      {currentProducts.length === 0 ? (
        <div className="text-center py-10 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400">Produk tidak ditemukan 🔍</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}

      {/* 4. Navigasi Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                currentPage === page
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}