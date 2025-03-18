import request from "supertest";
import express from "express";
import locationRoutes from "../location.routes";
import locationController from "../location.controller";

// Mock the location controller
jest.mock("../location.controller", () => ({
  getAllLocations: jest.fn(),
  getLocationById: jest.fn(),
  createLocation: jest.fn(),
  updateLocation: jest.fn(),
  deleteLocation: jest.fn(),
}));

describe("Location Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/api/locations", locationRoutes);
  });

  describe("GET /api/locations", () => {
    it("should call getAllLocations controller method", async () => {
      // Arrange
      (locationController.getAllLocations as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(200).json([
            { id: "1", name: "ZWOLLE-001", isActive: true },
            { id: "2", name: "AMSTERDAM-001", isActive: true },
          ]);
        }
      );

      // Act & Assert
      await request(app)
        .get("/api/locations")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(res.body[0].name).toBe("ZWOLLE-001");
          expect(res.body[1].name).toBe("AMSTERDAM-001");
          expect(locationController.getAllLocations).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("GET /api/locations/:id", () => {
    it("should call getLocationById controller method", async () => {
      // Arrange
      const locationId = "1";
      (locationController.getLocationById as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;
          expect(id).toBe(locationId);
          res.status(200).json({ id, name: "ZWOLLE-001", isActive: true });
        }
      );

      // Act & Assert
      await request(app)
        .get(`/api/locations/${locationId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(locationId);
          expect(res.body.name).toBe("ZWOLLE-001");
          expect(locationController.getLocationById).toHaveBeenCalledTimes(1);
        });
    });

    it("should handle 404 response", async () => {
      // Arrange
      const locationId = "999";
      (locationController.getLocationById as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(404).json({ message: "Location not found" });
        }
      );

      // Act & Assert
      await request(app)
        .get(`/api/locations/${locationId}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe("Location not found");
          expect(locationController.getLocationById).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("POST /api/locations", () => {
    it("should call createLocation controller method", async () => {
      // Arrange
      const newLocation = { name: "UTRECHT-001", isActive: true };
      const createdLocation = { id: "3", ...newLocation };

      (locationController.createLocation as jest.Mock).mockImplementation(
        (req, res) => {
          expect(req.body).toEqual(newLocation);
          res.status(201).json(createdLocation);
        }
      );

      // Act & Assert
      await request(app)
        .post("/api/locations")
        .send(newLocation)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBe("3");
          expect(res.body.name).toBe(newLocation.name);
          expect(locationController.createLocation).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("PUT /api/locations/:id", () => {
    it("should call updateLocation controller method", async () => {
      // Arrange
      const locationId = "1";
      const locationUpdate = { name: "ZWOLLE-002", isActive: true };
      const updatedLocation = { id: locationId, ...locationUpdate };

      (locationController.updateLocation as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;
          expect(id).toBe(locationId);
          expect(req.body).toEqual(locationUpdate);
          res.status(200).json(updatedLocation);
        }
      );

      // Act & Assert
      await request(app)
        .put(`/api/locations/${locationId}`)
        .send(locationUpdate)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(locationId);
          expect(res.body.name).toBe(locationUpdate.name);
          expect(locationController.updateLocation).toHaveBeenCalledTimes(1);
        });
    });

    it("should handle 404 response", async () => {
      // Arrange
      const locationId = "999";
      const locationUpdate = { name: "NONEXISTENT", isActive: true };

      (locationController.updateLocation as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(404).json({ message: "Location not found" });
        }
      );

      // Act & Assert
      await request(app)
        .put(`/api/locations/${locationId}`)
        .send(locationUpdate)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe("Location not found");
          expect(locationController.updateLocation).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("DELETE /api/locations/:id", () => {
    it("should call deleteLocation controller method", async () => {
      // Arrange
      const locationId = "1";

      (locationController.deleteLocation as jest.Mock).mockImplementation(
        (req, res) => {
          const { id } = req.params;
          expect(id).toBe(locationId);
          res.status(204).send();
        }
      );

      // Act & Assert
      await request(app)
        .delete(`/api/locations/${locationId}`)
        .expect(204)
        .expect(() => {
          expect(locationController.deleteLocation).toHaveBeenCalledTimes(1);
        });
    });

    it("should handle 404 response", async () => {
      // Arrange
      const locationId = "999";

      (locationController.deleteLocation as jest.Mock).mockImplementation(
        (req, res) => {
          res.status(404).json({ message: "Location not found" });
        }
      );

      // Act & Assert
      await request(app)
        .delete(`/api/locations/${locationId}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe("Location not found");
          expect(locationController.deleteLocation).toHaveBeenCalledTimes(1);
        });
    });
  });
});
