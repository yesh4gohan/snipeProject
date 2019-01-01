import { GET_ERRORS,SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
export const registerNewUser = (user,history) => dispatch => {
  axios.post('/api/users/register',user)
  .then(res =>{
    history.push('/login')})
  .catch(error => {
    console.log(error)
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data
    })
  })
};

export const loginUser = loginData => dispatch => {
  axios.post('/api/users/login',loginData)
  .then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken',token);
    setAuthToken(token);
    const decode = jwt_decode(token);
    dispatch(setCurrentUser(decode));

  })
  .catch(error=>{
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data
    })
  })
}

export const setCurrentUser = decodedUser => {
  return {
    type:SET_CURRENT_USER,
    payload:decodedUser
  }
}

export const logoutUser = () =>dispatch=> {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}