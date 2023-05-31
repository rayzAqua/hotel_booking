import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { regex } from "../utils/regex.js";

// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        // Kiểm tra xem user có tồn tại không.
        const user = await User.findById(req.params.id);

        if (!user) {
            throw createError(404, "Can't find this user!");
        }

        // Nếu tồn tại thì được phép update
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            throw createError(400, "Update user failure!");
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        // Tìm kiếm xem user có tồn tại không.
        const user = await User.findById(req.params.id);

        // Nếu user tồn tại thì được phép xoá!
        if (!user) {
            throw createError(404, "Can't find this user!");
        }

        const deletedUser = await User.findByIdAndDelete(user._id);

        if (!deletedUser) {
            throw createError(400, "Delete user failure!");
        }

        res.status(200).json({
            success: true,
            message: "Delete user successfully!",
            deletedUser: deletedUser,
        });
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getUser = async (req, res, next) => {

    try {
        const getUser = await User.findById(req.params.id);

        if (!getUser) {
            throw createError(404, "Can't find data!");
        }
        
        res.status(200).json(getUser);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getUsers = async (req, res, next) => {

    const { username, email, phone, password, photo, limit, ...others } = req.query;

    const userName = regex(username);
    const userEmail = regex(email);
    const userPhone = regex(phone);

    try {
        const getUsers = await User.find({
            ...others,
            username: { $regex: userName, $options: "im" },
            email: { $regex: userEmail, $options: "im" },
            phoneNumber: { $regex: userPhone, $options: "im" }
        }).limit(limit);

        console.log({
            ...others,
            username: { $regex: userName, $options: "im" },
            email: { $regex: userEmail, $options: "im" },
            phoneNumber: { $regex: userPhone, $options: "im" }
        })

        if (!getUsers) {
            throw createError(404, "Can't find data!");
        }

        res.status(200).json(getUsers);
    } catch (err) {
        next(err);
    }
};

// GET ALL USER BOOKING
export const getUserBookings = async (req, res, next) => {

    const userId = req.params.userid;

    try {
        const user = await User.findOne({ _id: userId }).populate("bookings");

        if (!user) {
            throw createError(404, "Can't find user data!");
        }

        const userBookings = await Promise.all(
            user.bookings.map((booking) => {
                return Booking.findById(booking)
                    .populate({
                        path: "hotel",
                        select: ["name", "type", "city", "photos"],
                    })
                    .populate({
                        path: "rooms.room",
                        select: ["name", "type", "quantity"],
                    });
            })
        );

        if (userBookings.length <= 0) {
            throw createError(404, "Can't find booking data!");
        }

        const bookings = userBookings.map((userBooking) => {
            const { _id, hotel, rooms, ...otherDetails } = userBooking._doc;

            const roomBookeds = rooms.map((roomBooked) => {
                return {
                    roomName: roomBooked.room.name,
                    roomType: roomBooked.room.type,
                    quantity: roomBooked.quantity,
                }
            });

            return {
                _id: _id,
                hotel: {
                    hotelName: hotel.name,
                    hotelType: hotel.type,
                    hotelCity: hotel.city,
                    hotelPhotos: hotel.photos,
                },
                rooms: roomBookeds,
                ...otherDetails,
            }
        })

        if (bookings.length <= 0) {
            throw createError(404, "Can't not find data!");
        }

        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
}