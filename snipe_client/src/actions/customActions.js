import {SET_ISSUE_TO_BE_DISPLAYED,GET_ALL_ISSUES} from "./actionTypes";
import {fetchAllIssues} from "../apiCalls/api"
import axios from "axios";
export const setIssueById = (issueId,history) =>dispatch =>{
  axios.get(`http://localhost:9000/api/issues/getIssue/${issueId}`)
  .then(res=>{
    dispatch({
      type:SET_ISSUE_TO_BE_DISPLAYED,
      payload:res.data
    })
    history.push('/singleIssue')
  })
  .catch(err=>console.log(err))
}

export const getAllIssues = () => async dispatch => {
  const allIssues = await fetchAllIssues();
  dispatch({
    type:GET_ALL_ISSUES,
    payload:allIssues
  });
}