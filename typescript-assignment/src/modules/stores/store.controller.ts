import { Request, Response } from "express";
import storeService from "./store.service";

export class StoreController {
  /**
   * Get all stores
   */
  async getAllStores(req: Request, res: Response): Promise<void> {
    try {
      const stores = await storeService.findAll();
      res.status(200).json(stores);
    } catch (error) {
      console.error("Error getting stores:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get a store by ID
   */
  async getStoreById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const store = await storeService.findById(id);

      if (!store) {
        res.status(404).json({ message: "Store not found" });
        return;
      }

      res.status(200).json(store);
    } catch (error) {
      console.error("Error getting store by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create a new store
   */
  async createStore(req: Request, res: Response): Promise<void> {
    try {
      const storeData = req.body;
      const store = await storeService.create(storeData);
      res.status(201).json(store);
    } catch (error) {
      console.error("Error creating store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update an existing store
   */
  async updateStore(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const storeData = req.body;

      const store = await storeService.update(id, storeData);

      if (!store) {
        res.status(404).json({ message: "Store not found" });
        return;
      }

      res.status(200).json(store);
    } catch (error) {
      console.error("Error updating store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a store
   */
  async deleteStore(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await storeService.delete(id);

      if (!success) {
        res.status(404).json({ message: "Store not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting store:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const storeController = new StoreController();
export default storeController;
