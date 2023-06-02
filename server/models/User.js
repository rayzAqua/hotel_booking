import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        image: {
            type: String,
            default: "https://demoda.vn/wp-content/uploads/2022/12/anh-meo-ngao-chup-can-mat.jpg"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        bookings: {
            type: [String],
            ref: "Booking",
        },
        favorite: {
            type: [String],
            default: [],
        },
        verified: {
            type: Boolean,
            default: false,
        }
    }, 
    { timestamps: true } // Ngày giờ tạo, cập nhật thông tin
);

export default mongoose.model("User", UserSchema);
