import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

// ADD FAVORITE HOTEL
export const addFavoriteHotel = async (req, res, next) => {
    const userId = req.params.userid;
    const hotelId = req.params.hotelid;

    try {
        // Tìm user có userid.
        const user = await User.findById(userId);
        // Kiểm tra xem user có tồn tại không.
        if (!user) {
            throw createError(404, "User not found!");
        }

        // Kiểm tra xem hotelId có tồn tại trong mảng favorite của user chưa.
        const isExistedHotel = user.favorite.some((hotel) => hotel === hotelId);
        // Nếu tồn tại thì isExistedHotel = true và báo lỗi!
        console.log(isExistedHotel);
        if (isExistedHotel) {
            throw createError(400, "This hotel is existed!");
        }

        // Tìm hotel có hotelid.
        const hotel = await Hotel.findById(hotelId);
        // Kiểm tra xem hotel có tồn tại không.
        if (!hotel) {
            throw createError(404, "Hotel not found!");
        }

        // Thêm khách sạn có hotelid vào user.
        const addFavoriteHotel = await User.findByIdAndUpdate(
            user._id,
            { $push: { favorite: hotelId } },
            { new: true }
        );

        if (!addFavoriteHotel) {
            throw createError(400, "Add favorite hotel fail!");
        }

        res.status(200).json(addFavoriteHotel);

    } catch (err) {
        next(err);
    }
};

// REMOVE FAVORITE HOTEL
export const removeFavoriteHotel = async (req, res, next) => {
    const userId = req.params.userid;
    const hotelId = req.params.hotelid;

    try {
        // Tìm user có userid.
        const user = await User.findById(userId);
        // Kiểm tra xem user có tồn tại không.
        if (!user) {
            throw createError(404, "User not found!");
        }

        // Kiểm tra xem hotelId có tồn tại trong mảng favorite của user chưa.
        const isExistedHotel = user.favorite.some((hotel) => hotel === hotelId);
        // Nếu tồn tại thì isExistedHotel = true và đc phép xoá!
        console.log(isExistedHotel);
        if (!isExistedHotel) {
            throw createError(400, "This hotel isn't existed in favorite!");
        }

        // Thêm khách sạn có hotelid vào user.
        const removeFavoriteHotel = await User.findByIdAndUpdate(
            user._id,
            { $pull: { favorite: hotelId } },
            { new: true }
        );

        if (!removeFavoriteHotel) {
            throw createError(400, "Add favorite hotel fail!");
        }

        res.status(200).json({
            success: true,
            message: "Remove hotel successfully",
            removedHotel: removeFavoriteHotel
        });

    } catch (err) {
        next(err);
    }
};

// GET ONE FAVORITE HOTEL
export const getOneFavoriteHotel = async (req, res, next) => {
    const userId = req.params.userid;
    const hotelId = req.params.hotelid;

    try {
        // Tìm user có userid.
        const user = await User.findById(userId);
        // Kiểm tra xem user có tồn tại không.
        if (!user) {
            throw createError(404, "User not found!");
        }

        // Kiểm tra xem hotelId có tồn tại trong mảng favorite của user chưa.
        const isExistedHotel = user.favorite.some((hotel) => hotel === hotelId);
        // Nếu tồn tại thì isExistedHotel = true và tìm kiếm hotel đó!
        console.log(isExistedHotel);
        if (!isExistedHotel) {
            throw createError(400, "This hotel isn't existed in favorite!");
        }

        const hotel = await Hotel.findById(hotelId);

        res.status(200).json(hotel);

    } catch (err) {
        next(err);
    }
};

// GET ALL FAVORITE HOTEL
export const getAllFavoriteHotel = async (req, res, next) => {
    const userId = req.params.userid;

    try {
        // Tìm user có userid.
        const user = await User.findById(userId);
        // Kiểm tra xem user có tồn tại không.
        if (!user) {
            throw createError(404, "User not found!");
        }

        // Kiểm tra xem có hotelId nào tồn tại trong mảng favorite của user không.
        const isExistedFavoriteHotel = user.favorite.length > 0;
        // Nếu tồn tại thì isExistedHotel = true và tìm kiếm hotel đó!
        console.log(isExistedFavoriteHotel);
        if (!isExistedFavoriteHotel) {
            return res.status(200).json(user.favorite);
        }

        // Tìm kiếm tất cả khách sạn có trong mảng favorite.
        const hotels = await Promise.all(
            user.favorite.map(async (hotelid) => await Hotel.findById(hotelid))
        );

        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }
};