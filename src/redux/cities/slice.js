import { createSlice } from "@reduxjs/toolkit";
import { fetchCities, fetchAllCities } from "./operations";

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCities: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCities
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchAllCities
      .addCase(fetchAllCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCities } = citiesSlice.actions;
export default citiesSlice.reducer;