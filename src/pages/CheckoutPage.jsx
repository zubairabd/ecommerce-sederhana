import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0);

  // Fungsi yang dipanggil saat form lolos validasi
  const onSubmit = (data) => {
    alert(`Terima kasih ${data.nama}! Pesananmu senilai $${totalHarga.toFixed(2)} sedang diproses.`);
    localStorage.removeItem('cart_items'); // Bersihkan keranjang
    window.location.href = '/'; // Kembali ke halaman utama
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h1 className="text-2xl font-bold text-sky-400 mb-6 text-center">Form Pengiriman 🚚</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Nama Lengkap</label>
          <input
            {...register('nama', { required: 'Nama wajib diisi' })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="John Doe"
          />
          {errors.nama && <p className="text-rose-400 text-xs mt-1">{errors.nama.message}</p>}
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
          <input
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: { value: /^\S+@\S+$/i, message: 'Format email tidak valid' },
            })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Input Alamat */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Alamat Lengkap</label>
          <textarea
            {...register('alamat', { required: 'Alamat wajib diisi', minLength: { value: 10, message: 'Alamat minimal 10 karakter' } })}
            rows="3"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Jl. Merdeka No. 123..."
          />
          {errors.alamat && <p className="text-rose-400 text-xs mt-1">{errors.alamat.message}</p>}
        </div>

        {/* Ringkasan & Tombol Submit */}
        <div className="pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-4">Total Bayar: <span className="text-lg font-bold text-emerald-400">${totalHarga.toFixed(2)}</span></p>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg transition-colors"
          >
            Konfirmasi & Bayar
          </button>
        </div>
      </form>
    </div>
  );
}