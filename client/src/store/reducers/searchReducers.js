import { SET_SEARCH_KEYWORD } from "../actionTypes";

const initialeValue = { searchKeyword: "" };

const reducer = (state = initialeValue, action) => {
  switch (action.type) {
    case SET_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.payload.data };
    default:
      return state;
  }
};

export default reducer;
