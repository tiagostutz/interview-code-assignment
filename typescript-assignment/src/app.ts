import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { setupDatabase } from "./database/config";
import locationRoutes from "./modules/location/location.routes";
import storeRoutes from "./modules/stores/store.routes";
import warehouseRoutes from "./modules/warehouse/warehouse.routes";
import productRoutes from "./modules/products/product.routes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Setup database connection
setupDatabase();

// Routes
app.use("/api/locations", locationRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/products", productRoutes);

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
