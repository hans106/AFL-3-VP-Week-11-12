import express from "express";

import { publicRouter } from "../routes/public_api"; 
import { errorMiddleware } from "../middlewares/errorMiddleware"; 

export const web = express();
// untuk package generate emang gk ada generatenya di notemodules
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);