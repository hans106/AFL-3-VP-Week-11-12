import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest } from "../models/order-model";
import { OrderService } from "../services/order-service";

export class OrderController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateOrderRequest = req.body as CreateOrderRequest;
            const response = await OrderService.create(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await OrderService.list();
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}