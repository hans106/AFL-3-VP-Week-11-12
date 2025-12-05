import express from "express";
import { CustomerController } from "../controllers/customer-controller";
import { RestaurantController } from "../controllers/restaurant-controller";
import { OrderController } from "../controllers/order-controller";

export const publicRouter = express.Router();

// CUSTOMER (CRUD)
publicRouter.post("/api/customers", CustomerController.create);
publicRouter.get("/api/customers/:customerId", CustomerController.get);
publicRouter.put("/api/customers/:customerId", CustomerController.update);
publicRouter.delete("/api/customers/:customerId", CustomerController.delete);
publicRouter.get('/api/customers', CustomerController.getAll);

// RESTAURANT (CRUD)
publicRouter.post("/api/restaurants", RestaurantController.create);
publicRouter.get("/api/restaurants/:restaurantId", RestaurantController.get);
publicRouter.put("/api/restaurants/:restaurantId", RestaurantController.update);
publicRouter.delete("/api/restaurants/:restaurantId", RestaurantController.delete);
publicRouter.get('/api/restaurants', RestaurantController.getAll);

// ORDER (Create & List)
publicRouter.post("/api/orders", OrderController.create); // Ini yang hitung ETA otomatis
publicRouter.get("/api/orders", OrderController.list);