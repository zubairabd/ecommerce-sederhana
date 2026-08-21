import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DetailProduk from './pages/DetailProduk';
import CartPage from './pages/CartPage'; // 1. Import Halaman Cart
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { CartProvider, CartContext } from './CartContext';
import CheckoutPage from './pages/CheckoutPage';

function MainApp() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { totalItems } = useContext(CartContext);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      <nav className={`flex justify-between items-center p-4 border-b transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
        <span className="font-bold text-lg text-sky-500">My App</span>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-sky-500">Home</Link>
          <Link to="/about" className="hover:text-sky-500">About</Link>
          
          {/* 2. Ubah Icon Keranjang menjadi <Link to="/cart"> */}
          <Link to="/cart" className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold transition-colors">
            🛒 {totalItems}
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
          <Route path="/cart" element={<CartPage />} /> {/* 3. Tambah Route /cart */}
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}