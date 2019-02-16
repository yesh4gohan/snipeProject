import { GET_ERRORS,SET_CURRENT_USER, GET_CURRENT_USER,GET_ALL_EMPLOYEES} from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {getCurrentUserDetailsFromApi,fetchAllEmployees} from "../apiCalls/api";
export const registerNewUser = (user,history) => dispatch => {
  axios.post('http://localhost:9000/api/users/register',user)
  .then(res =>{
    history.push('/login')})
  .catch(error => {
    dispatch({
      type:GET_ERRORS,
      payload:error.response.data
    })
  })
};

export const loginUser = (loginData,history) => dispatch => {
  axios.post('http://localhost:9000/api/users/login',loginData)
  .then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken',token);
    setAuthToken(token);
    const decode = jwt_decode(token);
   
    dispatch(setCurrentUser(decode));
    if(decode.role ==="employee"){
      history.push('/employeeHomePage')
    }
    else{
      history.push('/adminHomePage')
    }
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

export const getAllEmployees = () =>async dispatch => {
  const token = localStorage.getItem('jwtToken');
  setAuthToken(token);
  const employees = await fetchAllEmployees();
  dispatch({
    type:GET_ALL_EMPLOYEES,
    payload:employees
  })

}
export const getCurrentUserDetails = (id) => {
  getCurrentUserDetailsFromApi(id)
  .then(user=>console.log(user))
  return {
    type:GET_CURRENT_USER
  }
}