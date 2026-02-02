import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/api.js";

export const fetchNotices = createAsyncThunk(
    'notices/fetchNotices',
    async (params = {}, thunkAPI) => {
        try {
            const {
                keyword,
                category,
                species,
                locationId,
                byDate = true,
                byPrice,
                byPopularity,
                page = 1,
                limit = 6,
                sex
            } = params;

            const queryParams = new URLSearchParams();
            
            if (keyword) queryParams.append("keyword", keyword);
            if (category) queryParams.append("category", category);
            if (species) queryParams.append("species", species);
            if (locationId) queryParams.append("locationId", locationId);
            if (sex) queryParams.append("sex", sex);
            
            queryParams.append("byDate", byDate);
            if (byPrice !== undefined) queryParams.append("byPrice", byPrice);
            if (byPopularity !== undefined) queryParams.append("byPopularity", byPopularity);
            
            queryParams.append("page", page);
            queryParams.append("limit", limit);
            
            const response = await axios.get(`/notices?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/notices/categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchSex = createAsyncThunk(
  'sex/fetchSex',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/notices/sex');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchSpecies = createAsyncThunk(
  'species/fetchSpecies',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/notices/species');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const fetchNoticesById = createAsyncThunk(
  'notices/fetchNoticesById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`/notices/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addFavoriteNotice = createAsyncThunk(
  'notices/addFavoriteNotice',
    async (id, thunkAPI) => {
        try {
            const response = await axios.post(`/notices/favorite/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeFavoriteNotice = createAsyncThunk(
  'notices/removeFavoriteNotice',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/notices/favorite/${id}`);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
