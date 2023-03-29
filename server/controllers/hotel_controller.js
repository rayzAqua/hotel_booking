import Hotel from "../models/Hotel.js";

//CREATE
export const createHotel = async (req, res, next) => {

    // Tạo mới một đối tượng newhotel từ mô hình Hotel với dữ liệu từ request
    const newHotel = new Hotel(req.body);

    try {
        // Lưu đối tượng đó vào db thông qua Hotel Model
        const savedHotel = await newHotel.save();
        // Nếu lưu thành công thì trả về data vừa được lưu
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

//UPDATE
export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, // Truy vấn đến đối tượng có id đc gửi từ client
            { $set: req.body }, // Update đối tượng đó với dữ liệu từ client
            { new: true } // Truy vấn lại đối tượng vừa được update để phản hồi, nếu không có tham số này server sẽ gửi lại đối tượng cũ.
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete hotel succesful!");
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getHotel = async (req, res, next) => {

    try {
        const getHotel = await Hotel.findById(req.params.id);
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
    const { min, max, limit, ...others } = req.query;

    try {
        const getHotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999}
        }).limit(limit);
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
        const list = await Promise.all(cities.map((city) => {
            // Đếm document theo trường city có dữ liệu là city (dữ liệt city có được từ mảng cities): VD: "city": Ho Chi Minh
            return Hotel.countDocuments({ city: city });
        }));
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
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ]);

    } catch (err) {
        next(err);
    }

};