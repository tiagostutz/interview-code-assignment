import { Request, Response } from "express";
import warehouseService from "./warehouse.service";

export class WarehouseController {
  /**
   * Get all warehouses
   */
  async getAllWarehouses(req: Request, res: Response): Promise<void> {
    try {
      const warehouses = await warehouseService.findAll();
      res.status(200).json(warehouses);
    } catch (error) {
      console.error("Error getting warehouses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get a warehouse by ID
   */
  async getWarehouseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const warehouse = await warehouseService.findById(id);

      if (!warehouse) {
        res.status(404).json({ message: "Warehouse not found" });
        return;
      }

      res.status(200).json(warehouse);
    } catch (error) {
      console.error("Error getting warehouse by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create a new warehouse
   */
  async createWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const warehouseData = req.body;
      const warehouse = await warehouseService.create(warehouseData);
      res.status(201).json(warehouse);
    } catch (error) {
      console.error("Error creating warehouse:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update an existing warehouse
   */
  async updateWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const warehouseData = req.body;

      const warehouse = await warehouseService.update(id, warehouseData);

      if (!warehouse) {
        res.status(404).json({ message: "Warehouse not found" });
        return;
      }

      res.status(200).json(warehouse);
    } catch (error) {
      console.error("Error updating warehouse:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a warehouse
   */
  async deleteWarehouse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await warehouseService.delete(id);

      if (!success) {
        res.status(404).json({ message: "Warehouse not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const warehouseController = new WarehouseController();
export default warehouseController;
