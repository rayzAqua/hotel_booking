import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import { regex } from "../utils/regex.js";


//CREATE
export const createHotel = async (req, res, next) => {
    // Tạo mới một đối tượng newhotel từ mô hình Hotel với dữ liệu từ request
    const newHotel = new Hotel(req.body);

    try {
        // Lưu đối tượng đó vào db thông qua Hotel Model
        const savedHotel = await newHotel.save();

        if (!savedHotel) {
            throw createError(400, "Save hotel failure!");
        }

        // Nếu lưu thành công thì trả về data vừa được lưu
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

//UPDATE
export const updateHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            throw createError(404, "Can't find this hotel!");
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotel._id, // Truy vấn đến đối tượng có id đc gửi từ client
            { $set: req.body }, // Update đối tượng đó với dữ liệu từ client
            { new: true } // Truy vấn lại đối tượng vừa được update để phản hồi, nếu không có tham số này server sẽ gửi lại đối tượng cũ.
        );

        if (!updatedHotel) {
            throw createError(400, "Update hotel failure!");
        }

        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            throw createError(404, "Can't find this hotel!");
        }

        const deletedHotel = await Hotel.findByIdAndDelete(hotel._id);

        if (!deletedHotel) {
            throw createError(400, "Delete hotel failure!");
        }

        res.status(200).json({
            success: true,
            message: "Delete hotel succesful!",
            deletedHotel: deletedHotel,
        });
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getHotel = async (req, res, next) => {

    try {
        const getHotel = await Hotel.findById(req.params.id);

        if (!getHotel) {
            throw createError(404, "Can't find data!");
        }

        res.status(200).json(getHotel);
    } catch (err) {
        next(err);
    }
};

//GET ALL OR SEARCH HOTEL
// Có thể sử dụng hàm get all hotel để tìm kiếm khách sạn theo tên, thành phố, giá cả....
export const getHotels = async (req, res, next) => {

    // Trích xuất dữ liệu trong js:
    // Tạo ra một đối tượng có các thuộc tính là các dữ liệu cần trích xuất và một toán tử ...others hoặc ...otherDetails để chứa
    // các dữ liệu còn lại.
    // Sự khác nhau giữa others và otherDetails.
    // others: Là một đối tượng có chứa các thuộc tính khác nhau, mỗi thuộc tính này có thể là bất kỳ tuỳ vào trường hợp,
    // mỗi thuộc tính này lại không cần phải liên quan đến một đối tượng cụ thể.
    // otherDetails: Là một đối tượng chứa các thuộc tính khác nhau, tuy nhiên khác với others, các thuộc tính này liên quan đến
    // một đối tượng cụ thể. Các thuộc tính này có thể là các thuộc tính bổ sung thêm thông tin cho một đối tượng.
    // VD: Ta muốn lưu thông tin một người dùng với dữ liệu được gửi từ client. Tuy nhiên đối tượng này là không có trường học vấn.
    // Lúc này ta có thể sử dụng biến ...otherDetails để lưu thông tin học vấn này vào đối tượng người dùng.
    // Nếu là others thì ta có thể thêm một thông tin hoàn toàn không liên quan đến với người dùng này. 
    // VD: Lưu thêm thông tin "isMinhloveThong": true. 
    const { name, type, phone, city, address, title, min, max, limit, ...others } = req.query;

    // Định nghĩa những chuỗi chính quy cho việc tìm kiếm
    const hotelName = regex(name);
    const typeHotel = regex(type);
    const hotelCity = regex(city);
    const addressHotel = regex(address);
    const phoneNumber = regex(phone);
    const hotelTitle = regex(title);

    try {
        const getHotels = await Hotel.find({
            // ...others,
            name: { $regex: hotelName, $options: "im" },
            type: { $regex: typeHotel, $options: "im" },
            city: { $regex: hotelCity, $options: "im" },
            phone: { $regex: phoneNumber, $options: "im" },
            address: { $regex: addressHotel, $options: "im" },
            title: { $regex: hotelTitle, $options: "im" },
            cheapestPrice: { $gt: min || 1, $lt: max || 999 }
        }).limit(limit);

        if (!getHotels) {
            throw createError(404, "Can't find data!");
        }

        res.status(200).json(getHotels);
    } catch (err) {
        next(err);
    }
};

