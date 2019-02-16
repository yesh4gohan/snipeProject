import { GET_ALL_EMPLOYEES } from "../actions/actionTypes";

const initialState = {
  employees: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };

    default:
      return state;
  }
};
