import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        eventType: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Event", EventSchema);