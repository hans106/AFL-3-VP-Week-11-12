import { z, ZodType } from "zod";

export class CustomerValidation {

    static readonly CREATE: ZodType = z.object({
        // 1. Validasi Nama: Cuma boleh Huruf (a-z, A-Z) dan Spasi
        name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/, "Nama tidak boleh mengandung angka atau simbol"),
        
        // 2. Validasi HP: Cuma boleh Angka (0-9)
        phone: z.string().min(1).max(20).regex(/^[0-9]+$/, "Nomor telepon harus angka saja (tidak boleh huruf/simbol)")
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        // Sama, kita pasang regex juga di sini
        name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/, "Nama tidak boleh mengandung angka atau simbol").optional(),
        phone: z.string().min(1).max(20).regex(/^[0-9]+$/, "Nomor telepon harus angka saja").optional()
    });
}