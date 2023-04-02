import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        hotel: {
            type: String,
            required: true,
            ref: "Hotel",
        },
        rooms: {
            type: [String],
            required: true,
            ref: "Room",
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