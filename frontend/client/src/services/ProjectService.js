import $api from "../configuration/AxiosConfig";

export default class ProjectService {

    static getProjectTypes() {
        return $api.get("/projects/types")
    }

    static createProject(name, code, type, description) {
        return $api.post("/projects/create", {name, code, type, description})
    }
}