import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("Create user successful!")
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));

        // Nếu không có await thì hàm sẽ không chờ đợi phương thức bcrypt xử lí xong mà sẽ chạy lệnh tiếp theo.
        // Chính vì vậy, biến passwordCorrect lúc này có giá trị là một Promise chứ không phải là kết quả của phương thức này.
        // Điều này khiến cho đoạn mã bị sai.
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) return next(createError(400, "Wrong password or username!"));

        const jwt_token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

        // Trích xuất dữ liệu trong JS
        // Toán tử spread ...otherDetails được dùng để lấy toàn bộ dữ liệu của đối tượng user trừ hai trường là password và isAdmin.
        // Lúc này dữ liệu được lấy bởi ...otherDetails sẽ được lưu dưới dạng đối tượng và có thể thực hiện các thao tác xử lý.
        // password được dùng để chứa trường password.
        // isAdmin được dùng để chứa trường isAdmin.
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", jwt_token, { httpOnly: true }).status(200).json({ ...otherDetails });
    } catch (err) {
        next(err);
    }
}