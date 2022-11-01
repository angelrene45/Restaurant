import { createSlice } from '@reduxjs/toolkit';

const getTotalQuantityAndPrice = (cart) => {
  let quantity = 0
  let total = 0
  cart.forEach(item => {
    quantity += item.quantity
    total += item.quantity * item.price
  })
  return [quantity, total.toFixed(2)]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id && item.variant === action.payload.variant && item.unit === action.payload.unit);
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
      // set quantity and total
      [state.quantity, state.total] = getTotalQuantityAndPrice(state.cart)
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.at(action.payload.index);
      item.quantity++;
      [state.quantity, state.total] = getTotalQuantityAndPrice(state.cart)
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.at(action.payload.index);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
      [state.quantity, state.total] = getTotalQuantityAndPrice(state.cart)
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item, index) => index !== action.payload.index);
      state.cart = removeItem;
      [state.quantity, state.total] = getTotalQuantityAndPrice(state.cart)
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem, } = cartSlice.actions