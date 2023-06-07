import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HotelBooking.vn</span>
        </Link>
        {user ? (
          <>
            <h3>Xin chào, {user.username}</h3>
            <button className="navButton" onClick={handleSignout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <div className="navItems">
            <button
              className="navButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
            <button
              className="navButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        )}
        {/* <div className="navItems">
          <button
            className="navButton"
            onClick={() => {
              navigate("/register");
            }}
          >
            Đăng ký
          </button>
          <button
            className="navButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
