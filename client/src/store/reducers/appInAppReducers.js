import { APP_IN_APP } from "../actionTypes";


const initialeValue = { appInApp: false }

const reducer = (state =  initialeValue , action) => {
    switch (action.type) {
        case APP_IN_APP:
            return { ...state, appInApp : action.payload.data };
        default:
            return state;
    }
};

export default reducer;
