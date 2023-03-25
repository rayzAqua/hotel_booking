import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    roomNumbers: {
        type: [Number],
        required: true,
    },
    maxPeoples: {
        type: Number,
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
    }
});

export default mongoose.Model("Room", roomSchema);