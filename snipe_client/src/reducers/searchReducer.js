import {SET_SEARCH_RESULT} from "../actions/actionTypes";

const initialState = {
  searchResult:[]
};

export default (state = initialState,action) => {
  switch(action.type){
    case SET_SEARCH_RESULT:
    return {
      ...state,
      searchResult:action.payload
    }
    default:
    return state;
  }
}