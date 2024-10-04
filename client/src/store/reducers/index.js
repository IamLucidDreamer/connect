import { combineReducers } from "redux";
import userReducers from "./userReducers";
import appInAppReducers from "./appInAppReducers";
import searchReducers from "./searchReducers";
import organizationReducers from "./organizationReducers";

const createReducer = combineReducers({
  search: searchReducers,
  user: userReducers,
  organization: organizationReducers,
  appInApp: appInAppReducers,
});

export default createReducer;
