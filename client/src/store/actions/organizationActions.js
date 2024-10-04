import { SET_USER_ORGNIZATION_DATA } from "../actionTypes/index";

export const setUserOrganization = (user) => ({
  type: SET_USER_ORGNIZATION_DATA,
  payload: {
    user,
  },
});
