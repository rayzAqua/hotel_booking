import express from "express";
import Hotel from "../models/Hotel.js";

const router = express();

//CREATE
router.post("/", async (req, res) => {
    
    // Tạo mới một đối tượng newhotel từ mô hình Hotel với dữ liệu từ request
    const newHotel = new Hotel(req.body);
    
    try {
        // Lưu đối tượng đó vào db thông qua Hotel Model
        const savedHotel = await newHotel.save();
        // Nếu lưu thành công thì trả về data vừa được lưu
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
router.delete("/:id", async (req, res) => {    
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete hotel succesful!");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {    
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", async (req, res) => {    
    try {
        const getHotels = await Hotel.find();
        res.status(200).json(getHotels);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;