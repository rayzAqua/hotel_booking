import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { regex } from "../utils/regex.js";

// UPDATE
export const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Delete user successful!");
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getUser = async (req, res, next) => {

    try {
        const getUser = await User.findById(req.params.id);
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

        res.status(200).json(getUsers);
    } catch (err) {
        next(err);
    }
};

// GET USER BOOKING
export const getUserBookings = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.params.email }).populate("bookings");

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