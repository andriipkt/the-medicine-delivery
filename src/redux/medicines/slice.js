import { createSlice } from "@reduxjs/toolkit";
import { fetchMedicines } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const medicinesSlice = createSlice({
  name: "medicines",
  initialState: {
    medicines: [],
    isLoading: false,
    error: null,
    pharmacyType: "all",
    page: 1,
    filters: {
      priceFilter: "",
      dateFilter: "",
      nameFilter: "",
    },
  },

  reducers: {
    setPage: (state) => {
      state.page += 1;
    },

    resetPage: (state) => {
      state.page = 1;
    },

    setPharmacyType: (state, action) => {
      state.pharmacyType = action.payload;
    },

    resetMedicines: (state) => {
      state.medicines = [];
    },

    setFilters: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
      state.page = 1;
    },

    resetFilters: (state) => {
      state.filters.priceFilter = "";
      state.filters.dateFilter = "";
      state.filters.nameFilter = "";
      state.medicines = [];
      state.page = 1;
    },

    removeNonFavorites: (state, action) => {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, handlePending)
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.medicines = [...state.medicines, ...action.payload];
      })
      .addCase(fetchMedicines.rejected, handleRejected);
  },
});

export const {
  setPage,
  resetPage,
  setPharmacyType,
  resetMedicines,
  setFilters,
  resetFilters,
  removeNonFavorites,
} = medicinesSlice.actions;
export const medicinesReducer = medicinesSlice.reducer;
