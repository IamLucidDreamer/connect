import { APP_IN_APP } from "../actionTypes";


export const setAppInApp = (data) => ({
    type: APP_IN_APP,
    payload: {
        data
    },
});
