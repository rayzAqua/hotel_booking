import express from "express";
import { login, register, verifyAccount } from "../controllers/auth_controller.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// VERIFIED ACCOUNT
router.get("/:id/verify/:token", verifyAccount);

export default router;