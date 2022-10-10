import axios from 'axios';
class TransactionDataService {
  getAll(page,itemPerPage,country,user,date) {
     return axios.get("/transactions?page="+page,{params:{
        'itemPerPage':itemPerPage,
        'country':country,
        'user':user,
        'date':date,
    }});
  }
}

export default new TransactionDataService();
