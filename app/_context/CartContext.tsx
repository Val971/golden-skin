import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { toast } from 'sonner';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (productId: string, sizeId: string) => void;
  clearCart: () => void;
  cartTotalprice: void;
  cartLoading: boolean;
  totalCartItem: number;
  increaseQuantity: (productId: string, sizeId: string) => void;
  decreaseQuantity: (productId: string, sizeId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within an AuthProvider');
  }
  return context;
};

export const CartProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  let total = 0;

  // Charger le panier depuis le localStorage lors du premier chargement
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product: CartItem) => {
    setCartLoading(true);
    const existingProduct = cart.find(
      (item) =>
        item.documentId === product.documentId &&
        item.sizes.documentId === product.sizes.documentId
    );
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.documentId === product.documentId &&
          item.sizes.documentId === product.sizes.documentId
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
                price: item.price + product.price,
              }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product }]);
    }
    toast(`L'article a bien éte ajouté au pannier`);
    setCartLoading(false);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId: string, sizeId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.documentId === productId && item.sizes.documentId === sizeId)
      )
    );
  };

  // Fonction pour vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total du panier
  const cartTotalprice = cart.forEach((item) => {
    total = total + item.quantity * item.price;
  });

  const totalCartItem = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Augmenter la quantité d'un article
  const increaseQuantity = (productId: string, sizeId: string) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.documentId === productId && item.sizes.documentId === sizeId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Diminuer la quantité d'un article
  const decreaseQuantity = (productId: string, sizeId: string) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.documentId === productId &&
        item.sizes.documentId === sizeId &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Fournir l'état et les actions pour le panier
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotalprice,
        cartLoading,
        totalCartItem,
        increaseQuantity,
        decreaseQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};
