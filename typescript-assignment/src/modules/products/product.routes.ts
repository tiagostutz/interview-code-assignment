import express from "express";
import productController from "./product.controller";

const router = express.Router();

// GET /api/products
router.get("/", productController.getAllProducts.bind(productController));

// GET /api/products/:id
router.get("/:id", productController.getProductById.bind(productController));

// POST /api/products
router.post("/", productController.createProduct.bind(productController));

// PUT /api/products/:id
router.put("/:id", productController.updateProduct.bind(productController));

// DELETE /api/products/:id
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;
