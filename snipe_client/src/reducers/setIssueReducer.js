import {SET_ISSUE_TO_BE_DISPLAYED} from "../actions/actionTypes";

const initialState = {
  currentIssue:{}
}

export default (state = initialState,action) => {
  switch(action.type){
    case SET_ISSUE_TO_BE_DISPLAYED:
    return {
      ...state,
      currentIssue:action.payload
    }
    default: 
    return state
  }
}