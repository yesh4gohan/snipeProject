import { POST_ISSUE, GET_ERRORS } from "./actionTypes";
import axios from "axios";
export const postIssue = (payload, history) => dispatch =>{
  console.log(Object.keys(payload.Attachment).length)
  if (Object.keys(payload.Attachment).length) {
    const formData = new FormData();
    formData.append("attachment", payload.Attachment);
    const config = {
      headers: {
        "content-Type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:9000/api/issues/postImage", formData, config)
      .then(res => {
        payload.attachments = `/${res.data.path}`;
         dispatch(postCall(payload,history));
      })
      .catch(err=>console.log(err))
  }
  else{
    dispatch(postCall(payload,history));
  }
};

export const postCall = (payload,history) => dispatch => {
  return axios
    .post("http://localhost:9000/api/issues/postIssue", payload)
    .then(() => {
      history.push("/issuesList");
    })
    .catch(err => dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  )};