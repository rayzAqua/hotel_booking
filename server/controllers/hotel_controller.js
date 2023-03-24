import Hotel from "../models/Hotel.js";

//CREATE
export const createHotel = async (req, res, next) => {
    
    // Tạo mới một đối tượng newhotel từ mô hình Hotel với dữ liệu từ request
    const newHotel = new Hotel(req.body);
    
    try {
        // Lưu đối tượng đó vào db thông qua Hotel Model
        const savedHotel = await newHotel.save();
        // Nếu lưu thành công thì trả về data vừa được lưu
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
    
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, // Truy vấn đến đối tượng có id đc gửi từ client
            { $set: req.body }, // Update đối tượng đó với dữ liệu từ client
            { new: true} // Truy vấn lại đối tượng vừa được update để phản hồi, nếu không có tham số này server sẽ gửi lại đối tượng cũ.
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }   
};

// DELETE
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete hotel succesful!");
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getHotel = async (req, res, next) => {
    
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (err) {
        next(err);
    }
};

//GET ALL
export const getHotels = async (req, res, next) => {

    try {
        const getHotels = await Hotel.find();
        res.status(200).json(getHotels);
    } catch (err) {
        next(err);
    }
};