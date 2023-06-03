import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

// CREATE BOOKING
export const createBooking = async (req, res, next) => {
    const userId = req.params.userid;
    const bookingHotel = req.body.hotel;
    const bookingRooms = req.body.rooms;
    const bookingStartDate = req.body.startDate;
    const bookingEndDate = req.body.endDate;

    try {
        // Xử lý kiểm tra số lượng phòng còn lại trước khi thực hiện booking. Tìm kiếm các phòng được phép đặt, nếu có phòng nào không
        // được phép đặt thì báo lỗi, nếu hợp lệ thì trả về mảng phòng hợp lệ.
        const validRooms = await Promise.all(
            bookingRooms.map(async (bookingRoom) => {
                // Truy vấn đến đối tượng phòng trong đơn booking để kiểm tra số lượng phòng.
                const room = await Room.findById(bookingRoom.room);
                // Kiểm tra xem có truy vấn được dữ liệu không.
                if (!room) {
                    throw createError(404, "Can't find data!");
                }
                // Kiểm tra số lượng phòng trong đơn đặt với số lượng phòng còn lại của loại phòng được đặt.
                // Nếu nhỏ hơn hoặc bằng số lượng phòng còn lại thì lưu vào mảng phòng được phép đặt.
                if (bookingRoom.quantity > room.quantity) {
                    throw createError(400, "The number of booked rooms exceeds the remaining available rooms.");
                }
                return {
                    room: bookingRoom.room,
                    quantity: bookingRoom.quantity,
                }
            })
        );

        const filteredValidRooms = validRooms.filter(room => room !== null);

        if (filteredValidRooms.length > 0) {
            const newBooking = new Booking({
                hotel: bookingHotel,
                rooms: filteredValidRooms,
                startDate: bookingStartDate,
                endDate: bookingEndDate,
            });

            // Tạo một đơn đặt mới.
            const savedBooking = await newBooking.save();

            // Sau khi tạo mới, lưu booking đó vào User bằng cách lưu id của booking vào trường bookings của User.
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { bookings: savedBooking._id } }
            );

            // Cập nhật lại số lượng phòng của các phòng được đặt.
            await Promise.all(
                filteredValidRooms.map(async (filteredValidRoom) => {
                    const room = await Room.findById(filteredValidRoom.room);
                    const newQuantity = room.quantity - filteredValidRoom.quantity;
                    await Room.findOneAndUpdate(
                        { _id: filteredValidRoom.room },
                        { $set: { quantity: newQuantity } }
                    );
                })
            );

            // OUTPUT
            res.status(200).json({
                success: true,
                message: "Booking successfully!",
                data: savedBooking,
            });
        }
    } catch (err) {
        next(err);
    }
};

// GET ONE BOOKING
export const getBooking = async (req, res, next) => {
    try {
        // Truy vấn đến đối tượng booking có khoá = id trong mongoDB.
        const booking = await Booking.findById(req.params.id)
            .populate({
                path: "hotel",
                select: ["name", "type", "city", "photos"]
            })
            .populate({
                path: "rooms.room",
                select: ["name", "type", "quantity"]
            });;

        // Bắt lỗi không tìm thấy dữ liệu.
        // Nếu không tìm thấy dữ liệu thì ném lỗi ra để khối try catch bắt và dừng thực thi hàm này.
        if (!booking) {
            throw createError(404, "Can't find booking data!");
        }

        // Trích xuất và định dạng lại thuộc tính của booked room.
        const roomBookeds = booking.rooms.map((roomBooked) => {
            return {
                name: roomBooked.room.name,
                type: roomBooked.room.type,
                quantity: roomBooked.quantity,
            };
        });

        // Trích xuất hai trường hotel và rooms để tạo mới output json
        const { _id, hotel, rooms, ...otherDetails } = booking._doc;

        // Tạo mới một đối tượng json từ các thuộc tính đã được trích xuất ở phía trên.
        const data = {
            _id: _id,
            hotel: {
                name: hotel.name,
                type: hotel.type,
                city: hotel.city,
                photos: hotel.photos,
            },
            rooms: roomBookeds,
            ...otherDetails,
        }

        // Trả về định dạng output json mới
        res.status(200).json(data);

        // res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
};

// GET ALL BOOKING
export const getAllBookings = async (req, res, next) => {

    try {
        // Truy vấn đến tất cả đối tượng booking đồng thời tham chiếu tới đối tượng Hotel và Room.
        const bookings = await Booking.find()
            .populate({
                path: "hotel",
                select: ["name", "type", "city", "photos"]
            })
            .populate({
                path: "rooms.room",
                select: ["name", "type", "price", "quantity"]
            });

        if (!bookings) {
            throw createError(404, "Can't find booking data!");
        }

        // Duyệt qua từng đối tượng booking sau khi truy vấn thành công. Với mỗi đối tượng tiến hành trích xuất dữ liệu như sau:
        // Biến bookingDatas chứa dữ liệu sau khi trả về.
        const bookingDatas = bookings.map((booking) => {

            // Duyệt qua từng thuộc tính name và type của đối tượng rooms để lấy dữ liệu và biến nó thành hai mảng: roomName và roomType 
            const roomBookeds = booking.rooms.map((roomBooked) => {
                return {
                    name: roomBooked.room.name,
                    type: roomBooked.room.type,
                    quantity: roomBooked.quantity,
                }
            });

            // Trích xuất hai thuộc tính không cần thiết là hotel và rooms từ booking.
            const { _id, hotel, rooms, ...otherDetails } = booking._doc;

            // Tính thời gian lưu trú để tính toán giá tiền.
            const time = booking.endDate.getUTCDate() - booking.startDate.getUTCDate();
            // Tính tổng giá tiền của đơn đặt đang được duyệt.
            const totalPrice = rooms.reduce((acc, roomPrice) => acc + (roomPrice.room.price * roomPrice.quantity), 0);

            // Trả về một đối tượng mới với các thuộc tính có sẵn (trừ hai thuộc tính hotel, rooms) và thêm mới vài thuộc tính.
            return {
                _id: _id,
                hotel: {
                    name: hotel.name,
                    type: hotel.type,
                    city: hotel.city,
                    photos: hotel.photos,
                },
                rooms: roomBookeds,
                totalPrice: totalPrice * time, 
                ...otherDetails,

            }
        })

        res.status(200).json(bookingDatas);
    } catch (err) {
        next(err);
    }
};