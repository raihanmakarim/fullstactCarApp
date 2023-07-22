import { Sequelize } from "sequelize";

const db = new Sequelize("fullstackCarApp", "postgres", "macknight21", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
