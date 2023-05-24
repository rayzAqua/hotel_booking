import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// CREATE BOOKING
export const createBooking = async (req, res, next) => {

    const userId = req.params.userid;
    const newBooking = new Booking(req.body);

    try {
        // Lưu booking vào csdl
        const savedBooking = await newBooking.save();
        try {
            // Sau khi lưu booking mới vào csdl, tiến hành lưu booking đó vào user bằng cách lưu mã booking vào trường bookings của user
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { bookings: savedBooking._id } }
            );
        } catch (err) {
            next(err);
        }
        res.status(200).send("Booking successful!");
    } catch (err) {
        next(err);
    }
};

// DELETE BOOKING
export const deleteBooking = async (req, res, next) => {

    const userId = req.params.userid;

    try {
        await Booking.findByIdAndDelete(req.params.id);
        try {
            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { bookings: req.params.id } }
            );
        } catch (err) {
            next(err);
        }
        res.status(200).send("Delete booking successful!");
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
                path: "rooms",
                select: ["name", "type"]
            });;
        
        
        const roomName = booking.rooms.map(({name}) => name);
        const roomType = booking.rooms.map(({type}) => type);

        const {hotel, rooms, ...otherDetails} = booking._doc;

        res.status(200).json({
            ...otherDetails,
            hotelName: hotel.name,
            hotelType: hotel.type,
            hotelCity: hotel.city,
            hotelPhotos: hotel.photos,
            roomNames: roomName,
            roomTypes: roomType,
        });

    } catch (err) {
        next(err);
    }
};

// GET ALL USER BOOKING - USER
export const getUserBookings = async (req, res, next) => {

    const userId = req.params.userid;

    try {
        const user = await User.findOne({ _id: userId }).populate("bookings");

        const bookingList = await Promise.all(
            user.bookings.map((booking) => {
                return Booking.findById(booking)
                    .populate({
                        path: "hotel",
                        select: ["name", "type", "city", "photos"],
                    })
                    .populate({
                        path: "rooms",
                        select: ["name", "type"],
                    });
            })
        );

        const dataBooking = bookingList.map((bookingMember) => {
            const {hotel, rooms, ...otherDetails} = bookingMember._doc;

            const roomName = rooms.map(({ name }) => name);
            const roomType = rooms.map(({ type }) => type);

            return {
                ...otherDetails,
                hotelName: hotel.name,
                hotelType: hotel.type,
                hotelCity: hotel.city,
                hotelPhotos: hotel.photos,
                roomName: roomName,
                roomType: roomType,
            }
        })

        res.status(200).json(dataBooking);
    } catch (err) {
        next(err);
    }
}

// GET ALL BOOKING - ADMIN
export const getAllBookings = async (req, res, next) => {

    try {
        // Truy vấn đến tất cả đối tượng booking đồng thời tham chiếu tới đối tượng Hotel và Room.
        const bookings = await Booking.find()
            .populate({
                path: "hotel",
                select: ["name", "type", "city", "photos"]
            })
            .populate({
                path: "rooms",
                select: ["name", "type"]
            });

        // Duyệt qua từng đối tượng booking sau khi truy vấn thành công. Với mỗi đối tượng tiến hành trích xuất dữ liệu như sau:
        // Biến bookingDatas chứa dữ liệu sau khi trả về.
        const bookingDatas = bookings.map((booking) => {

            // Duyệt qua từng thuộc tính name và type của đối tượng rooms để lấy dữ liệu và biến nó thành hai mảng: roomName và roomType 
            const roomName = booking.rooms.map(({ name }) => name);
            const roomType = booking.rooms.map(({ type }) => type);
            // Trích xuất hai thuộc tính không cần thiết là hotel và rooms từ booking.
            const { hotel, rooms, ...otherDetails } = booking._doc;

            // Trả về một đối tượng mới với các thuộc tính có sẵn (trừ hai thuộc tính hotel, rooms) và thêm mới vài thuộc tính.
            return {
                ...otherDetails,
                hotelName: hotel.name,
                hotelType: hotel.type,
                hotelCity: hotel.city,
                hotelPhotos: hotel.photos,
                roomName: roomName,
                roomType: roomType,
            }
        })

        res.status(200).json(bookingDatas);
    } catch (err) {
        next(err);
    }
};