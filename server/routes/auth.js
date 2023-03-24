import express from "express";
import { login, register } from "../controllers/auth_controller.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
// Khi đăng nhập thi gửi dữ liệu về server nên dùng phương thức post
router.post("/login", login);

export default router;