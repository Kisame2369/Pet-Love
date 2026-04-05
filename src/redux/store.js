import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./news/newsSlice";
import noticesReducer from "./notices/noticesSlice";
import friendsReducer from "./friends/friendsSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    notices: noticesReducer,
    friends: friendsReducer,
    auth: authReducer,
  },
});
