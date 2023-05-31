import mongoose from 'mongoose';

// Mô tả một cấu trúc dữ liệu (schema) cho đối tượng Hotel trong CSDL mongoDB
// {} đại diện cho một đối tượng cấu trúc dữ liệu của mongoose
// Tạo ra một đối tượng Schema (Mô tả cấu trúc dữ liệu mongoDB) mới với các mô tả thông tin như sau:
const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    // Kinh độ
    latitude: {
        type: String,
        required: true,
    },
    // Vĩ độ
    longitude: {
        type: String,
        require: true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    // Thuộc tính rooms sẽ chứa một mảng các chuỗi. Mỗi chuỗi là id của đối tượng Room
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    }
});

// Xuất ra Schema Hotel dưới dạng mô hình Hotel
export default mongoose.model("Hotel", HotelSchema);