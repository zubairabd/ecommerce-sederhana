import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'; // 1. Import Framer Motion
import Home from './pages/Home';
import About from './pages/About';
import DetailProduk from './pages/DetailProduk';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { useCartStore } from './useCartStore';
import OrderHistory from './pages/OrderHistory'; 
function MainApp() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: isDark ? '#1e293b' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          },
        }}
      />

      <nav className={`flex justify-between items-center p-4 border-b transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
        <span className="font-bold text-lg text-sky-500">My App</span>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-sky-500">Home</Link>
          <Link to="/about" className="hover:text-sky-500">About</Link>
          <Link className="hover:text-sky-500" to="/orders">Riwayat Pesanan</Link>.
          {/* 2. Gunakan motion.span untuk badge keranjang */}
          <Link to="/cart" className="relative bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold transition-colors">
            🛒 {totalItems}
            {totalItems > 0 && (
              <motion.span
                key={totalItems} // 3. Key unik untuk memicu animasi ulang
                animate={{ scale: [1, 1.4, 1] }} // 4. Efek animasi: normal -> besar -> normal
                transition={{ duration: 0.3 }} // 5. Durasi animasi
                className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              isDark ? 'bg-slate-700 border-slate-600 text-amber-400' : 'bg-slate-200 border-slate-300 text-slate-700'
            }`}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/produk/:id" element={<DetailProduk />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}