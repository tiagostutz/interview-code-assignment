import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import Warehouse from "./warehouse.model";
import Product from "../products/product.model";
import Store from "../stores/store.model";

interface WarehouseProductStoreAttributes {
  id: string;
  warehouseId: string;
  productId: string;
  storeId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WarehouseProductStoreCreationAttributes
  extends Omit<WarehouseProductStoreAttributes, "id"> {}

class WarehouseProductStore
  extends Model<
    WarehouseProductStoreAttributes,
    WarehouseProductStoreCreationAttributes
  >
  implements WarehouseProductStoreAttributes
{
  public id!: string;
  public warehouseId!: string;
  public productId!: string;
  public storeId!: string;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WarehouseProductStore.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    warehouseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Warehouse,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Store,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "warehouse_product_store",
    indexes: [
      {
        unique: true,
        fields: ["warehouseId", "productId", "storeId"],
      },
    ],
  }
);

// Define associations
WarehouseProductStore.belongsTo(Warehouse, {
  foreignKey: "warehouseId",
  as: "warehouse",
});

WarehouseProductStore.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

WarehouseProductStore.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});

// Define reverse associations
Warehouse.hasMany(WarehouseProductStore, {
  foreignKey: "warehouseId",
  as: "warehouseProductStores",
});

Product.hasMany(WarehouseProductStore, {
  foreignKey: "productId",
  as: "warehouseProductStores",
});

Store.hasMany(WarehouseProductStore, {
  foreignKey: "storeId",
  as: "warehouseProductStores",
});

export default WarehouseProductStore;
