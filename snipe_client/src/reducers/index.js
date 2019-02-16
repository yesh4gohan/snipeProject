import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";
import setIssueReducer from "./setIssueReducer";
import issuesReducer from "./issuesReducer";
import employeesReducer from "./employeesReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  searchResult: searchReducer,
  currentIssue:setIssueReducer,
  issues:issuesReducer,
  employees:employeesReducer
});
