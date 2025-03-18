import request from "supertest";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import locationRoutes from "../modules/location/location.routes";
import storeRoutes from "../modules/stores/store.routes";
import warehouseRoutes from "../modules/warehouse/warehouse.routes";
import productRoutes from "../modules/products/product.routes";

// Mock modules
jest.mock("../modules/location/location.routes", () => express.Router());
jest.mock("../modules/stores/store.routes", () => express.Router());
jest.mock("../modules/warehouse/warehouse.routes", () => express.Router());
jest.mock("../modules/products/product.routes", () => express.Router());
jest.mock("../database/config", () => ({
  setupDatabase: jest.fn(),
}));

// Mock the route handling for each router
const mockRouteHandler = jest.fn((req, res) => {
  const path = req.path;
  const moduleName = path.split("/")[1] || "root"; // Extract module name from path

  res.status(200).json({
    message: `${req.method} request to ${moduleName} module`,
    path,
  });
});

// Apply mock implementation to each router
(locationRoutes as any).get = jest.fn((path, handler) => mockRouteHandler);
(locationRoutes as any).post = jest.fn((path, handler) => mockRouteHandler);
(locationRoutes as any).put = jest.fn((path, handler) => mockRouteHandler);
(locationRoutes as any).delete = jest.fn((path, handler) => mockRouteHandler);

(storeRoutes as any).get = jest.fn((path, handler) => mockRouteHandler);
(storeRoutes as any).post = jest.fn((path, handler) => mockRouteHandler);
(storeRoutes as any).put = jest.fn((path, handler) => mockRouteHandler);
(storeRoutes as any).delete = jest.fn((path, handler) => mockRouteHandler);

(warehouseRoutes as any).get = jest.fn((path, handler) => mockRouteHandler);
(warehouseRoutes as any).post = jest.fn((path, handler) => mockRouteHandler);
(warehouseRoutes as any).put = jest.fn((path, handler) => mockRouteHandler);
(warehouseRoutes as any).delete = jest.fn((path, handler) => mockRouteHandler);

(productRoutes as any).get = jest.fn((path, handler) => mockRouteHandler);
(productRoutes as any).post = jest.fn((path, handler) => mockRouteHandler);
(productRoutes as any).put = jest.fn((path, handler) => mockRouteHandler);
(productRoutes as any).delete = jest.fn((path, handler) => mockRouteHandler);

describe("App Integration", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();

    // Configure app
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev"));

    // Setup routes
    app.use("/api/locations", locationRoutes);
    app.use("/api/stores", storeRoutes);
    app.use("/api/warehouses", warehouseRoutes);
    app.use("/api/products", productRoutes);

    // Add error handling middleware
    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(err.statusCode || 500).json({
          message: err.message || "Internal Server Error",
          stack: "test-environment",
        });
      }
    );
  });

  describe("API Routes", () => {
    it("should properly route requests to locations module", async () => {
      const response = await request(app).get("/api/locations");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "GET request to locations module",
        path: "/",
      });
    });

    it("should properly route requests to stores module", async () => {
      const response = await request(app).get("/api/stores");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "GET request to stores module",
        path: "/",
      });
    });

    it("should properly route requests to warehouses module", async () => {
      const response = await request(app).get("/api/warehouses");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "GET request to warehouses module",
        path: "/",
      });
    });

    it("should properly route requests to products module", async () => {
      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "GET request to products module",
        path: "/",
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle errors with the global error handler", async () => {
      // Add route that throws an error
      app.get("/api/error", (req, res, next) => {
        const error: any = new Error("Test error");
        error.statusCode = 400;
        next(error);
      });

      const response = await request(app).get("/api/error");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Test error");
      expect(response.body).toHaveProperty("stack", "test-environment");
    });
  });
});
