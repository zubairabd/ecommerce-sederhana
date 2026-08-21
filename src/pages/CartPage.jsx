import { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);

  const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-300 mb-4">Keranjang Belanja Masih Kosong 🛒</h2>
        <Link to="/" className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium">
          Mulai Belanja ➔
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-400 mb-6 text-center">Isi Keranjang Belanja 🛒</h1>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                <p className="text-emerald-400 text-sm font-bold">${item.price} x {item.qty}</p>
              </div>
            </div>

            {/* Aksi Tambah, Kurang, & Hapus */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 w-8 h-8 rounded-lg font-bold"
              >
                -
              </button>
              
              <span className="font-bold text-slate-100 px-1">{item.qty}</span>

              <button
                onClick={() => addToCart(item)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 w-8 h-8 rounded-lg font-bold"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 p-2 rounded-lg ml-2 text-xs font-semibold border border-rose-500/30"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">Total Pembayaran:</p>
          <p className="text-2xl font-bold text-emerald-400">${totalHarga.toFixed(2)}</p>
        </div>
        <button 
          onClick={() => alert('Fitur Checkout Berhasil!')} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          <Link 
  to="/checkout" 
  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold transition-colors block"
>
  Checkout Sekarang
</Link>
        </button>
      </div>
    </div>
  );
}