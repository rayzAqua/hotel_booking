import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  console.log(user);

  return (
    <div className="login">
      <div className="lContainerLo">
        <h2 className="logo">Đăng nhập vào hệ thống</h2>
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
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          Bạn chưa có tài khoản ?
        </span>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Đăng nhập
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
