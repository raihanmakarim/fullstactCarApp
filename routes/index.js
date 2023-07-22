import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users/register", Register);
router.post("/users/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
