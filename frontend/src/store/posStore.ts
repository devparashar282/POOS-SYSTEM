import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  gst: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  emailId: string;
  tableNumber: string;
  orderType: "Dine In" | "Take Away" | "Delivery";
  paymentMethod: "Cash" | "QR Code" | null;
}

interface POSState {
  cart: CartItem[];
  orderDetails: OrderDetails;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  grandTotal: number;
  setDiscount: (discount: number) => void;
}

export const usePOSStore = create<POSState>((set, get) => ({
  cart: [],
  orderDetails: {
    customerName: "",
    phoneNumber: "",
    emailId: "",
    tableNumber: "",
    orderType: "Dine In",
    paymentMethod: null
  },
  discount: 0,
  subtotal: 0,
  grandTotal: 0,

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...state.cart, { ...product, quantity: 1 }];
      }
      return calculateTotals(newCart, state.discount);
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter(item => item.id !== productId);
      return calculateTotals(newCart, state.discount);
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => {
      const newCart = state.cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      return calculateTotals(newCart, state.discount);
    });
  },

  updateOrderDetails: (details) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, ...details }
    }));
  },

  setDiscount: (discount) => {
    set((state) => calculateTotals(state.cart, discount));
  },

  clearCart: () => {
    set({
      cart: [],
      orderDetails: {
        customerName: "",
        phoneNumber: "",
        emailId: "",
        tableNumber: "",
        orderType: "Dine In",
        paymentMethod: null
      },
      discount: 0,
      subtotal: 0,
      grandTotal: 0
    });
  }
}));

function calculateTotals(cart: CartItem[], discount: number) {
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const grandTotal = subtotal - discount;

  return { cart, subtotal, discount, grandTotal };
}