// COUNT BY CITY
export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",");

    try {
        // Vì lúc này truy vấn đề nhiều đối tượng có thuộc tính là city nên hàm sẽ trả về nhiều promise
        // Mỗi promise tương ứng với một thành phố cho nên cần gọi hàm Promise.all() để trả về một list các
        // promise đó nếu truy vấn tới và đếm số document có cùng city thành công.
        const listCount = await Promise.all(cities.map((city) => {
            // Đếm document theo trường city có dữ liệu là city (dữ liệu city có được từ mảng cities): VD: "city": Ho Chi Minh
            const cityName = regex(city);
            return Hotel.countDocuments({ city: cityName });
        }));

        const list = cities.map((city, index) => {
            return {
                city: city,
                count: listCount[index],
            }
        })

        res.status(200).json(list);
        // VD: ?cities=Ho Chi Minh, Ha Noi
        // promise1 = .... map Ho Chi Minh
        // promise2 = ... map Ha Noi
        // Promise.all() return list[promise1, promise2]
        // Vì ở đây gọi đến hàm countDocuments của một đối tượng mongoDB nên kết quả trả về sẽ là một list các số lượng
        // document có cùng trường city.
        // { 3, 2 }. 3 = Ho Chi Minh, 2 = Ha Noi
    } catch (err) {
        next(err)
    }
};

// COUNT BY TYPE
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "Khách sạn" });
        const apartmentCount = await Hotel.countDocuments({ type: "Căn hộ" });
        const resortCount = await Hotel.countDocuments({ type: "Resort" });
        const villaCount = await Hotel.countDocuments({ type: "Villa" });
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

        res.status(200).json([
            { type: "Khách sạn", count: hotelCount },
            { type: "Căn hộ", count: apartmentCount },
            { type: "Resort", count: resortCount },
            { type: "Villa", count: villaCount },
            { type: "Cabin", count: cabinCount }
        ]);

    } catch (err) {
        next(err);
    }

};

// GET HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
    try {
        // Tìm kiếm khách sạn theo Id
        const hotel = await Hotel.findById(req.params.id);

        // Nếu không tìm được khách sạn thì báo lỗi.
        if (!hotel) {
            throw createError(404, "Can't find this hotel!");
        }

        // Lấy ra một mảng tất cả các phòng của khách sạn trên.
        const hotelRooms = await Promise.all(
            hotel.rooms.map(async (room) => {
                return await Room.findById(room);
            })
        );

        // Nếu khách sạn không có phòng nào thì báo lỗi.
        if (hotelRooms.length <= 0) {
            throw createError(404, "This hotel hasn't any room!");
        }

        // Lấy ra các đơn đặt phòng đã hết hạn và có trạng thái isExpires = false,
        const currentDate = new Date();
        const getAllBookingExpires = await Booking.find({
            endDate: { $lt: currentDate },
            isExpires: false,
        });

        // Đặt lại giá trị isExpires của các đơn đặt trên thành true để biểu đạt các đơn đặt này đã hết hạn và đã được kiểm tra. 
        await Promise.all(getAllBookingExpires.map(async (bookingExpires) => {
            await Booking.findByIdAndUpdate(
                bookingExpires._id,
                { $set: { isExpires: true } }
            );
        }));

        // Lấy ra các mảng phòng trong các đơn đặt đã hết hạn và gộp chúng thành một mảng duy nhất.
        const getBookedRooms = getAllBookingExpires.flatMap(({ rooms }) => rooms);

        // Xử lý cập nhật lại số lượng phòng như cũ khi có đơn hết hạn.
        const updatedNumberRooms = await Promise.all(
            hotelRooms.map(async (hotelRoom) => {
                const room = await Room.findById(hotelRoom._id);
                const currentQuantity = room.quantity + getBookedRooms
                    .filter(bookedRoom => bookedRoom.room == hotelRoom._id)
                    .reduce((acc, bookedRoom) => (acc += bookedRoom.quantity), 0);
                // Lí do khi tất cả mảng trên rỗng mà thằng returnQuantity vẫn trả về được kết quả đúng là do phương thức này.
                const updatedRoom = await Room.findByIdAndUpdate(
                    hotelRoom._id,
                    { $set: { quantity: currentQuantity } },
                    { new: true }
                );
                return updatedRoom;
            })
        );
        
        // Kiểm tra xem có phòng nào có số lượng là 0 không, nếu có thì phòng đó không khả dụng.
        const newHotelRooms = updatedNumberRooms.map((room) => {
            const { _id, createdAt, updatedAt, __v, ...otherDetails } = room._doc;
            const isAvailable = room.quantity !== 0;
            return {
                _id: _id,
                ...otherDetails,
                isAvailable: isAvailable,
                createdAt: createdAt,
                updatedAt: updatedAt,
                __v: __v,
            };
        });

        res.status(200).json(newHotelRooms);
    } catch (err) {
        next(err);
    }
}

// COUNT HOTEL ROOM
export const countHotelRoom = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            throw createError(404, "Can't find this hotel!")
        }
        const roomQuantity = hotel.rooms.length;
        res.status(200).json({ quantity: roomQuantity });
    } catch (err) {
        next(err);
    }
}
