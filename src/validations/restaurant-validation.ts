import { z, ZodType } from "zod";

export class RestaurantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        description: z.string().optional(),
        isOpen: z.boolean().optional()
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().optional(),
        isOpen: z.boolean().optional()
    });
}