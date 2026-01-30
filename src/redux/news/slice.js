import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";

const newsSlice = createSlice({
    name: "news",
    initialState: {
        items: [],
        page: 1,
        perPage: 6,
        totalPages: 0,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearNews: (state) => {
            state.items = [];
            state.page = 1;
            state.totalPages = 0;
        },
        setNewsPage: (state, action) => {
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
                const uniqueItems = action.payload.results.filter(
                    (item, index, self) =>
                        index === self.findIndex(i => i.id === item.id)
                );
                state.items = uniqueItems;
                state.page = action.payload.page;
                state.perPage = action.payload.perPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearNews, setNewsPage } = newsSlice.actions;
export default newsSlice.reducer;