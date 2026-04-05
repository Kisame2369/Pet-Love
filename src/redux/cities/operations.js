import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/api.js";

export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async ({ keyword }, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            if (keyword) params.append("keyword", keyword);
            
            const response = await axios.get(`/cities?${params.toString()}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllCities = createAsyncThunk(
    'cities/fetchAllCities',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`/cities/locations`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);