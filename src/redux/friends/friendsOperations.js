import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://petlove.b.goit.study/api";

export const fetchFriends = createAsyncThunk(
  "friends/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/friends`);
      if (!response.ok) throw new Error("Failed to fetch friends");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
