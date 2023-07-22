import dotenv from "dotenv";
import express from "express";
import http from "http";
import { DataTypes } from "sequelize";
import cron from "node-cron";
import { Server } from "socket.io";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("db connected");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: " http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send("hello");
});

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
