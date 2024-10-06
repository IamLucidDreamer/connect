
import { SET_USER, LOGOUT } from "../actionTypes/index";

const initialeValue = {}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload.user };
        case LOGOUT:
            localStorage.clear();
            window.location.href = "/login";
            return null
        default:
            return state;
    }
};

export default reducer;
