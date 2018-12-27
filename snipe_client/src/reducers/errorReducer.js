import { GET_ERRORS } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.payload) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
