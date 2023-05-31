import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        hotel: {
            type: String,
            required: true,
            ref: "Hotel",
        },
        rooms: [{
            room: {
                type: String,
                required: true,
                ref: "Room",
            },
            quantity: {
                type: Number,
                required: true,
            },    
        }],
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true } // Ngày giờ tạo, cập nhật booking
);

export default mongoose.model("Booking", BookSchema);