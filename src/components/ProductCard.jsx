import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function ProductCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col justify-between hover:border-slate-600 transition-colors">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-slate-100 line-clamp-1">{item.title}</h3>
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
  );
}