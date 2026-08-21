import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../useCartStore';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(`${title} dihapus dari keranjang`);
  };

  const handleClearCart = () => {
    if (window.confirm('Yakin ingin mengosongkan seluruh keranjang?')) {
      clearCart();
      toast.error('Seluruh item di keranjang telah dihapus');
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Keranjang Belanja Kosong 🛒</h2>
        <p className="text-slate-400 mb-6">Kamu belum menambahkan produk apa pun.</p>
        <Link
          to="/"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-block"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        <button
          onClick={handleClearCart}
          className="text-xs text-rose-400 hover:text-rose-300 underline font-medium transition-colors"
        >
          Kosongkan Keranjang
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                <p className="text-emerald-400 font-bold">${item.price}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tombol Pengatur Jumlah Barang */}
              <div className="flex items-center bg-slate-700 rounded-lg border border-slate-600">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 text-slate-200 hover:bg-slate-600 rounded-l-lg transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-semibold text-white">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 text-slate-200 hover:bg-slate-600 rounded-r-lg transition-colors font-bold"
                >
                  +
                </button>
              </div>

              {/* Tombol Hapus */}
              <button
                onClick={() => handleRemove(item.id, item.title)}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg text-sm transition-colors active:scale-95"
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
          <p className="text-2xl font-bold text-emerald-400">${totalPrice.toFixed(2)}</p>
        </div>

        <Link
          to="/checkout"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
        >
          Lanjut Checkout
        </Link>
      </div>
    </div>
  );
}