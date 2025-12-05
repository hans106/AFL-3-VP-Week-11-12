import { Order } from "@prisma/client";

export type OrderResponse = {
    id: number;
    customerId: number;
    restaurantId: number;
    totalItems: number;
    eta: number;
    orderDate: Date;
}

export type CreateOrderRequest = {
    customerId: number;
    restaurantId: number;
    totalItems: number;
}

export function toOrderResponse(order: Order): OrderResponse {
    return {
        id: order.id,
        customerId: order.customerId,
        restaurantId: order.restaurantId,
        totalItems: order.totalItems,
        eta: order.eta,
        orderDate: order.orderDate
    }
}