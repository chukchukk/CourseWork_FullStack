import axios from "axios";

export const backendHost = "https://cw6dponomarevbackend.herokuapp.com"

const $api = axios.create({
    withCredentials: false,
    baseURL: backendHost
})

$api.interceptors.request.use((config) => {
    config.headers.AccessToken = localStorage.getItem("accesstoken")
    config.headers.RefreshToken = localStorage.getItem("refreshtoken")
    return config
})

$api.interceptors.response.use((response) => {
    if (response.headers.refreshtoken && response.headers.accesstoken) {
        localStorage.setItem("accesstoken", response.headers.accesstoken)
        localStorage.setItem("refreshtoken", response.headers.refreshtoken)
    }
    return response
})

export default $api;