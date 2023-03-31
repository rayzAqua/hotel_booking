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
        const user = await User.findOne({ email: req.params.email });
        try {
            const list = await Promise.all(
                user.bookings.map((booking) => {
                    return Booking.findById(booking);
                })
            );
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
}