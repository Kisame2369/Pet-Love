import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotices,
  fetchCategories,
  fetchSex,
  fetchSpecies,
  fetchNoticesById,
  addFavoriteNotice,
  removeFavoriteNotice
} from "./operations";

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    items: [],
    currentNotice: null,
    categories: [],
    sex: [],
    species: [],
    page: 1,
    perPage: 6,
    totalPages: 0,
    isLoading: false,
    isLoadingNotice: false,
    error: null,
  },
  reducers: {
    clearNotices: (state) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 0;
    },
    setNoticesPage: (state, action) => {
      state.page = action.payload;
    },
    clearCurrentNotice: (state) => {
      state.currentNotice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchNotices
      .addCase(fetchNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results || action.payload.data || [];
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchNoticesById
      .addCase(fetchNoticesById.pending, (state) => {
        state.isLoadingNotice = true;
        state.error = null;
      })
      .addCase(fetchNoticesById.fulfilled, (state, action) => {
        state.isLoadingNotice = false;
        state.currentNotice = action.payload;
      })
      .addCase(fetchNoticesById.rejected, (state, action) => {
        state.isLoadingNotice = false;
        state.error = action.payload;
      })
      
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchSex
      .addCase(fetchSex.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sex = action.payload;
      })
      .addCase(fetchSex.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // fetchSpecies
      .addCase(fetchSpecies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.species = action.payload;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // addFavoriteNotice
      .addCase(addFavoriteNotice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFavoriteNotice.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          notice => notice._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentNotice?._id === action.payload._id) {
          state.currentNotice = action.payload;
        }
      })
      .addCase(addFavoriteNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // removeFavoriteNotice
      .addCase(removeFavoriteNotice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFavoriteNotice.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          notice => notice._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentNotice?._id === action.payload._id) {
          state.currentNotice = action.payload;
        }
      })
      .addCase(removeFavoriteNotice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotices, setNoticesPage, clearCurrentNotice } = noticesSlice.actions;
export default noticesSlice.reducer;