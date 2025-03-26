import Product from "./product.model";

export class ProductService {
  /**
   * Find all products
   */
  async findAll(): Promise<Product[]> {
    return Product.findAll();
  }

  /**
   * Find a product by its ID
   */
  async findById(id: string): Promise<Product | null> {
    return Product.findByPk(id);
  }

  /**
   * Create a new product
   */
  async create(productData: any): Promise<Product> {
    return Product.create(productData);
  }

  /**
   * Update an existing product
   */
  async update(id: string, productData: any): Promise<Product | null> {
    const product = await this.findById(id);

    if (!product) {
      return null;
    }

    return product.update(productData);
  }

  /**
   * Delete a product
   */
  async delete(id: string): Promise<boolean> {
    const product = await this.findById(id);

    if (!product) {
      return false;
    }

    await product.destroy();
    return true;
  }
}

const productService = new ProductService();
export default productService;
