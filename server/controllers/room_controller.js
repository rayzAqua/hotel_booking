import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// CREATE
export const createRoom = async (req, res, next) => {

    // Lấy id của khách sạn được truyền từ request
    const hotelid = req.params.hotelid;
    // Tạo mới một đối tượng khách sạn dựa vào dữ liệu của request
    const newRoom = new Room(req.body);

    try {
        // Tiến hành lưu đối tượng Room mới vào mongoDB và dữ liệu trả về được lưu vào biến savedRoom
        const savedRoom = await newRoom.save();

        if (!savedRoom) {
            throw createError(400, "Save room failure!");
        }

        // Lưu id CỦA Room vừa tạo vào thuộc tính room của Hotel..
        const updateRoomToHotel = await Hotel.findByIdAndUpdate(
            hotelid,
            { $push: { rooms: savedRoom._id } },
        );
        
        if (!updateRoomToHotel) {
            throw createError(400, "Can't not save room to this hotel!");
        }

        // Nếu thành công thì gửi phản hồi về client: Gửi trạng thái 200 và dữ liệu của savedRoom dưới dạng json
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            throw createError(404, "Can't find this room!");
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            room._id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedRoom) {
            throw createError(400, "Update user failure!");
        }

        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelid = req.params.hotelid;

    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            throw createError(404, "Can't find this room!");
        }

        const deletedRoom = await Room.findByIdAndDelete(req.params.id);

        if (!deletedRoom) {
            throw createError(400, "Delete room failure!");
        }

        const removeHotelRoom = await Hotel.findByIdAndUpdate(
            hotelid,
            { $pull: { rooms: req.params.id } },
            { new: true }
        );

        if (!removeHotelRoom) {
            throw createError(400, "Can't not remove room from this hotel!");
        }

        res.status(200).json({
            success: true,
            message: "Delete room successfully!",
            deletedRoom: deletedRoom,
        });
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getRoom = async (req, res, next) => {

    try {
        const getRoom = await Room.findById(req.params.id);

        if (!getRoom) {
            throw createError(404, "Can't find data!");
        }

        res.status(200).json(getRoom);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getRooms = async (req, res, next) => {

    try {
        const getRooms = await Room.find();

        if (!getRooms) {
            throw createError(404, "Can't find data!");
        }

        res.status(200).json(getRooms);
    } catch (err) {
        next(err);
    }
};