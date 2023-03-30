import express from "express";
import { createBooking, deleteBooking, getBooking, getBookings } from "../controllers/book_controller.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:email", verifyUser, createBooking);

// DELETE
router.delete("/:email/:id", verifyUser, deleteBooking);

// GET ONE
router.get("/id=:id", verifyUser, getBooking);

// GET ALL
router.get("/", verifyUser, getBookings);


export default router;