import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
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

        console.log(req.user.id == user._id);
        if (req.user.id == user._id) {
            throw createError(400, "Can't not delete current user!");
        }

        // Nếu user tồn tại thì được phép xoá!
        if (!user) {
            throw createError(404, "Can't find this user!");
        }

        await Promise.all(
            user.bookings.map(async (booking) => {
                const book = await Booking.findById(booking);
                console.log(book);
                if (book.isExpires === false) {
                    await Promise.all(
                        book.rooms.map(async (room) => {
                            const rooms = await Room.findById(room.room);
                            console.log(rooms);
                            const currentQuantity = rooms.quantity + room.quantity;
                            console.log(currentQuantity);
                            await Room.findByIdAndUpdate(
                                rooms._id,
                                { $set: { quantity: currentQuantity } },
                                { new: true }
                            );
                        })
                    );
                }
            })
        );

        user.bookings.map(async (booking) => {
            return await Booking.findByIdAndDelete(booking);
        });

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
                        select: ["_id", "name", "type", "city", "address", "photos"],
                    })
                    .populate({
                        path: "rooms.room",
                        select: ["name", "type", "price", "quantity"],
                    });
            })
        );

        const bookings = userBookings.map((userBooking) => {
            const { _id, hotel, rooms, ...otherDetails } = userBooking._doc;

            const roomBookeds = rooms.map((roomBooked) => {
                return {
                    name: roomBooked.room.name,
                    type: roomBooked.room.type,
                    quantity: roomBooked.quantity,
                }
            });

            // Tính thời gian lưu trú để tính toán giá tiền.
            const time = userBooking.endDate.getUTCDate() - userBooking.startDate.getUTCDate();
            // Tính tổng giá tiền của đơn đặt đang được duyệt.
            const totalPrice = rooms.reduce((acc, roomPrice) => acc + (roomPrice.room.price * roomPrice.quantity), 0);

            return {
                _id: _id,
                hotel: {
                    _id: hotel._id,
                    name: hotel.name,
                    type: hotel.type,
                    city: hotel.city,
                    address: hotel.address,
                    photos: hotel.photos,
                },
                rooms: roomBookeds,
                totalPrice: totalPrice * time,
                ...otherDetails,
            }
        })

        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
}