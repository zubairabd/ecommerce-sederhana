import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import useFetch from '../hooks/useFetch'; // 1. Import Custom Hook

export default function Home() {
  const [search, setSearch] = useState('');
  const { addToCart } = useContext(CartContext);

  // 2. Gunakan Custom Hook hanya dalam 1 baris
  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=12');

  if (loading) return <p className="text-center py-10 text-sky-400 animate-pulse">Loading data...</p>;
  if (error) return <p className="text-center py-10 text-rose-400">Error: {error}</p>;

  const produkTersaring = data?.products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-sky-400 mb-6 text-center">Katalog Produk 🛍️</h1>

      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produkTersaring?.map((item) => (
          <div key={item.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col justify-between">
            <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            <div>
              <h3 className="font-semibold text-lg text-slate-100">{item.title}</h3>
              <p className="text-emerald-400 font-bold mt-1">${item.price}</p>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Link 
                to={`/produk/${item.id}`} 
                className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Detail
              </Link>
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Beli
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}