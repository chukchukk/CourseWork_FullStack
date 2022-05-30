import {makeAutoObservable} from "mobx";
import ProjectService from "../services/ProjectService";

export default class ProjectStore {

    currentProjectId = 0

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

    getOpenProjects() {
        return ProjectService.getOpenProjects()
    }

    getUserProject() {
        return ProjectService.getUserProjects()
    }

    getAvailableUsersForProject(projectId) {
        return ProjectService.getAvailableUsersForProject(projectId)
    }

    addNewUser(projectId, userId) {
        return ProjectService.addNewUser(projectId, userId)
    }

    deleteUserFromProject(projectId, userId) {
        return ProjectService.deleteUserFromProject(projectId, userId)
    }
}