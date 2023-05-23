import express from "express";
import { createBooking, deleteBooking, getBooking, getBookings } from "../controllers/book_controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:userid", verifyUser, createBooking);

// DELETE
router.delete("/:userid/:id", verifyUser, deleteBooking);

// GET ONE
router.get("/id=:id", verifyUser, getBooking);

// GET ALL
router.get("/", verifyAdmin, getBookings);


export default router;