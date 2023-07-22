import express from "express";
import { getUsers, Register, Login } from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users/register", Register);
router.post("/users/login", Login);

export default router;
