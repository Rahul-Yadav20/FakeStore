import { useState, useContext, createContext, useEffect } from 'react';

// Creating context
const CartContext = createContext();


// Creating custom hook
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Get the cart from localStorage or initialize it to an empty array
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Use useEffect to update localStorage whenever the cart changes
  useEffect(() => {
    // setItem method take value as string, So covnverting the javascript value (cart) to the JSON string
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // addToCart function will run when user click on the Add to cart button
  const addToCart = (product) => {
    setCart(prevCart => {
      
      // Check if product is already present in cart
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // if product is present then increament the quantity
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // hold the previous state of cart and add new products to the cart and set quantity to 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };


  // removeFromCart function will run when user click on the Remove button
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      // Check if product is already present in cart
      const existingProduct = prevCart.find(item => item.id === productId);

      // if only 1 quantity of product is present then remove the product
      //  filter method move the item from the cart based on the condition true
      if (existingProduct.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      }

      // hold the previous state of cart items and add remove products from the cart
      // Basically, decreasing quantity
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Calculating the total for the particular item present in cart 
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {/* providing the cart context to children componets*/}
      {children}
    </CartContext.Provider>
  );
};
