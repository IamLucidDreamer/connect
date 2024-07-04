import {
    SET_USER, LOGOUT
} from '../actionTypes/index';

export const setUser = (user) => ({
    type: SET_USER,
    payload: {
        user,
    },
});

export const logout = (user) => ({
    type: LOGOUT,
});