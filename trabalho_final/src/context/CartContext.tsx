import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../shared/CatalogInterface";

interface CartItem {
  item: Movie;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: Movie) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Movie) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(cartItem => cartItem.item.id !== itemId);
      }
      return prevCart.map(cartItem =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      );
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
