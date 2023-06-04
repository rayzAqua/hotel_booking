import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const profile = () => {
    console.log("Ok")
    navigate(`/users/${user._id}`, { replace: true });
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div onClick={profile} className="item1">
            {user.username}
          </div>
          <div className="item">
            <img
              src={user.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
