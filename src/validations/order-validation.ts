import { z, ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        customerId: z.number().positive(),
        restaurantId: z.number().positive(),
        totalItems: z.number().min(1).positive()
    });
}