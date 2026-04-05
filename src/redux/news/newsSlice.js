import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsOperations";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = newsSlice.actions;
export default newsSlice.reducer;
