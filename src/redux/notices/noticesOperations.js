import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://petlove.b.goit.study/api";

export const fetchNotices = createAsyncThunk(
  "notices/fetchAll",
  async (filters = {}, thunkAPI) => {
    try {
      const {
        page = 1,
        limit = 6,
        keyword = "",
        category = "",
        species = "",
        sex = "",
        locationId = "",
        byDate,
        byPrice,
        byPopularity,
      } = filters;

      const params = new URLSearchParams({ page, limit });
      if (keyword) params.append("keyword", keyword);
      if (category) params.append("category", category);
      if (species) params.append("species", species);
      if (sex) params.append("sex", sex);
      if (locationId) params.append("locationId", locationId);
      if (byDate !== undefined) params.append("byDate", byDate);
      if (byPrice !== undefined) params.append("byPrice", byPrice);
      if (byPopularity !== undefined)
        params.append("byPopularity", byPopularity);

      const response = await fetch(`${BASE_URL}/notices?${params}`);
      if (!response.ok) throw new Error("Failed to fetch notices");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchNoticeById = createAsyncThunk(
  "notices/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/notices/${id}`);
      if (!response.ok) throw new Error("Failed to fetch notice");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "notices/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/notices/categories`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchSpecies = createAsyncThunk(
  "notices/fetchSpecies",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/notices/species`);
      if (!response.ok) throw new Error("Failed to fetch species");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchSex = createAsyncThunk(
  "notices/fetchSex",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/notices/sex`);
      if (!response.ok) throw new Error("Failed to fetch sex");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
