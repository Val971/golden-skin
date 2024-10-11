import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { CartItem, Order } from '../types';
import GlobalApi from '../_utils/GlobalApi';

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
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
  const [orders, setOrders] = useState<Order[]>(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  // Ajouter une commande
  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
    const newOrder = {
      username: order.name,
      userId: order.userId,
      email: order.email,
      phone: order.phone,
      address: order.address,
      totalOrderAmount: order.totalAmount,
      paymentId: order.id,
      products: order.products.map((item) => item.documentId),
    };
    GlobalApi.createOrder({ ...newOrder }).then(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
    updateStocks(order.products);
  };

  const updateStocks = (products: CartItem[]) => {
    products.map((item) => {
      const newStock = item.sizes.stock - item.quantity;
      GlobalApi.updateStock(item.sizes.documentId, newStock).then(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  // Effacer toutes les commandes
  const clearOrders = () => {
    setOrders([]);
  };
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
