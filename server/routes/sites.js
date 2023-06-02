import express from "express";
import { addFavoriteHotel, getAllFavoriteHotel, getOneFavoriteHotel, removeFavoriteHotel } from "../controllers/site_controller.js";
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


export default router;