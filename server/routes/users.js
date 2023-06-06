import express from "express";
import { deleteUser, getUser, getUsers, updateUser, getUserBookings } from "../controllers/user_controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express();

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id" , verifyUser, deleteUser);

// GET ONE
router.get("/id=:id", verifyUser, getUser);

// GET ALL USER BOOKING
router.get("/all-bookings/:userid", verifyUser, getUserBookings);

// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;