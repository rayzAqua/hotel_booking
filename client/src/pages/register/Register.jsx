import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigator = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phoneNumber: undefined,
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async () => {
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log(res.data);
      alert("Đăng ký thành công, hãy xác thực tài khoản trước khi đăng nhập!");
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="lContainerRe">
        <h2 className="logo">Tạo tài khoản HotelBooking.com</h2>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="mật khẩu"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="số điện thoại"
          id="phoneNumber"
          onChange={handleChange}
          className="lInput"
        />
        <span
          className="moveLogin"
          onClick={() => {
            navigator("/login");
          }}
        >
          Bạn đã có tài khoản ?
        </span>
        <button className="lButton" onClick={handleClick}>
          Đăng ký
        </button>

        {/* {error && <span>{error.message}</span>} */}
      </div>
    </div>
  );
};

export default Register;
