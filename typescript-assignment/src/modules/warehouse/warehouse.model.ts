import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import Location from "../location/location.model";

interface WarehouseAttributes {
  id: string;
  businessUnitCode: string;
  name: string;
  address: string;
  locationId: string;
  capacity: number;
  stock: number;
  isArchived: boolean;
  archivedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WarehouseCreationAttributes
  extends Omit<WarehouseAttributes, "id" | "isArchived" | "archivedAt"> {}

class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: string;
  public businessUnitCode!: string;
  public name!: string;
  public address!: string;
  public locationId!: string;
  public capacity!: number;
  public stock!: number;
  public isArchived!: boolean;
  public archivedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessUnitCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Location,
        key: "id",
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    archivedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "warehouses",
  }
);

// Define associations
Warehouse.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location",
});

export default Warehouse;
