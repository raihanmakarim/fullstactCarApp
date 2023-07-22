import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
import Users from "./user.js";

const Cars = db.define(
  "cars",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    promotion_end_date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    mileage: {
      type: DataTypes.DECIMAL(10, 2),
    },
    car_picture: {
      type: DataTypes.STRING(255),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cars",
    timestamps: false,
  }
);

Cars.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

export default Cars;
