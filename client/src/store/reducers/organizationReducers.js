
import { SET_USER_ORGNIZATION_DATA } from "../actionTypes/index";

const initialeValue = {
    organizationData: []
}

const reducer = (state = initialeValue, action) => {
    switch (action.type) {
        case SET_USER_ORGNIZATION_DATA:
            return { ...state, organizationData : [...action.payload.organization] };
        default:
            return state;
    }
};

export default reducer;
