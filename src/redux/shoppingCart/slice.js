import { createSlice } from "@reduxjs/toolkit";
import { sendOrder } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.cartItems.push(action.payload);
      state.totalPrice += action.payload.price;
    },

    removeOrder: (state, action) => {
      const removedItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      state.cartItems = state.cartItems.filter(
        (order) => order._id !== action.payload
      );
      state.totalPrice -= removedItem.price * removedItem.quantity;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item._id === id);
      if (itemIndex !== -1) {
        const diff =
          (quantity - state.cartItems[itemIndex].quantity) *
          state.cartItems[itemIndex].price;
        state.cartItems[itemIndex].quantity = quantity;
        state.totalPrice += diff;
      }
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, handlePending)
      .addCase(sendOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(sendOrder.rejected, handleRejected);
  },
});

export const {
  addOrder,
  removeOrder,
  resetCart,

  updateQuantity,
} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
