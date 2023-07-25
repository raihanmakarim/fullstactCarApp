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
import FileUpload from "express-fileupload";
import CarComment from "./models/carComment.js";
import Cars from "./models/car.js";
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("db connected");
  await db.sync({ alter: true });
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", async (data) => {
    try {
      socket.to(data.room).emit("receive_message", data);

      const { user_id, message } = data;

      if (user_id != 0 || user_id != null) {
        await CarComment.create({
          car_id: data.room,
          user_id: user_id,
          text: message,
        });
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

cron.schedule("0 0 * * *", async () => {
  const cars = await Cars.findAll();

  const currentDate = new Date();
  for (const car of cars) {
    if (new Date(car.promotion_end_date) > currentDate) {
      await car.update({ promotion_status: true });
    }
  }

  console.log("Car promotion status updated.");
});

server.listen(3001);
