import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotices,
  fetchNoticeById,
  fetchCategories,
  fetchSpecies,
  fetchSex,
} from "./noticesOperations";

const initialState = {
  items: [],
  selectedNotice: null,
  categories: [],
  species: [],
  sex: [],
  page: 1,
  totalPages: 1,
  filters: {
    keyword: "",
    category: "",
    species: "",
    sex: "",
    locationId: "",
    byPopularity: undefined,
    byPrice: undefined,
  },
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
    },
    clearSelectedNotice: (state) => {
      state.selectedNotice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchNoticeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedNotice = action.payload;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sex = action.payload;
      });
  },
});

export const { setPage, setFilters, resetFilters, clearSelectedNotice } =
  noticesSlice.actions;
export default noticesSlice.reducer;
