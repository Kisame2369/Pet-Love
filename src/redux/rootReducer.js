import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./news/slice.js";

const rootReducer = combineReducers({
  news: newsReducer,
});

export default rootReducer;