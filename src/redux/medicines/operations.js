import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://the-medicine-delivery-backend.onrender.com";

export const fetchMedicines = createAsyncThunk(
  "medicines/fetchMedicines",
  async (
    { page = 1, type = "", price = "", date = "", name = "" },
    { rejectWithValue }
  ) => {
    const queryString = type !== "all" ? type : "";
    const filters = `price=${price}&date=${date}&name=${name}`;

    try {
      const { data } = await axios.get(
        `/api/medicines?page=${page}&type=${queryString}&${filters}`
      );

      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
