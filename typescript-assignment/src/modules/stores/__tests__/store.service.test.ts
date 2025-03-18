import storeService from "../store.service";
import Store from "../store.model";

// Mock the Store model
jest.mock("../store.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("StoreService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all stores", async () => {
      // Arrange
      const mockStores = [
        {
          id: "1",
          name: "Store A",
          address: "123 Main St",
          locationId: "1",
          capacity: 100,
          isActive: true,
        },
        {
          id: "2",
          name: "Store B",
          address: "456 Oak St",
          locationId: "2",
          capacity: 150,
          isActive: true,
        },
      ];
      (Store.findAll as jest.Mock).mockResolvedValue(mockStores);

      // Act
      const result = await storeService.findAll();

      // Assert
      expect(result).toEqual(mockStores);
      expect(Store.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findById", () => {
    it("should return store by id", async () => {
      // Arrange
      const mockStore = {
        id: "1",
        name: "Store A",
        address: "123 Main St",
        locationId: "1",
        capacity: 100,
        isActive: true,
      };
      (Store.findByPk as jest.Mock).mockResolvedValue(mockStore);

      // Act
      const result = await storeService.findById("1");

      // Assert
      expect(result).toEqual(mockStore);
      expect(Store.findByPk).toHaveBeenCalledWith("1");
    });

    it("should return null if store not found", async () => {
      // Arrange
      (Store.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await storeService.findById("999");

      // Assert
      expect(result).toBeNull();
      expect(Store.findByPk).toHaveBeenCalledWith("999");
    });
  });

  describe("create", () => {
    it("should create a new store", async () => {
      // Arrange
      const storeData = {
        name: "New Store",
        address: "789 Pine St",
        locationId: "3",
        capacity: 200,
        isActive: true,
      };
      const createdStore = { id: "3", ...storeData };
      (Store.create as jest.Mock).mockResolvedValue(createdStore);

      // Act
      const result = await storeService.create(storeData);

      // Assert
      expect(result).toEqual(createdStore);
      expect(Store.create).toHaveBeenCalledWith(storeData);
    });
  });

  describe("update", () => {
    it("should update an existing store", async () => {
      // Arrange
      const storeId = "1";
      const storeData = {
        name: "Updated Store",
        address: "123 Main St",
        locationId: "1",
        capacity: 120,
        isActive: true,
      };
      const existingStore = {
        id: storeId,
        name: "Store A",
        address: "123 Main St",
        locationId: "1",
        capacity: 100,
        isActive: true,
        update: jest.fn(),
      };
      const updatedStore = { id: storeId, ...storeData };

      (Store.findByPk as jest.Mock).mockResolvedValue(existingStore);
      existingStore.update.mockResolvedValue(updatedStore);

      // Act
      const result = await storeService.update(storeId, storeData);

      // Assert
      expect(result).toEqual(updatedStore);
      expect(Store.findByPk).toHaveBeenCalledWith(storeId);
      expect(existingStore.update).toHaveBeenCalledWith(storeData);
    });

    it("should return null if store to update not found", async () => {
      // Arrange
      const storeId = "999";
      const storeData = {
        name: "Nonexistent Store",
        address: "Nowhere St",
        locationId: "1",
        capacity: 100,
        isActive: true,
      };

      (Store.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await storeService.update(storeId, storeData);

      // Assert
      expect(result).toBeNull();
      expect(Store.findByPk).toHaveBeenCalledWith(storeId);
    });
  });

  describe("delete", () => {
    it("should delete an existing store", async () => {
      // Arrange
      const storeId = "1";
      const existingStore = {
        id: storeId,
        name: "Store A",
        address: "123 Main St",
        locationId: "1",
        capacity: 100,
        isActive: true,
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      (Store.findByPk as jest.Mock).mockResolvedValue(existingStore);

      // Act
      const result = await storeService.delete(storeId);

      // Assert
      expect(result).toBe(true);
      expect(Store.findByPk).toHaveBeenCalledWith(storeId);
      expect(existingStore.destroy).toHaveBeenCalled();
    });

    it("should return false if store to delete not found", async () => {
      // Arrange
      const storeId = "999";

      (Store.findByPk as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await storeService.delete(storeId);

      // Assert
      expect(result).toBe(false);
      expect(Store.findByPk).toHaveBeenCalledWith(storeId);
    });
  });
});
