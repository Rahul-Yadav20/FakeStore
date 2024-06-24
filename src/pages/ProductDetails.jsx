import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import MoonLoader from 'react-spinners/MoonLoader'
import { motion } from 'framer-motion'

const ProductDetails = () => {

  // UseParams will provide the id from the url parameters
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // product varaible to store each product
  const [product, setProduct] = useState(null);

  // destructuring variables and functions from useCart hook
  const { addToCart, removeFromCart, cart } = useCart();

  // Check product present in cart 
  const inCart = cart.some(item => item.id === parseInt(id));

  // Fetching the product detail form the API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      });
  }, [id]);


  return (
    <div className="h-screen p-4 dark:bg-gray-600 dark:text-white">
      <h1 className='text-center text-3xl text-black font-medium mb-5 dark:text-white'>Product Details</h1>

      {/* motion rpovide the  initial, animate attribute for animation*/}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Loader */}
          <MoonLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : <motion.div
        className="flex flex-col md:flex-row items-center"
        initial={{ translateY: "20px", opacity: 0.5 }}
        animate={{
          translateY: "0px",
          opacity: 1,
          transition: {
            duration: 1
          }
        }} >

        {/* Retreiving the product details like image, description and price */}
        <img src={product.image} alt={product.title} className="w-64 md:w-1/3 md:h-[500px] border-2 border-blue-400 p-5 rounded-lg " />
        <div className="md:ml-4 mt-3">
          <h2 className="text-2xl md:text-3xl font-bold">{product.title} </h2>
          <span className='text-white bg-red-400 p-1 text-xs rounded-md'>{product.rating.rate} Ratings </span>
          <span className='text-red-600 text-sm ms-2 dark:text-black font-medium'>{product.rating.count} Reviews </span>
          <p className="mt-2">{product.description}</p>

          <p className="text-black font-medium text-2xl dark:text-white mt-5">${product.price}</p>
          <div className="mt-4 flex">

            {/* Button to add product to cart */}
            {/* calling the addToCart from the cart context */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded transition-colors hover:bg-blue-700 active:scale-95"
              onClick={() => addToCart(product)}
            >
              Add to Cart
              {/* calling the removeFromCart from the cart context */}
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
      </motion.div>}
    </div >
  );
};

export default ProductDetails;
