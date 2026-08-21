# React Online Shop App

A modern, responsive, and fully functional E-Commerce Frontend Application built with React, Vite, Tailwind CSS, and Zustand.

**Live Demo:** [https://ecommerce-sederhana.vercel.app/](https://ecommerce-sederhana.vercel.app/)

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-brown?style=for-the-badge)

---

##  Features

-  Dynamic Product Catalog: Fetches real-time product data and categories from external API (DummyJSON).
-  Real-time Search & Category Filter: Instant search filtering combined with category tab selection.
-  Sorting & Pagination: Sort products by price (lowest/highest) and seamlessly browse through paginated results.
-  Skeleton Loading UI: Enhanced User Experience (UX) with sleek pulse skeleton loading states.
-  Cart Management: Add, update quantities, remove items, or clear cart using Zustand state management.
-  Persistent Storage: Cart and order history remain intact across page reloads via localStorage.
-  Interactive UI & Animations: 
  - Toast notifications powered by react-hot-toast.
  - Dynamic badge animations with framer-motion.
-  Checkout & Order History: Multi-step user flow to fill shipping details and view full transaction histories.
-  Dark / Light Theme Toggle: Flexible UI theme support.

---

##  Tech Stack & Libraries

- Framework: React + Vite
- Styling: Tailwind CSS
- State Management: Zustand (with persist middleware)
- Routing: React Router DOM
- Notifications: React Hot Toast
- Animations: Framer Motion

---

##  Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have Node.js installed:
- Node.js (v16.x or higher recommended)

### Installation

1. Clone the repository
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies
   npm install

3. Start the development server
   npm run dev

4. Open in browser
   Navigate to http://localhost:5173 in your browser.

---

##  Project Structure

##  Project Structure

```text
src/
├── components/
│   ├── ProductCard.jsx       # Individual product card component
│   └── ProductSkeleton.jsx   # Skeleton loader for product grid
├── pages/
│   ├── Home.jsx              # Product catalog page (Search, Filter, Pagination)
│   ├── DetailProduk.jsx      # Detailed view for a single product
│   ├── CartPage.jsx          # Shopping cart overview
│   ├── CheckoutPage.jsx      # Checkout form and payment flow
│   ├── OrderHistory.jsx      # Completed transactions history
│   └── About.jsx             # About page
├── useCartStore.js           # Zustand global state management
├── App.jsx                   # Main application layout & routes
└── main.jsx                  # React DOM entry point
```

##  License

This project is open-source and available under the MIT License.
