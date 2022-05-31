import {makeAutoObservable} from "mobx";
import OrderService from "../services/OrderService";

export default class OrderStore {

    constructor() {
        makeAutoObservable(this)
    }

    getOrderTypes() {
        return OrderService.getOrderTypes()
    }

    createNewOrder(code, title, priority, type, inVersion, description, worksUserId) {
        return OrderService.createNewOrder(code, title, priority, type, inVersion, description, worksUserId)
    }

    getAllOrders() {
        return OrderService.getAllOrders()
    }

    getUserOrders() {
        return OrderService.getUserOrders()
    }

    getCreatorOrders() {
        return OrderService.getCreatorOrders()
    }

    changeOrderStatus(orderId, status) {
        return OrderService.changeOrderStatus(orderId, status)
    }

    changeOrderByCreator(orderId, title, priority, inVersion, description, worksUserId) {
        return OrderService.changeOrderByCreator(orderId, title, priority, inVersion, description, worksUserId)
    }
}