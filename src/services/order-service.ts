import { Order } from "@prisma/client"; // <-- INI YANG DITAMBAHKAN
import { prismaClient } from "../utils/database-util";
import { CreateOrderRequest, OrderResponse, toOrderResponse } from "../models/order-model";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";

export class OrderService {

    // 1. Create New Order (Hitung ETA)
    static async create(request: CreateOrderRequest): Promise<OrderResponse> {
        // Validasi input
        const createRequest = Validation.validate(OrderValidation.CREATE, request);

        // Cek Customer
        const customerCount = await prismaClient.customer.count({
            where: { id: createRequest.customerId }
        });
        if (customerCount === 0) throw new ResponseError(404, "Customer not found");

        // Cek Restaurant
        const restaurantCount = await prismaClient.restaurant.count({
            where: { id: createRequest.restaurantId }
        });
        if (restaurantCount === 0) throw new ResponseError(404, "Restaurant not found");
        // Rumus: (Total Items * 10) + 10
        const calculatedEta = (createRequest.totalItems * 10) + 10;

        // Simpan ke database
        const order = await prismaClient.order.create({
            data: {
                customerId: createRequest.customerId,
                restaurantId: createRequest.restaurantId,
                totalItems: createRequest.totalItems,
                eta: calculatedEta
            }
        });

        return toOrderResponse(order);
    }

    // 2. List All Orders (Untuk Testing)
    static async list(): Promise<Array<OrderResponse>> {
        const orders = await prismaClient.order.findMany();
        return orders.map((order: Order) => toOrderResponse(order));
    }
    
}