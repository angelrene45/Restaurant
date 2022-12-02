import { createSlice } from '@reduxjs/toolkit';

const getTotalQuantityAndPrice = ({cart, discount}) => {
  let quantity = 0
  let subtotal = 0
  let grant_total = 0
  cart.forEach(item => {
    quantity += item.quantity
    subtotal += item.quantity * item.price
  })
  grant_total = subtotal - discount
  return [quantity, subtotal.toFixed(2), grant_total.toFixed(2)]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    discount: 0,
    grant_total: 0, 
    address: '',
    order_type: '',
    note: '',
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.food_id === action.payload.food_id && item.variant === action.payload.variant && item.unit === action.payload.unit);
      if (itemInCart) {
        itemInCart.quantity = itemInCart.quantity + action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
      // set quantity and subtotal
      [state.quantity, state.subtotal, state.grant_total] = getTotalQuantityAndPrice(state)
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.at(action.payload.index);
      item.quantity++;
      [state.quantity, state.subtotal, state.grant_total] = getTotalQuantityAndPrice(state)
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.at(action.payload.index);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
      [state.quantity, state.subtotal, state.grant_total] = getTotalQuantityAndPrice(state)
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item, index) => index !== action.payload.index);
      state.cart = removeItem;
      [state.quantity, state.subtotal, state.grant_total] = getTotalQuantityAndPrice(state)
    },
    addAddress: (state, action) => {
      state.address = action.payload.address;
    },
    addOrderType: (state, action) => {
      state.order_type = action.payload.order_type;
    },
    addOrderNote: (state, action) => {
      state.note = action.payload.note;
    },
    clearCart: (state, action) => {
      state.cart =  [];
      state.quantity =  0;
      state.subtotal =  0;
      state.tax =  0;
      state.discount =  0;
      state.grant_total = 0;
      state.address = '';
      state.order_type = '';
      state.note = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem, 
    addAddress,
    addOrderType,
    addOrderNote,
    clearCart,
} = cartSlice.actions