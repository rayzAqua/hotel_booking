import Booking from "../models/Booking.js";
import User from "../models/User.js";

// CREATE BOOKING
export const createBooking = async (req, res, next) => {

    const email = req.params.email;
    const newBooking = Booking(req.body);

    try {
        // Lưu booking vào csdl
        const savedBooking = await newBooking.save();
        try {
            // Sau khi lưu booking mới vào csdl, tiến hành lưu booking đó vào user bằng cách lưu mã booking vào trường bookings của user
            await User.findOneAndUpdate(
                { email: email },
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

    const email = req.params.email;

    try {
        await Booking.findByIdAndDelete(req.params.id);
        try {
            await User.findOneAndUpdate(
                { email: email },
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
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }

};

// GET ALL BOOKING
export const getBookings = async (req, res, next) => {

    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }

};