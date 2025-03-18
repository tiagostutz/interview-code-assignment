import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "sqlite:./database.sqlite",
  {
    logging: false,
  }
);

// Function to setup database and test connection
export const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync models with database (create tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default sequelize;
