import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./news/slice.js";
import friendsReducer from "./friends/slice.js";
import noticesReducer from "./notices/slice.js";
import citiesReducer from "./cities/slice.js";

const rootReducer = combineReducers({
  news: newsReducer,
  friends: friendsReducer,
  notices: noticesReducer,
  cities: citiesReducer,
});

export default rootReducer;