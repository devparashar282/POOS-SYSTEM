import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './posStore';

export interface OrderRecord {
  id: string;
  customer: string;
  email: string;
  phone: string;
  amount: number;
  method: string;
  status: string;
  date: string;
  items: number;
  cartItems: CartItem[];
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spent: number;
  lastVisit: string;
}

interface AppState {
  orders: OrderRecord[];
  customers: CustomerRecord[];
  addCompletedOrder: (
    cart: CartItem[], 
    customerName: string, 
    phone: string, 
    email: string, 
    method: string, 
    total: number
  ) => string; // Returns the generated order ID
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      orders: [],
      customers: [],

      addCompletedOrder: (cart, customerName, phone, email, method, total) => {
        const orderId = `ORD-${1000 + get().orders.length + 1}`;
        const now = new Date();
        const dateStr = now.toLocaleString(); // e.g. "10/27/2023, 2:30:00 PM"
        
        const newOrder: OrderRecord = {
          id: orderId,
          customer: customerName || "Walk-in",
          email: email || "",
          phone: phone || "",
          amount: total,
          method: method || "Cash",
          status: "Completed",
          date: dateStr,
          items: cart.reduce((acc, item) => acc + item.quantity, 0),
          cartItems: cart,
        };

        set((state) => {
          const updatedOrders = [newOrder, ...state.orders];
          
          // Update or create customer
          let updatedCustomers = [...state.customers];
          if (customerName || phone || email) {
            // Try to find existing by phone or email, else by name
            const existingCustIndex = state.customers.findIndex(c => 
              (phone && c.phone === phone) || 
              (email && c.email === email) || 
              (c.name === customerName && customerName !== "")
            );

            if (existingCustIndex >= 0) {
              const cust = updatedCustomers[existingCustIndex];
              updatedCustomers[existingCustIndex] = {
                ...cust,
                orders: cust.orders + 1,
                spent: cust.spent + total,
                lastVisit: dateStr.split(',')[0],
              };
            } else {
              // New customer
              const newCust: CustomerRecord = {
                id: `CUST-${String(state.customers.length + 1).padStart(3, '0')}`,
                name: customerName || "Unknown",
                phone: phone || "-",
                email: email || "-",
                orders: 1,
                spent: total,
                lastVisit: dateStr.split(',')[0],
              };
              updatedCustomers = [newCust, ...updatedCustomers];
            }
          }

          return {
            orders: updatedOrders,
            customers: updatedCustomers,
          };
        });

        return orderId;
      }
    }),
    {
      name: 'owl-cafe-storage', // saves to local storage so it persists across refreshes!
    }
  )
);
