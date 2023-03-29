import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel_controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET ONE
router.get("/id=:id", getHotel);

// GET ALL
router.get("/", getHotels);

// COUNT BY
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;