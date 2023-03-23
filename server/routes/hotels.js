import express from "express";
import Hotel from "../models/Hotel.js";

const router = express();

//CREATE
router.post("/", async (req, res) => {
    
    // Tạo mới một đối tượng hotel
    const newHotel = new Hotel(req.body);
    
    try {
        // Lưu đối tượng đó vào db thông qua Hotel Model
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, // Truy vấn đến đối tượng có id đc gửi từ client
            { $set: req.body }, // Update đối tượng đó
            { new: true} // Truy vấn lại đối tượng vừa được update để phản hồi, nếu không có tham số này server sẽ gửi lại đối tượng cũ.
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE

//GET ONE

//GET ALL

export default router;