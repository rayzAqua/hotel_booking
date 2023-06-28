import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";

// XÁC MINH TOKEN
export const verifyToken = (req, res, next) => {
    // req lúc này sẽ chứa thông tin được gửi từ client và cookie của client đó.
    // Lấy về token từ request và kiểm tra xem token đó có rỗng hay không !
    // const jwt_token = req.cookies.access_token;
    const jwt_token = localStorage.getItem("access_token");
    if (!jwt_token) return next(createError(401, "You are not authenticated !"));

    // Nếu có token thì tiến hành xác nhận token đó. Nếu đúng thì trả về userInfo nếu không thì trả về err.
    // * Token mà một chuỗi mã hoá chứa thông tin quan trọng của người dùng. Những thông tin đấy được dùng để
    // xác thực và phân quyền.
    jwt.verify(jwt_token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if(err) return next(createError(403, "Token is not valid!"));
        // Tạo mới một req: 
        //Sau khi xác định là đúng token, tiến hành tạo một request mới là req.user.
        // req.user được đùng để chứa các thông tin của người dùng sau khi token được giải mã.
        req.user = userInfo; // id admin
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        const id = req.params.id ? req.params.id : req.params.userid;
        console.log(id);
        if (req.user.id === id || req.user.isAdmin) {
            console.log("User verified!");
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            console.log("Admin verified!")
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};