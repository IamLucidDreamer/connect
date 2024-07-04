
import { SET_USER, LOGOUT } from "../actionTypes/index";

const initialeValue = {}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload.user };
        case LOGOUT:
            return null
        default:
            return state;
    }
};

export default reducer;
