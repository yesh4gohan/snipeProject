import axios from "axios";
export const fetchAnswersById = id => {
  return axios
    .get(`http://localhost:9000/api/issues/getAnswer/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};
