import axios from "axios";

class AuthDataService {

    token(data) {
        return axios.post("/auth/token",data);
    }

    logout(data){
        return axios.post("/logout",data);
    }
}

export default new AuthDataService();