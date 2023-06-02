import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User",
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 3600,
    }
});

export default mongoose.model("Token", TokenSchema);