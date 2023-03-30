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
        maxPeoples: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        photos: {
            type: [String],
        },
        description: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);