import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function DetailProduk() {
  const { id } = useParams();
  
  // Panggil Custom Hook useFetch untuk mengambil detail 1 barang
  const { data: detail, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) return <p className="text-center py-10 text-sky-400 animate-pulse">Memuat detail produk...</p>;
  if (error) return <p className="text-center py-10 text-rose-400">Error: {error}</p>;

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl max-w-lg mx-auto">
      <img src={detail.thumbnail} alt={detail.title} className="w-full h-56 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold text-sky-400 mb-2">{detail.title}</h1>
      <p className="text-slate-300 text-sm mb-4">{detail.description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-emerald-400">${detail.price}</span>
        <span className="text-xs bg-slate-700 px-3 py-1 rounded-full text-slate-300">Stok: {detail.stock}</span>
      </div>
      <Link to="/" className="block text-center bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg text-sm">
        ⬅ Kembali ke Katalog
      </Link>
    </div>
  );
}