import express from "express";
import warehouseController from "./warehouse.controller";

const router = express.Router();

// GET /api/warehouses
router.get("/", warehouseController.getAllWarehouses.bind(warehouseController));

// GET /api/warehouses/:id
router.get(
  "/:id",
  warehouseController.getWarehouseById.bind(warehouseController)
);

// POST /api/warehouses
router.post("/", warehouseController.createWarehouse.bind(warehouseController));

// PUT /api/warehouses/:id
router.put(
  "/:id",
  warehouseController.updateWarehouse.bind(warehouseController)
);

// DELETE /api/warehouses/:id
router.delete(
  "/:id",
  warehouseController.deleteWarehouse.bind(warehouseController)
);

export default router;
