import express from "express";
import { createBooking, deleteBooking, getBooking, getAllBookings } from "../controllers/book_controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:userid", verifyUser, createBooking);

// DELETE
router.delete("/:userid/:id", verifyUser, deleteBooking);

// GET ONE
router.get("/id=:id", verifyUser, getBooking);

// GET ALL BOOKING OF ALL USER
router.get("/", verifyAdmin, getAllBookings);


export default router;