import { Link } from 'react-router-dom';
import { useCartStore } from '../useCartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ item }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(item);
    toast.success(`${item.title} ditambahkan ke keranjang!`);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col justify-between hover:border-sky-500/50 transition-all shadow-lg">
      <Link to={`/produk/${item.id}`}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
        />
        <h3 className="font-bold text-slate-100 line-clamp-1 mb-1 hover:text-sky-400">
          {item.title}
        </h3>
        <p className="text-xs text-slate-400 capitalize mb-2">{item.category}</p>
        <p className="text-emerald-400 font-bold text-lg mb-4">${item.price}</p>
      </Link>

      <div className="flex gap-2">
        <Link
          to={`/produk/${item.id}`}
          className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          Detail
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          + Beli
        </button>
      </div>
    </div>
  );
}