import { Request, Response } from "express";
import locationService from "./location.service";

export class LocationController {
  /**
   * Get all locations
   */
  async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await locationService.findAll();
      res.status(200).json(locations);
    } catch (error) {
      console.error("Error getting locations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get a location by ID
   */
  async getLocationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const location = await locationService.findById(id);

      if (!location) {
        res.status(404).json({ message: "Location not found" });
        return;
      }

      res.status(200).json(location);
    } catch (error) {
      console.error("Error getting location:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create a new location
   */
  async createLocation(req: Request, res: Response): Promise<void> {
    try {
      const locationData = req.body;
      const location = await locationService.create(locationData);
      res.status(201).json(location);
    } catch (error) {
      console.error("Error creating location:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update a location
   */
  async updateLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const locationData = req.body;
      const location = await locationService.update(id, locationData);

      if (!location) {
        res.status(404).json({ message: "Location not found" });
        return;
      }

      res.status(200).json(location);
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a location
   */
  async deleteLocation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await locationService.delete(id);

      if (!success) {
        res.status(404).json({ message: "Location not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting location:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new LocationController();
