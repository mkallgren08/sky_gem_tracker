import axios from "axios";

export default {
  //Checks if user is in database and returns null or the user data
  getUser: function (id,field) {
    return axios.get(`/api/user/field/${id}/${field}`)
  },
  //If getUser returns null, createUser adds them to the database
  createUser: function(userData){
    let data={
      name: userData.nickname,
      username:userData.name,
      auth0_id:userData.sub
    }
    return axios.post(`/api/user`,data)
  },
  // creates a new Playthrough file
  createPlaythru: function(id,name){
    let data={
      user_id: id,
      playthru_name: name
    }
    return axios.post('/api/playthrus',data)
  },
  // get player Playthroughs
  getPlayerPlaythrus: function(id){
    return axios.get(`/api/playthrus/${id}`)
  },
  // Gets all books
  getExamples: function () {
    return axios.get("/api/examples");
  }
};
