import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, IOrder, IOrderResponse } from '../types';
import GlobalApi from '../api/GlobalApi';
import { toast } from 'sonner';

type OrderContextType = {
  lastOrder: IOrder | undefined;
  addOrder: (order: IOrder) => Promise<IOrderResponse>;
  updateStocks: (order: CartItem[]) => void;
  clearOrders: () => void;
};

// Contexte vide initialisé
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an AuthProvider');
  }
  return context;
};

// Fournisseur du contexte
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [lastOrder, setLastOrder] = useState<IOrder>();

  // Ajouter une commande
  const addOrder = async (order: IOrder): Promise<IOrderResponse> => {
    const newOrder = {
      name: order.name,
      userId: order.userId,
      email: order.email,
      phone: order.phone,
      address: order.address,
      totalAmount: order.totalAmount,
      paymentId: order.id,
      products: order.products.map((item) => item.documentId),
    };

    try {
      const response = await GlobalApi.createOrder({ ...newOrder });
      setLastOrder(response);
      return response;
    } catch (err) {
      const error = err as IOrderResponse;
      return error;
    }
  };

  const updateStocks = (products: CartItem[]) => {
    products.map((item) => {
      const newStock = item.sizes.stock - item.quantity;
      GlobalApi.updateStock(item.sizes.documentId, newStock).then(
        () => {
          toast('Votre commande a bien été finalisée.');
        },
        () => {
          throw new Error(
            'Une erreur est survenue lors de la mise a jour des stock.'
          );
        }
      );
    });
  };

  // Effacer toutes les commandes
  const clearOrders = () => {
    setLastOrder(undefined);
  };

  return (
    <OrderContext.Provider
      value={{ updateStocks, lastOrder, clearOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
