import axios from "axios";

export default {
  //Gets a test case
  getUser: function (id,field) {
    return axios.get(`/api/user/field/${id}/${field}`)
  },
  createUser: function(userData){
    let data={
      name: userData.nickname,
      username:userData.name,
      auth0_id:userData.sub
    }
    return axios.post(`/api/user`,data)
  },
  // Gets all books
  getExamples: function () {
    return axios.get("/api/examples");
  }
};
