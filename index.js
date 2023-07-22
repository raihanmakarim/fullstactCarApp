import express from "express";
import http from "http";
import { Sequelize, DataTypes } from "sequelize";
import bodyParser from "body-parser";
import cron from "node-cron";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const db = new Sequelize("database", "username", "password", {
  dialect: "postgres",
});

const Car = db.define("car", {
  carName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  promotionEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isPromotionActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send("hello");
});

console.log("hello there you hey");

cron.schedule("0 0 * * *", async () => {
  const cars = await Car.findAll();

  const currentDate = new Date();

  for (const car of cars) {
    if (car.promotionEndDate <= currentDate) {
      await car.update({ isPromotionActive: false });
    }
  }

  console.log("Car promotion status updated.");
});

app.listen(3001);
