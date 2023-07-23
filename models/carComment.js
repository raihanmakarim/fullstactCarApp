import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;
import Users from "./user.js";
import Cars from "./car.js";

const CarComment = db.define(
  "car_comments",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    car_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "car_comments",
    timestamps: false,
  }
);

CarComment.belongsTo(Cars, {
  foreignKey: "car_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

CarComment.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

export default CarComment;
