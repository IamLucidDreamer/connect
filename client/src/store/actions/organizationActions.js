import { SET_USER_ORGNIZATION_DATA } from "../actionTypes/index";

export const setUserOrganization = (data) => {
  return {
    type: SET_USER_ORGNIZATION_DATA,
    payload: {
      organization: data,
    },
  };
}
