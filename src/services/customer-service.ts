import { prismaClient } from "../utils/database-util"; 
import { CreateCustomerRequest, CustomerResponse, toCustomerResponse, UpdateCustomerRequest } from "../models/customer-model";
import { CustomerValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";

export class CustomerService {

    // 1. Create New Customer
    static async create(request: CreateCustomerRequest): Promise<CustomerResponse> {
        // Cek dulu apakah data input sesuai aturan (validasi)
        const createRequest = Validation.validate(CustomerValidation.CREATE, request);

        // Simpan ke database
        const customer = await prismaClient.customer.create({
            data: createRequest
        });

        return toCustomerResponse(customer);
    }

    // 2. Display Customer Info (Get by ID)
    static async get(id: number): Promise<CustomerResponse> {
        const customer = await prismaClient.customer.findUnique({
            where: { id: id }
        });

        if (!customer) {
            throw new ResponseError(404, "Customer not found");
        }

        return toCustomerResponse(customer);
    }

    // 3. Update Customer Info
    static async update(request: UpdateCustomerRequest): Promise<CustomerResponse> {
        const updateRequest = Validation.validate(CustomerValidation.UPDATE, request);

        // Cek apakah customer ada di database
        const checkCustomer = await prismaClient.customer.count({
            where: { id: updateRequest.id }
        });

        if (checkCustomer === 0) {
            throw new ResponseError(404, "Customer not found");
        }

        // Update data
        const customer = await prismaClient.customer.update({
            where: { id: updateRequest.id },
            data: updateRequest
        });

        return toCustomerResponse(customer);
    }

    // 4. Delete Customer
    static async delete(id: number): Promise<CustomerResponse> {
        const checkCustomer = await prismaClient.customer.findUnique({
            where: { id: id }
        });

        if (!checkCustomer) {
            throw new ResponseError(404, "Customer not found");
        }

        const customer = await prismaClient.customer.delete({
            where: { id: id }
        });

        return toCustomerResponse(customer);
    }
}