import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Token from "../models/Token.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

// REGISTER
export const register = async (req, res, next) => {

    // Bổ sung refeshToken
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phoneNumber: req.body.phoneNumber,
            image: req.body.image
        });

        const createdUser = await newUser.save();

        if (!createdUser) {
            throw createError(400, "Register failure!");
        }

        // Gửi email xác thực tài khoản.
        // Tạo một token để xác thực tài khoản.
        const newToken = new Token({
            userId: createdUser._id,
            token: crypto.randomBytes(32).toString("hex"),
        });

        // Lưu token xác thực vào db.
        const savedToken = await newToken.save();

        // Tạo một đường link để xác thực tài khoản.
        const url = `${process.env.BASE_URL}/api/auth/${createdUser._id}/verify/${savedToken.token}`;

        // Gửi đi email kèm đường link xác thực trên.
        await sendEmail(createdUser.email, url);

        res.status(200).json({
            success: true,
            message: "An Email sent to your account please verify!",
        });
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
        if (!passwordCorrect) return next(createError(401, "Wrong password or username!"));

        if (!user.verified) {
            // Kiểm tra xem user này đã có token xác thực chưa
            const token = await Token.findOne({ userId: user._id });
            // Nếu token không tồn tại thì tạo mới.
            if (!token) {
                const newToken = new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                });
                const savedToken = await newToken.save();
                const url = `${process.env.BASE_URL}/api/auth/${user._id}/verify/${savedToken.token}`;
                await sendEmail(user.email, url);
            }

            return res.status(400).json({
                success: false,
                message: "An Email sent to your account please verify!"
            });
        }
        //JSON web token:
        // Tạo ra một chuỗi token, chuỗi này chứa các thông tin quan trọng được gửi đi từ server dành cho việc xác minh
        // user và phân quyền cho user đó. Chuỗi này được tạo ra bằng cách sử dụng hàm sign để mã hoá các thông tin gửi
        // đi bằng một SECRET_KEY.
        const jwt_token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

        // Trích xuất dữ liệu trong JS:
        // Toán tử spread ...otherDetails được dùng để lấy toàn bộ dữ liệu của đối tượng user trừ hai trường là password và isAdmin.
        // Lúc này dữ liệu được lấy bởi ...otherDetails sẽ được lưu dưới dạng đối tượng và có thể thực hiện các thao tác xử lý.
        // password được dùng để chứa trường password.
        // isAdmin được dùng để chứa trường isAdmin.
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Phản hồi lần lượt theo các bước sau:
        // - Lưu lại token vào cookie và thực hiện bảo mật cho token bằng cách gọi httpOnly: true (Ngăn chặn client truy cập tới token).
        // - Đặt mã trạng thái HTTP là 200 (Success)
        // - Gửi đến client thông tin dưới dạng json.
        res.cookie("access_token", jwt_token, { httpOnly: true }).status(200).json({
            details: {...otherDetails },
            isAdmin,
        });
    } catch (err) {
        next(err);
    }
}

// VERIFY ACCOUNT
export const verifyAccount = async (req, res, next) => {
    const userId = req.params.id;
    const verifyToken = req.params.token;

    console.log("Ok!");

    try {
        // Kiểm tra xem user vừa được tạo có tồn tại không.
        const user = await User.findById(userId);
        if (!user) {
            throw createError(404, "Can't find this user!");
        }

        // Kiểm tra xem token thuộc user này có tồn tại không.
        const token = await Token.findOne({
            userId: user._id,
            token: verifyToken
        });
        if (!token) {
            throw createError(400, "Invalid link!");
        }

        // Cập nhật lại là đã xác thực
        await User.findByIdAndUpdate(
            user._id,
            { $set: { verified: true } }
        );

        // Xoá token đã được dùng để xác thực khỏi CSDL
        await Token.deleteOne({
            userId: token.userId,
            token: token.token,
        });

        res.status(200).send(
            `<html>
            <head>
                <title>Xác thực tài khoản thành công</title>
                <style>
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
            
                    .container {
                        width: 400px;
                        padding: 20px;
                        border: 1px solid #ccc;
                        background-color: #f9f9f9;
                        text-align: center;
                    }
            
                    .success-message {
                        color: #008000;
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
            
                    .check-mark {
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        background-color: #008000;
                        color: white;
                        font-size: 36px;
                        font-weight: bold;
                        line-height: 60px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <span class="check-mark">✓</span>
                    <h2 class="success-message">Xác thực tài khoản thành công!</h2>
                    <p>Cảm ơn bạn đã xác thực tài khoản. Bây giờ bạn có thể truy cập vào tài khoản của mình.</p>
                </div>
            </body>
            </html>`
        );

    } catch (err) {
        next(err);
    }
};