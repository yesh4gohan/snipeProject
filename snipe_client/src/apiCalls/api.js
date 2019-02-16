import axios from "axios";
export const fetchAnswersById = id => {
  return axios
    .get(`http://localhost:9000/api/issues/getAnswer/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const getCurrentUserDetailsFromApi = id => {
  return axios
  .get(`http://localhost:9000/api/users/getCurrentUser/${id}`)
  .then(user=>{
    return user.data;
  })
  .catch(err=>console.log(err))
}

export const fetchAllIssues = () => {
  return axios
  .get("http://localhost:9000/api/issues/getIssues")
  .then(res=>{
    return res.data;
  })
  .catch(err => console.log(err));
}

export const fetchAllEmployees  = () => {
  return axios
  .get('http://localhost:9000/api/users/getAllEmployees')
  .then(res => {
    return res.data;
  })
  .catch(err=>console.log(err));
}
