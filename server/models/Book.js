import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        hotel: {
            type: String,
            required: true,
        },
        rooms: {
            type: [String],
            required: true,
        },
        bookingPrice: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true } // Ngày giờ tạo, cập nhật booking
);

export default mongoose.model("Booking", BookSchema);