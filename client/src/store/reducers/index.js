import { combineReducers } from "redux";
import userReducers from "./userReducers";
import appInAppReducers from "./appInAppReducers";
import searchReducers from "./searchReducers";

const createReducer = combineReducers({
  search: searchReducers,
  user: userReducers,
  appInApp: appInAppReducers,
});

export default createReducer;
