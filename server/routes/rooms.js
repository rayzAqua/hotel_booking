import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from "../controllers/room_controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom)

// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// GET ONE
router.get("/id=:id", getRoom)

// GET ALL
router.get("/", getRooms)

export default router;