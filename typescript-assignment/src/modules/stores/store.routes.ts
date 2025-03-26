import express from "express";
import storeController from "./store.controller";

const router = express.Router();

// GET /api/stores
router.get("/", storeController.getAllStores.bind(storeController));

// GET /api/stores/:id
router.get("/:id", storeController.getStoreById.bind(storeController));

// POST /api/stores
router.post("/", storeController.createStore.bind(storeController));

// PUT /api/stores/:id
router.put("/:id", storeController.updateStore.bind(storeController));

// DELETE /api/stores/:id
router.delete("/:id", storeController.deleteStore.bind(storeController));

export default router;
