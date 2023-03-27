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

//GET ALL
export const getHotels = async (req, res, next) => {

    try {
        const getHotels = await Hotel.find();
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
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city});
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