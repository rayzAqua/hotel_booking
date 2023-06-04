import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        // Số lượng phòng
        quantity: {
            type: Number,
            required: true,
        },
        photos: {
            type: [String],
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);