import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";
import setIssueReducer from "./setIssueReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  searchResult: searchReducer,
  currentIssue:setIssueReducer
});
