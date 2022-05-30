import $api from "../configuration/AxiosConfig";

export default class ProjectService {

    static getProjectTypes() {
        return $api.get("/projects/types")
    }

    static createProject(name, code, type, description) {
        return $api.post("/projects/create", {name, code, type, description})
    }

    static getOpenProjects() {
        return $api.get('/projects')
    }

    static getUserProjects() {
        return $api.get('/projects/currentUserProjects')
    }

    static getAvailableUsersForProject(projectId) {
        return $api.get('/projects/availableUsers', {params: {projectId: projectId}})
    }

    static addNewUser(projectId, userId) {
        return $api.post('/projects/addNewUser', {projectId, userId},{params: {projectId, userId}})
    }

    static deleteUserFromProject(projectId, userId) {
        return $api.post('/projects/deleteUser', {projectId, userId},{params: {projectId, userId}})
    }

}