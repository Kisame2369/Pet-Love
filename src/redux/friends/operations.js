import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../API/api.js"

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/friends');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)


