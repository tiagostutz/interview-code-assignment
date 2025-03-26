import { Request, Response } from "express";
import productService from "./product.service";

export class ProductController {
  /**
   * Get all products
   */
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Get a product by ID
   */
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.findById(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Create a new product
   */
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body;
      const product = await productService.create(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Update an existing product
   */
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;

      const product = await productService.update(id, productData);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Delete a product
   */
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await productService.delete(id);

      if (!success) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const productController = new ProductController();
export default productController;
