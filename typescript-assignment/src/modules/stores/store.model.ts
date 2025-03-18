import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";
import Location from "../location/location.model";

interface StoreAttributes {
  id: string;
  name: string;
  address: string;
  locationId: string;
  capacity: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StoreCreationAttributes extends Omit<StoreAttributes, "id"> {}

class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: string;
  public name!: string;
  public address!: string;
  public locationId!: string;
  public capacity!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Store.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
      defaultValue: 100,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "stores",
  }
);

// Define associations
Store.belongsTo(Location, {
  foreignKey: "locationId",
  as: "location",
});

export default Store;
