import { Request, Response, NextFunction } from "express";
import { CreateRestaurantRequest, UpdateRestaurantRequest } from "../models/restaurant-model";
import { RestaurantService } from "../services/restaurants-service";

export class RestaurantController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateRestaurantRequest = req.body as CreateRestaurantRequest;
            const response = await RestaurantService.create(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const response = await RestaurantService.get(restaurantId);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {

            const request: UpdateRestaurantRequest = {
                ...req.body,
                id: Number(req.params.restaurantId)
            };

            const response = await RestaurantService.update(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);
            await RestaurantService.delete(restaurantId);
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await RestaurantService.getAll();
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}