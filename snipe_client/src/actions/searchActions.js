import {SET_SEARCH_RESULT} from "./actionTypes";
export const setSearchResult = result => {
  return {
    type:SET_SEARCH_RESULT,
    payload:result
  }
}