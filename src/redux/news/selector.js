export const selectNews = (state) => state.news.items;
export const selectNewsLoading = (state) => state.news.isLoading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsPage = (state) => state.news.page;
export const selectHasNextPage = (state) => state.news.page < state.news.totalPages;
export const selectNewsTotalPages = (state) => state.news.totalPages;