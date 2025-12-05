import { Request, Response, NextFunction } from "express";
import { CreateCustomerRequest, UpdateCustomerRequest } from "../models/customer-model";
import { CustomerService } from "../services/customer-service";

export class CustomerController {

static async create(req: Request, res: Response, next: NextFunction) {
        try {
            // --- PASANG CCTV DISINI ---
            console.log("CEK BODY:", req.body); 
            console.log("Tipe Data:", typeof req.body);
            // --------------------------
            const request: CreateCustomerRequest = req.body as CreateCustomerRequest;
            const response = await CustomerService.create(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.get(customerId);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateCustomerRequest = req.body as UpdateCustomerRequest;
            request.id = Number(req.params.customerId); // Ambil ID dari URL

            const response = await CustomerService.update(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = Number(req.params.customerId);
            await CustomerService.delete(customerId);
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }
}