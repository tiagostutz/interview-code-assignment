import request from "supertest";
import express from "express";
import productRoutes from "../product.routes";
import productController from "../product.controller";

// Mock the product controller
jest.mock("../product.controller", () => ({
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

describe("Product Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/api/products", productRoutes);
  });

  describe("GET /api/products", () => {
    it("should return all products", async () => {
      // Arrange
      const mockProducts = [
        {
          id: "1",
          name: "TONSTAD",
          description: "Shelf unit",
          price: 149.99,
          isActive: true,
        },
        {
          id: "2",
          name: "KALLAX",
          description: "Shelf unit",
          price: 79.99,
          isActive: true,
        },
        {
          id: "3",
          name: "BESTÅ",
          description: "TV unit",
          price: 199.99,
          isActive: true,
        },
      ];

      (productController.getAllProducts as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json(mockProducts);
        }
      );

      // Act & Assert
      await request(app)
        .get("/api/products")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(3);
          expect(res.body[0].name).toBe("TONSTAD");
          expect(res.body[1].name).toBe("KALLAX");
          expect(res.body[2].name).toBe("BESTÅ");
          expect(productController.getAllProducts).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      // Arrange
      const productId = "1";

      (productController.deleteProduct as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;
          expect(id).toBe(productId);
          res.status(204).send();
        }
      );

      // Act & Assert
      await request(app)
        .delete(`/api/products/${productId}`)
        .expect(204)
        .expect(() => {
          expect(productController.deleteProduct).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Full CRUD flow test", () => {
    it("should handle full CRUD operations for products", async () => {
      // Setup mock products
      const initialProducts = [
        {
          id: "1",
          name: "TONSTAD",
          description: "Shelf unit",
          price: 149.99,
          isActive: true,
        },
        {
          id: "2",
          name: "KALLAX",
          description: "Shelf unit",
          price: 79.99,
          isActive: true,
        },
        {
          id: "3",
          name: "BESTÅ",
          description: "TV unit",
          price: 199.99,
          isActive: true,
        },
      ];

      let currentProducts = [...initialProducts];

      // Mock GET all products
      (productController.getAllProducts as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json(currentProducts);
        }
      );

      // Mock DELETE product
      (productController.deleteProduct as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;

          // Remove the product from our mock data
          currentProducts = currentProducts.filter((p) => p.id !== id);

          res.status(204).send();
        }
      );

      // 1. First get all products
      await request(app)
        .get("/api/products")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(3);
          expect(res.body).toEqual(initialProducts);
        });

      // 2. Delete TONSTAD (id: 1)
      await request(app).delete("/api/products/1").expect(204);

      // 3. Get all products again - TONSTAD should be missing
      await request(app)
        .get("/api/products")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(
            res.body.find((p: { name: string }) => p.name === "TONSTAD")
          ).toBeUndefined();
          expect(
            res.body.find((p: { name: string }) => p.name === "KALLAX")
          ).toBeDefined();
          expect(
            res.body.find((p: { name: string }) => p.name === "BESTÅ")
          ).toBeDefined();
        });
    });
  });
});
