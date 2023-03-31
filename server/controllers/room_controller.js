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
        // Lưu id CỦA Room vừa tạo vào thuộc tính room của Hotel.
        try {
            // Truy vấn đến khách sạn cần thêm id của Room bằng id của khách sạn và gọi method push của mongoDB
            // để đẩy id Room vào thuộc tính mảng rooms.
            await Hotel.findByIdAndUpdate(
                hotelid,
                { $push: { rooms: savedRoom._id } },
            );
        } catch (err) {
            next(err);
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
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteRoom = async (req, res, next) => {

    const hotelid = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(
                hotelid,
                { $pull: { rooms: req.params.id } }
            );
        } catch (err) {
            next(err);
        }
        res.status(200).send("Delete room successful!");
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getRoom = async (req, res, next) => {

    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json(getRoom);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getRooms = async (req, res, next) => {

    try {
        const getRooms = await Room.find();
        res.status(200).json(getRooms);
    } catch (err) {
        next(err);
    }
};

// COUNT ROOM
export const countRoom = async (req, res, next) => {

    try {
        const roomQuantity = await Room.countDocuments();
        res.status(200).json({quantity: roomQuantity});
    } catch (err) {
        next(err);
    }
}
