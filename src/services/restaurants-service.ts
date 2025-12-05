import { prismaClient } from "../utils/database-util";
import { CreateRestaurantRequest, RestaurantResponse, toRestaurantResponse, UpdateRestaurantRequest } from "../models/restaurant-model";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";

export class RestaurantService {

    // 1. Create Restaurant
    static async create(request: CreateRestaurantRequest): Promise<RestaurantResponse> {
        const createRequest = Validation.validate(RestaurantValidation.CREATE, request);

        const restaurant = await prismaClient.restaurant.create({
            data: createRequest
        });

        return toRestaurantResponse(restaurant);
    }

    // 2. Get Restaurant by ID
    static async get(id: number): Promise<RestaurantResponse> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: id }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return toRestaurantResponse(restaurant);
    }

    // 3. Update Restaurant
    static async update(request: UpdateRestaurantRequest): Promise<RestaurantResponse> {
        const updateRequest = Validation.validate(RestaurantValidation.UPDATE, request);

        const checkRestaurant = await prismaClient.restaurant.count({
            where: { id: updateRequest.id }
        });

        if (checkRestaurant === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const restaurant = await prismaClient.restaurant.update({
            where: { id: updateRequest.id },
            data: updateRequest
        });

        return toRestaurantResponse(restaurant);
    }

    // 4. Delete Restaurant
    static async delete(id: number): Promise<RestaurantResponse> {
        const checkRestaurant = await prismaClient.restaurant.findUnique({
            where: { id: id }
        });

        if (!checkRestaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const restaurant = await prismaClient.restaurant.delete({
            where: { id: id }
        });

        return toRestaurantResponse(restaurant);
    }
}