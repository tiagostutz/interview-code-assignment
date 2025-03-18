import Store from "./store.model";

export class StoreService {
  /**
   * Find all stores
   */
  async findAll(): Promise<Store[]> {
    return Store.findAll();
  }

  /**
   * Find a store by its ID
   */
  async findById(id: string): Promise<Store | null> {
    return Store.findByPk(id);
  }

  /**
   * Create a new store
   */
  async create(storeData: any): Promise<Store> {
    return Store.create(storeData);
  }

  /**
   * Update an existing store
   */
  async update(id: string, storeData: any): Promise<Store | null> {
    const store = await this.findById(id);

    if (!store) {
      return null;
    }

    return store.update(storeData);
  }

  /**
   * Delete a store
   */
  async delete(id: string): Promise<boolean> {
    const store = await this.findById(id);

    if (!store) {
      return false;
    }

    await store.destroy();
    return true;
  }
}

const storeService = new StoreService();
export default storeService;
