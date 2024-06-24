import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {

  // destructuring variables and functions from useCart hook
  const { addToCart, removeFromCart, cart } = useCart();

  // Checking if that particular product is present in cart or not using product id
  const inCart = cart.some(item => item.id === product.id);

  return (
    <div className="bg-white dark:text-black shadow-md p-4 transition-transform transform hover:scale-105 border-2 border-gray-400 rounded-md">
      {/* Redirect to the /product/${product.id}and match if this route present in the App.jsx file*/}
      <Link to={`/product/${product.id}`}>
        {/* Retreiving product details */}
        <img src={product.image} alt={product.title} className="h-40 mx-auto" />
        <h2 className="text-xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </Link>

      {/* Add to cart button and execute addToCart function on click */}
      {/* addToCart function is already define in useCart hook and execute this function  */}
      <div className="mt-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded transition-colors hover:bg-blue-700 active:scale-95"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        {/* if product is present in cart then show the Remove button */}
        {/* Add to cart button and execute removeFromCart function on click */}
        {inCart && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded transition-colors hover:bg-red-700 ml-2 active:scale-95"
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
