import { combineReducers } from 'redux';
import userReducers from "./userReducers"
import appInAppReducers from "./appInAppReducers"

const createReducer = combineReducers({
    user: userReducers,
    appInApp: appInAppReducers
});

export default createReducer;