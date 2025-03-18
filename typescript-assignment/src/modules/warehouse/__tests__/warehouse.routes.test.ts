import request from "supertest";
import express from "express";
import warehouseRoutes from "../warehouse.routes";
import warehouseController from "../warehouse.controller";

// Mock the warehouse controller
jest.mock("../warehouse.controller", () => ({
  getAllWarehouses: jest.fn(),
  getWarehouseById: jest.fn(),
  createWarehouse: jest.fn(),
  updateWarehouse: jest.fn(),
  deleteWarehouse: jest.fn(),
}));

describe("Warehouse Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/api/warehouses", warehouseRoutes);
  });

  describe("GET /api/warehouses", () => {
    it("should list all warehouses", async () => {
      // Arrange
      const mockWarehouses = [
        {
          id: "1",
          code: "MWH.001",
          name: "Main Warehouse 1",
          locationId: "1",
          capacity: 5000,
          isActive: true,
        },
        {
          id: "2",
          code: "MWH.012",
          name: "Main Warehouse 2",
          locationId: "2",
          capacity: 7500,
          isActive: true,
        },
        {
          id: "3",
          code: "MWH.023",
          name: "Main Warehouse 3",
          locationId: "3",
          capacity: 10000,
          isActive: true,
        },
      ];

      (warehouseController.getAllWarehouses as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json(mockWarehouses);
        }
      );

      // Act & Assert
      await request(app)
        .get("/api/warehouses")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(3);
          expect(res.body[0].code).toBe("MWH.001");
          expect(res.body[1].code).toBe("MWH.012");
          expect(res.body[2].code).toBe("MWH.023");
          expect(warehouseController.getAllWarehouses).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("DELETE /api/warehouses/:id (Archive)", () => {
    it("should archive a warehouse", async () => {
      // Arrange
      const warehouseId = "1";

      (warehouseController.deleteWarehouse as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;
          expect(id).toBe(warehouseId);
          res.status(204).send();
        }
      );

      // Act & Assert
      await request(app)
        .delete(`/api/warehouses/${warehouseId}`)
        .expect(204)
        .expect(() => {
          expect(warehouseController.deleteWarehouse).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("Warehouse archiving flow test", () => {
    it("should handle listing and archiving warehouses", async () => {
      // Setup mock warehouses
      const initialWarehouses = [
        {
          id: "1",
          code: "MWH.001",
          name: "ZWOLLE Warehouse",
          locationId: "1",
          location: { id: "1", name: "ZWOLLE-001" },
          capacity: 5000,
          isActive: true,
        },
        {
          id: "2",
          code: "MWH.012",
          name: "AMSTERDAM Warehouse",
          locationId: "2",
          location: { id: "2", name: "AMSTERDAM-001" },
          capacity: 7500,
          isActive: true,
        },
        {
          id: "3",
          code: "MWH.023",
          name: "TILBURG Warehouse",
          locationId: "3",
          location: { id: "3", name: "TILBURG-001" },
          capacity: 10000,
          isActive: true,
        },
      ];

      let currentWarehouses = [...initialWarehouses];

      // Mock GET all warehouses
      (warehouseController.getAllWarehouses as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json(currentWarehouses);
        }
      );

      // Mock DELETE (archive) warehouse
      (warehouseController.deleteWarehouse as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;

          // Remove the warehouse from our mock data
          currentWarehouses = currentWarehouses.filter((w) => w.id !== id);

          res.status(204).send();
        }
      );

      // 1. First get all warehouses
      await request(app)
        .get("/api/warehouses")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(3);
          expect(res.body).toEqual(initialWarehouses);
          expect(res.body[0].location.name).toBe("ZWOLLE-001");
          expect(res.body[1].location.name).toBe("AMSTERDAM-001");
          expect(res.body[2].location.name).toBe("TILBURG-001");
        });

      // 2. Archive ZWOLLE Warehouse (id: 1)
      await request(app).delete("/api/warehouses/1").expect(204);

      // 3. Get all warehouses again - ZWOLLE warehouse should be missing
      await request(app)
        .get("/api/warehouses")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(
            res.body.find(
              (w: { location: { name: string } }) =>
                w.location.name === "ZWOLLE-001"
            )
          ).toBeUndefined();
          expect(
            res.body.find(
              (w: { location: { name: string } }) =>
                w.location.name === "AMSTERDAM-001"
            )
          ).toBeDefined();
          expect(
            res.body.find(
              (w: { location: { name: string } }) =>
                w.location.name === "TILBURG-001"
            )
          ).toBeDefined();
        });
    });
  });
});
