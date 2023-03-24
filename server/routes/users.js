import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user_controller.js";

const router = express();

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET ONE
router.get("/:id", getUser);

// GET ALL
router.get("/", getUsers);

export default router;