import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../useCartStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useCartStore((state) => state.addOrder);
  
  // State Form Alamat & Pembayaran
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'transfer',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hitung Total Pembayaran
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // 2. Buat objek data pesanan lengkap
      const orderData = {
        id: `INV-${Date.now()}`,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        items: [...cart],
        totalAmount: totalPrice,
        shippingInfo: { ...formData },
      };

      // 3. Simpan ke Zustand Order History
      addOrder(orderData);

      setIsSubmitting(false);
      clearCart();
      toast.success('Pesanan berhasil dibuat! Terima kasih 🎉');
      navigate('/orders'); // Redirect langsung ke Halaman Riwayat Pesanan
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Tidak ada barang untuk di-checkout 🛒</h2>
        <p className="text-slate-400 mb-6">Silakan pilih produk terlebih dahulu.</p>
        <Link
          to="/"
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-block"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* KIRI: Form Pengiriman & Pembayaran */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-slate-100">Informasi Pengiriman</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="budi@example.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Alamat Lengkap
            </label>
            <textarea
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Jl. Merdeka No. 123..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Kota / Kabupaten
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="Jakarta Selatan"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Metode Pembayaran
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-sky-500"
            >
              <option value="transfer">Bank Transfer (BCA / Mandiri)</option>
              <option value="qris">QRIS / E-Wallet</option>
              <option value="cod">Bayar di Tempat (COD)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center"
          >
            {isSubmitting ? 'Memproses Pesanan...' : `Bayar Sekarang ($${totalPrice.toFixed(2)})`}
          </button>
        </form>
      </div>

      {/* KANAN: Ringkasan Pesanan (Order Summary) */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
        <h2 className="text-xl font-bold mb-4 text-slate-100">Ringkasan Pesanan</h2>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
              <div className="flex items-center space-x-3">
                <img src={item.thumbnail} alt={item.title} className="w-10 h-10 object-cover rounded" />
                <div>
                  <p className="font-semibold text-slate-200 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-slate-400">Qty: {item.quantity || 1}</p>
                </div>
              </div>
              <p className="font-medium text-emerald-400">
                ${(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Subtotal Produk</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Ongkos Kirim</span>
            <span className="text-emerald-400 font-medium">Gratis</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-100 pt-2 border-t border-slate-700">
            <span>Total Tagihan</span>
            <span className="text-emerald-400">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}