import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashion-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashion-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number = 1) => {
    const existingItem = cartItems.find(
      item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.product.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        selectedSize,
        selectedColor
      };
      setCartItems(items => [...items, newItem]);
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    setCartItems(items =>
      items.filter(
        item => !(
          item.product.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        )
      )
    );

    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.product.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};