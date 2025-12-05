import { Customer } from "@prisma/client";

// Tipe data untuk respon ke user (API Response)
export type CustomerResponse = {
    id: number;
    name: string;
    phone: string;
}

// Tipe data untuk input saat Create
export type CreateCustomerRequest = {
    name: string;
    phone: string;
}

// Tipe data untuk input saat Update
export type UpdateCustomerRequest = {
    id: number;
    name: string;
    phone: string;
}

// Fungsi helper untuk mengubah format data database ke format response
export function toCustomerResponse(customer: Customer): CustomerResponse {
    return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone
    }
}