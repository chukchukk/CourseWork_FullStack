import $api from "../configuration/AxiosConfig";

export default class UserService {

    static getUserInfo() {
        return $api.get("/clients/currentUserInfo")
    }

}