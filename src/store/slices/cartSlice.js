import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage or use empty initial state
const loadCartFromStorage = () => {
  try {
    const cartState = localStorage.getItem('cart');
    return cartState ? JSON.parse(cartState) : { items: [], itemCount: 0 };
  } catch (error) {
    return { items: [], itemCount: 0 };
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      // If the item already exists and quantity is passed, update its quantity, otherwise increment by 1
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1; // Use provided quantity or default to 1
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 }); // Use provided quantity or default to 1
      }
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== itemIdToRemove);
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.id !== id);
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    setCart: (state, action) => {
      // Replace the cart state with the payload
      state.items = action.payload.items || [];
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer; 