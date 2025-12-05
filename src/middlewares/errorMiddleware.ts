import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
    error: any, 
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // 1. Kalau Error-nya dari Zod (Validasi)
    if (error instanceof ZodError) {
        res.status(400).json({
            errors: error.issues.map(err => ({
                message: err.message,
                path: err.path,
                code: err.code
            }))
        });
    }
    // 2. Kalau Error-nya manual kita (ResponseError)
    else if (error instanceof ResponseError) {
        res.status(error.status).json({
            errors: error.message
        });
    }
    // 3. Kalau Error sistem lainnya
    else {
        res.status(500).json({
            errors: error.message
        });
    }
}