import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOrder = createAsyncThunk(
  "shoppingCart/sendOrder",
  async (body, { rejectWithValue }) => {
    try {
      await axios.post(`/api/orders`, body);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
