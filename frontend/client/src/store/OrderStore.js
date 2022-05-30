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
}