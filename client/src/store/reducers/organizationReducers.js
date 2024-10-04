
import { SET_USER_ORGNIZATION_DATA } from "../actionTypes/index";

const initialeValue = {}

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_ORGNIZATION_DATA:
            return { ...state, ...action.payload.organization };
        default:
            return state;
    }
};

export default reducer;
