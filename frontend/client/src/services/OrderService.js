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

    static getUserOrders() {
        return $api.get("/orders/byUser")
    }

    static changeOrderStatus(orderId, status) {
        return $api.post("/orders/changeOrderStatus", {orderId, status})
    }

    static changeOrderByCreator(orderId, title, priority, inVersion, description, worksUserId) {
        return $api.post("/orders/changeOrderByCreator", {orderId, title, priority, inVersion, description, worksUserId})
    }

    static getCreatorOrders() {
        return $api.get("/orders/byCreator")
    }
}