import { Request, Response } from "express";
import locationController from "../location.controller";
import locationService from "../location.service";

// Mock the location service
jest.mock("../location.service", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("LocationController", () => {
  // Setup mock request and response objects
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;
  let responseSend: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    responseJson = jest.fn().mockReturnThis();
    responseStatus = jest.fn().mockReturnThis();
    responseSend = jest.fn().mockReturnThis();

    mockRequest = {};
    mockResponse = {
      json: responseJson,
      status: responseStatus,
      send: responseSend,
    };
  });

  describe("getAllLocations", () => {
    it("should return all locations with status 200", async () => {
      // Arrange
      const mockLocations = [
        { id: "1", name: "ZWOLLE-001", isActive: true },
        { id: "2", name: "AMSTERDAM-001", isActive: true },
      ];
      (locationService.findAll as jest.Mock).mockResolvedValue(mockLocations);

      // Act
      await locationController.getAllLocations(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.findAll).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLocations);
    });

    it("should handle errors and return status 500", async () => {
      // Arrange
      const errorMessage = "Database error";
      (locationService.findAll as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      await locationController.getAllLocations(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.findAll).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getLocationById", () => {
    it("should return location by id with status 200", async () => {
      // Arrange
      const locationId = "1";
      const mockLocation = {
        id: locationId,
        name: "ZWOLLE-001",
        isActive: true,
      };

      mockRequest.params = { id: locationId };
      (locationService.findById as jest.Mock).mockResolvedValue(mockLocation);

      // Act
      await locationController.getLocationById(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.findById).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLocation);
    });

    it("should return 404 if location not found", async () => {
      // Arrange
      const locationId = "999";

      mockRequest.params = { id: locationId };
      (locationService.findById as jest.Mock).mockResolvedValue(null);

      // Act
      await locationController.getLocationById(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.findById).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Location not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      // Arrange
      const locationId = "1";
      const errorMessage = "Database error";

      mockRequest.params = { id: locationId };
      (locationService.findById as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      await locationController.getLocationById(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.findById).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("createLocation", () => {
    it("should create location and return status 201", async () => {
      // Arrange
      const locationData = { name: "UTRECHT-001", isActive: true };
      const createdLocation = { id: "3", ...locationData };

      mockRequest.body = locationData;
      (locationService.create as jest.Mock).mockResolvedValue(createdLocation);

      // Act
      await locationController.createLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.create).toHaveBeenCalledWith(locationData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdLocation);
    });

    it("should handle errors and return status 500", async () => {
      // Arrange
      const locationData = { name: "UTRECHT-001", isActive: true };
      const errorMessage = "Database error";

      mockRequest.body = locationData;
      (locationService.create as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      await locationController.createLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.create).toHaveBeenCalledWith(locationData);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("updateLocation", () => {
    it("should update location and return status 200", async () => {
      // Arrange
      const locationId = "1";
      const locationData = { name: "ZWOLLE-002", isActive: true };
      const updatedLocation = { id: locationId, ...locationData };

      mockRequest.params = { id: locationId };
      mockRequest.body = locationData;
      (locationService.update as jest.Mock).mockResolvedValue(updatedLocation);

      // Act
      await locationController.updateLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.update).toHaveBeenCalledWith(
        locationId,
        locationData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedLocation);
    });

    it("should return 404 if location to update not found", async () => {
      // Arrange
      const locationId = "999";
      const locationData = { name: "NONEXISTENT", isActive: true };

      mockRequest.params = { id: locationId };
      mockRequest.body = locationData;
      (locationService.update as jest.Mock).mockResolvedValue(null);

      // Act
      await locationController.updateLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.update).toHaveBeenCalledWith(
        locationId,
        locationData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Location not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      // Arrange
      const locationId = "1";
      const locationData = { name: "ZWOLLE-002", isActive: true };
      const errorMessage = "Database error";

      mockRequest.params = { id: locationId };
      mockRequest.body = locationData;
      (locationService.update as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      await locationController.updateLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.update).toHaveBeenCalledWith(
        locationId,
        locationData
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deleteLocation", () => {
    it("should delete location and return status 204", async () => {
      // Arrange
      const locationId = "1";

      mockRequest.params = { id: locationId };
      (locationService.delete as jest.Mock).mockResolvedValue(true);

      // Act
      await locationController.deleteLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.delete).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it("should return 404 if location to delete not found", async () => {
      // Arrange
      const locationId = "999";

      mockRequest.params = { id: locationId };
      (locationService.delete as jest.Mock).mockResolvedValue(false);

      // Act
      await locationController.deleteLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.delete).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Location not found",
      });
    });

    it("should handle errors and return status 500", async () => {
      // Arrange
      const locationId = "1";
      const errorMessage = "Database error";

      mockRequest.params = { id: locationId };
      (locationService.delete as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      // Act
      await locationController.deleteLocation(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(locationService.delete).toHaveBeenCalledWith(locationId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
