import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";


export default class UserStore {

    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    login(email, password) {
        return AuthService.login(email, password)
            .then((response) => {
                localStorage.setItem("accesstoken", response.headers.accesstoken)
                localStorage.setItem("refreshtoken", response.headers.refreshtoken)
                this.setAuth(true)
                return Promise.resolve(response)
            }).catch(() => {
                return Promise.reject()
            })
    }

    registration(fullName, email, telephoneNumber, password) {
        return AuthService.registration(fullName, email, telephoneNumber, password)
            .then(response => {
                return Promise.resolve(response)
            })
            .catch((err) => {
                return Promise.reject()
            })
    }

    logout() {
        localStorage.removeItem("accesstoken")
        localStorage.removeItem("refreshtoken")
        this.setAuth(false)
    }

}