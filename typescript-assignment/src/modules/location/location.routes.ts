import express from "express";
import locationController from "./location.controller";

const router = express.Router();

// GET /api/locations
router.get("/", locationController.getAllLocations.bind(locationController));

// GET /api/locations/:id
router.get("/:id", locationController.getLocationById.bind(locationController));

// POST /api/locations
router.post("/", locationController.createLocation.bind(locationController));

// PUT /api/locations/:id
router.put("/:id", locationController.updateLocation.bind(locationController));

// DELETE /api/locations/:id
router.delete(
  "/:id",
  locationController.deleteLocation.bind(locationController)
);

export default router;
