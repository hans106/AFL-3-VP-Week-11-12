import express from "express";

// PERBAIKAN 1: Ganti strip (-) jadi underscore (_)
import { publicRouter } from "../routes/public_api"; 

// PERBAIKAN 2: Ganti nama file middleware (sesuai nama file abang 'errorMiddleware.ts')
import { errorMiddleware } from "../middlewares/errorMiddleware"; 

export const web = express();

web.use(express.json());

web.use(publicRouter);

web.use(errorMiddleware);