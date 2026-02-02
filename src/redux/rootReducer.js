import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./news/slice.js";
import friendsReducer from "./friends/slice.js";
import noticesReducer from "./notices/slice.js";

const rootReducer = combineReducers({
  news: newsReducer,
  friends: friendsReducer,
  notices: noticesReducer,
});

export default rootReducer;