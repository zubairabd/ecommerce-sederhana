import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Ambil data awal dari localStorage (jika ada), jika tidak ada gunakan array kosong []
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan data cart ke localStorage setiap kali state cart berubah
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      if (isExist) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQty, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}