import locationService from "../location.service";
import Location from "../location.model";

// Mock the Location model
jest.mock("../location.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("LocationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all locations", async () => {
      // Arrange
      const mockLocations = [
        { id: "1", name: "ZWOLLE-001", isActive: true },
        { id: "2", name: "AMSTERDAM-001", isActive: true },
      ];
      (Location.findAll as jest.Mock).mockResolvedValue(mockLocations);

      // Act
      const result = await locationService.findAll();

      // Assert
      expect(result).toEqual(mockLocations);
      expect(Location.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findById", () => {
    it("should return location by id", async () => {
      // Arrange
      const mockLocation = { id: "1", name: "ZWOLLE-001", isActive: true };
      (Location.findByPk as jest.Mock).mockResolvedValue(mockLocation);

      // Act
      const result = await locationService.findById("1");

      // Assert
      expect(result).toEqual(mockLocation);
      expect(Location.findByPk).toHaveBeenCalledWith("1");
    });

    it("should return null if location not found", async () => {
      // Arrange
      (Location.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await locationService.findById("999");

      // Assert
      expect(result).toBeNull();
      expect(Location.findByPk).toHaveBeenCalledWith("999");
    });
  });

  describe("create", () => {
    it("should create a new location", async () => {
      // Arrange
      const locationData = { name: "UTRECHT-001", isActive: true };
      const createdLocation = { id: "3", ...locationData };
      (Location.create as jest.Mock).mockResolvedValue(createdLocation);

      // Act
      const result = await locationService.create(locationData);

      // Assert
      expect(result).toEqual(createdLocation);
      expect(Location.create).toHaveBeenCalledWith(locationData);
    });
  });

  describe("update", () => {
    it("should update an existing location", async () => {
      // Arrange
      const locationId = "1";
      const locationData = { name: "ZWOLLE-002", isActive: true };
      const existingLocation = {
        id: locationId,
        name: "ZWOLLE-001",
        isActive: true,
        update: jest.fn(),
      };
      const updatedLocation = { id: locationId, ...locationData };

      (Location.findByPk as jest.Mock).mockResolvedValue(existingLocation);
      existingLocation.update.mockResolvedValue(updatedLocation);

      // Act
      const result = await locationService.update(locationId, locationData);

      // Assert
      expect(result).toEqual(updatedLocation);
      expect(Location.findByPk).toHaveBeenCalledWith(locationId);
      expect(existingLocation.update).toHaveBeenCalledWith(locationData);
    });

    it("should return null if location to update not found", async () => {
      // Arrange
      const locationId = "999";
      const locationData = { name: "NONEXISTENT", isActive: true };

      (Location.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await locationService.update(locationId, locationData);

      // Assert
      expect(result).toBeNull();
      expect(Location.findByPk).toHaveBeenCalledWith(locationId);
    });
  });

  describe("delete", () => {
    it("should delete an existing location", async () => {
      // Arrange
      const locationId = "1";
      const existingLocation = {
        id: locationId,
        name: "ZWOLLE-001",
        isActive: true,
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      (Location.findByPk as jest.Mock).mockResolvedValue(existingLocation);

      // Act
      const result = await locationService.delete(locationId);

      // Assert
      expect(result).toBe(true);
      expect(Location.findByPk).toHaveBeenCalledWith(locationId);
      expect(existingLocation.destroy).toHaveBeenCalled();
    });

    it("should return false if location to delete not found", async () => {
      // Arrange
      const locationId = "999";

      (Location.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await locationService.delete(locationId);

      // Assert
      expect(result).toBe(false);
      expect(Location.findByPk).toHaveBeenCalledWith(locationId);
    });
  });
});
