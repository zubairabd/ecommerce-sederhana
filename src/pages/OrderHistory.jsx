import { Link } from 'react-router-dom';
import { useCartStore } from '../useCartStore';

export default function OrderHistory() {
  const orders = useCartStore((state) => state.orders) || [];

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Belum Ada Riwayat Pesanan 📦</h2>
        <p className="text-slate-400 mb-6">Kamu belum pernah melakukan transaksi.</p>
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
      <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-800 p-6 rounded-xl border border-slate-700"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-700 pb-3 mb-4 gap-2">
              <div>
                <span className="font-bold text-sky-400">{order.id}</span>
                <p className="text-xs text-slate-400">{order.date}</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                Selesai / Dibayar
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-slate-200 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-300">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
              <p className="text-xs text-slate-400">
                Penerima: <span className="text-slate-200 font-medium">{order.shippingInfo?.name}</span>
              </p>
              <div className="text-right">
                <p className="text-xs text-slate-400">Total Transaksi</p>
                <p className="text-lg font-bold text-emerald-400">
                  ${order.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}