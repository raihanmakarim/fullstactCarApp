import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  editProfile,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  getCars,
  createCar,
  updateCar,
  findCarById,
  deleteCar,
} from "../controllers/CarController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/register", Register);
router.post("/users/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.patch("/users/edit/:id", editProfile);

router.get("/cars", getCars);
router.post("/cars/create", createCar);
router.patch("/cars/update/:id", updateCar);
router.get("/cars/:id", findCarById);
router.delete("/cars/delete/:id", deleteCar);

export default router;
