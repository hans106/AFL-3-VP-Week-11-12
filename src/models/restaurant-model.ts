import { Restaurant } from "@prisma/client";

export type RestaurantResponse = {
    id: number;
    name: string;
    description: string | null;
    isOpen: boolean;
}

export type CreateRestaurantRequest = {
    name: string;
    description?: string;
    isOpen?: boolean;
}

export type UpdateRestaurantRequest = {
    id: number;
    name?: string;
    description?: string;
    isOpen?: boolean;
}

export function toRestaurantResponse(restaurant: Restaurant): RestaurantResponse {
    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        isOpen: restaurant.isOpen
    }
}