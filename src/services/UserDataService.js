import axios from 'axios';
class UserDataService {
  getAll(page,itemPerPage) {
     return axios.get("/user?page="+page,{params:{'itemPerPage':itemPerPage}});
  }
  store(data) {
    return axios.post("/user/register", data);
  }
  edit(id) {
    return axios.get(`/user/${id}`);
  }
  update(id, data) {
    return axios.put(`/user/${id}`, data);
  }
}

export default new UserDataService();
