import { SET_SEARCH_KEYWORD } from "../actionTypes";

export const setSearchKeyword = (data) => (
  {
  type: SET_SEARCH_KEYWORD,
  payload: {
    data,
  },
});
