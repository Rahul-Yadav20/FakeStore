import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';

const Cart = () => {

  // destructuring variables and functions from useCart hook
  const { cart, removeFromCart, total } = useCart();

  // Check order placed or not based on orderPlaced variable
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handling function when user click on place order button
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 3000); // Reset order placed state after 3 seconds
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Shopping Cart</h2>

      {/* Check cart is empty */}
      {cart.length === 0 ? (
        // if cart empty show this message
        <p className="text-black dark:text-white">Your cart is empty</p>
      ) : (
        // Something is in cart then run this code
        <div className="overflow-x-auto">
          {/* Showing cart items in table form */}
          <table className="min-w-full bg-white dark:bg-gray-800">
            {/* Table Heading */}
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {/* Fetching all products from the cart array */}
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {/* Retreiving image and title from cart for each product  */}
                        <img className="h-10 w-10 rounded-full" src={item.image} alt={item.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-200">{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    {/* Retreiving quantity from cart for each product  */}
                    <div className="text-sm leading-5 text-gray-900 dark:text-gray-200">{item.quantity}</div>
                  </td>
                  {/* Calculating the total price  */}
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    {/* toFixed() method provide number of digit after decimal */}
                    <div className="text-sm leading-5 text-gray-900 dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700 text-right text-sm leading-5 font-medium">
                    {/* Remove button to delete a product from the cart */}
                    {/* removeFromCart() method is already define in the useCart hook */}
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <div className="text-lg font-bold text-black dark:text-white">
              Total: ${total.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {/* execute handlePlaceOrder on click to place order button */}
            {/* handlePlaceOrder function is setting the orderPlaced variable to true or false*/}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-700"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>

          {/*  if orderPlaced is true the run this code*/}
          {orderPlaced && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md text-center animate-bounce">
                <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Your order has been placed</h3>
                <p className="text-black dark:text-white">Thanks for shopping!</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
