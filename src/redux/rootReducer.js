import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./news/slice.js";
import friendsReducer from "./friends/slice.js";

const rootReducer = combineReducers({
  news: newsReducer,
  friends: friendsReducer,
});

export default rootReducer;