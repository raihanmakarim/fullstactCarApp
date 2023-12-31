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
  findCarByUserId,
  getPromoCars,
} from "../controllers/CarController.js";

import {
  getCarComments,
  addCarComment,
  updateCarComment,
  deleteCarComment,
} from "../controllers/CarCommentsController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/register", Register);
router.post("/users/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.patch("/users/edit/:id", editProfile);

router.get("/cars", getCars);
router.get("/cars/promo", getPromoCars);

router.post("/cars/create", verifyToken, createCar);
router.patch("/cars/update/:id", verifyToken, updateCar);
router.get("/cars/:id", findCarById);
router.get("/cars/user/:id", verifyToken, findCarByUserId);
router.delete("/cars/delete/:id", verifyToken, deleteCar);

router.get("/cars/comments/:carId", getCarComments);
router.post("/cars/comments/add/:carId", addCarComment);
router.patch("/cars/comments/update/:commentId", updateCarComment);
router.delete("/cars/comments/delete/:commentId", deleteCarComment);

export default router;
