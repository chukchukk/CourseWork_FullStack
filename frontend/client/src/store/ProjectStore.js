import {makeAutoObservable} from "mobx";
import ProjectService from "../services/ProjectService";

export default class ProjectStore {

    constructor() {
        makeAutoObservable(this)
    }

    getProjectTypes() {
        return ProjectService.getProjectTypes()
            .then(r => Promise.resolve(r))
            .catch(() => Promise.reject())
    }

    createProject(name, code, type, description) {
        return ProjectService.createProject(name, code, type, description)
    }

}