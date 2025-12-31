import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/api.js";

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({ keyword, page = 1, limit = 6 }, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            if (keyword) params.append("keyword", keyword);
            params.append("page", page);
            params.append("limit", limit);
            
            const response = await axios.get(`/news?${params.toString()}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);