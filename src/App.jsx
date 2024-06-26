import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Cart';
import { CartProvider } from './hooks/useCart';
import CategoryPage from './pages/CategoryPage';


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/category/:category' element={<CategoryPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
