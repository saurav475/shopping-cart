import React, { createContext, useContext, useState, useCallback } from 'react';
import { cartAPI } from '../utils/apiService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.get();
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (product, quantity) => {
    try {
      setError(null);
      const response = await cartAPI.add({ product, quantity });
      setCart(response.data.cart);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add to cart';
      setError(message);
      throw err;
    }
  }, []);

  const updateCartItem = useCallback(async (product, quantity) => {
    try {
      setError(null);
      const response = await cartAPI.update({ product, quantity });
      setCart(response.data.cart);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update cart';
      setError(message);
      throw err;
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      setError(null);
      const response = await cartAPI.remove(productId);
      setCart(response.data.cart);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to remove from cart';
      setError(message);
      throw err;
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      setError(null);
      const response = await cartAPI.clear();
      setCart(response.data.cart);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to clear cart';
      setError(message);
      throw err;
    }
  }, []);

  const cartTotal = cart?.items?.reduce((total, item) => {
    const itemPrice = item.product?.price || 0;
    const discount = item.product?.discount || 0;
    const discountedPrice = itemPrice - (itemPrice * discount) / 100;
    return total + discountedPrice * item.quantity;
  }, 0) || 0;

  const itemCount = cart?.items?.length || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
