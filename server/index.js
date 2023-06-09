import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingsRoute from "./routes/bookings.js";
import sitesRoute from "./routes/sites.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

// Thực hiện kết nối đến database
const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connected to database!")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected!");
});


//Middlewares
app.use(cors());
app.use(cookieParser());

// Phân tích các yêu cầu HTTP và chuyển đổi chúng thành dạng JSON, cho phép Express hiểu được các yêu cầu và phản hồi từ client-server
// được gửi dưới dạng JSON.
app.use(express.json());

// Lần đầu vào đường dẫn server
app.get("/", (req, res) => {
  return res.send("This is server home page!");
});

// Khi client thực hiện một yêu cầu vào endpoint: "/api/auth/register" thì nó sẽ đi qua middleware này sẽ được xử lý bởi
// hàm middleware authRoute, hàm này sẽ bỏ qua các endpoint khác và xử lý yêu cầu của endpoint "register".
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/sites", sitesRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Undetermined error!"
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  });
});

app.listen(8088, () => {
    connect();
    console.log("Connected to server!");
});

