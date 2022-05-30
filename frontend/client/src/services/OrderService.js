import $api from "../configuration/AxiosConfig";

export default class OrderService {

    static getOrderTypes() {
        return $api.get("/orders/types")
    }

    static createNewOrder(projectCode, title, priority, type, inVersion, description, worksUserId) {
        return $api.post("/orders/createNew", {projectCode, title, priority, type, inVersion, description, worksUserId})
    }

    static getAllOrders() {
        return $api.get("/orders")
    }
}