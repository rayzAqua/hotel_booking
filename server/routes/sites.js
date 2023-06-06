import express from "express";
import { addFavoriteHotel, createEvent, deleteEvent, getAllFavoriteHotel, getEvent, getEvents, getOneFavoriteHotel, removeFavoriteHotel, updateEvent } from "../controllers/site_controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express();

// ADD FAVORITE HOTEL
router.put("/favorite/:userid/add/:hotelid", verifyUser, addFavoriteHotel);

// DELETE FAVORITE HOTEL
router.delete("/favorite/:userid/remove/:hotelid", verifyUser, removeFavoriteHotel);

// GET ONE FAVORITE HOTEL
router.get("/favorite/:userid/hotel/:hotelid", verifyUser, getOneFavoriteHotel);

// GET ALL FAVORITE HOTEL
router.get("/favorite/:userid/all-hotels/", verifyUser, getAllFavoriteHotel);

// CREATE EVENT
router.post("/event", verifyAdmin, createEvent);

// DELETE EVENT
router.delete("/event/:id", verifyAdmin, deleteEvent);

// UPDATE EVENT
router.put("/event/:id", verifyAdmin, updateEvent)

// GET ONE EVENT
router.get("/event/id=:id", getEvent);

// GET ALL EVENT
router.get("/event", getEvents);

export default router;