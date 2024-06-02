import { Order } from "../models";

class OrderService {
    async createOrder(data: any)  {
        return await Order.create(data)
    }
}

export const orderService = new OrderService()