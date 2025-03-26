import Warehouse from "./warehouse.model";

export class WarehouseService {
  /**
   * Find all warehouses
   */
  async findAll(): Promise<Warehouse[]> {
    return Warehouse.findAll();
  }

  /**
   * Find a warehouse by its ID
   */
  async findById(id: string): Promise<Warehouse | null> {
    return Warehouse.findByPk(id);
  }

  /**
   * Create a new warehouse
   */
  async create(warehouseData: any): Promise<Warehouse> {
    return Warehouse.create(warehouseData);
  }

  /**
   * Update an existing warehouse
   */
  async update(id: string, warehouseData: any): Promise<Warehouse | null> {
    const warehouse = await this.findById(id);

    if (!warehouse) {
      return null;
    }

    return warehouse.update(warehouseData);
  }

  /**
   * Delete a warehouse
   */
  async delete(id: string): Promise<boolean> {
    const warehouse = await this.findById(id);

    if (!warehouse) {
      return false;
    }

    await warehouse.destroy();
    return true;
  }
}

const warehouseService = new WarehouseService();
export default warehouseService;
