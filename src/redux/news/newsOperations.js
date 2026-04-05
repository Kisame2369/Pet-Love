import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://petlove.b.goit.study/api";

export const fetchNews = createAsyncThunk(
  "news/fetchAll",
  async ({ page = 1, limit = 6, keyword = "" }, thunkAPI) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (keyword) params.append("keyword", keyword);

      const response = await fetch(`${BASE_URL}/news?${params}`);
      if (!response.ok) throw new Error("Failed to fetch news");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
