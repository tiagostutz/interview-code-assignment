import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config";

interface LocationAttributes {
  id: string;
  name: string;
  code: string;
  maxWarehouseCapacity: number;
  maxWarehouses: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LocationCreationAttributes extends Omit<LocationAttributes, "id"> {}

class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  public id!: string;
  public name!: string;
  public code!: string;
  public maxWarehouseCapacity!: number;
  public maxWarehouses!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Location.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    maxWarehouseCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
    },
    maxWarehouses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    sequelize,
    tableName: "locations",
  }
);

export default Location;
