import express from "express";
import { createBooking, getBooking, getAllBookings } from "../controllers/book_controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:userid", verifyUser, createBooking);

// GET ONE
router.get("/id=:id", verifyUser, getBooking);

// GET ALL BOOKING
router.get("/", verifyAdmin, getAllBookings);


export default router;