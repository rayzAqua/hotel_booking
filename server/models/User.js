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
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }, 
    { timestamps: true } // Ngày giờ tạo, cập nhật thông tin
);

export default mongoose.model("User", UserSchema);