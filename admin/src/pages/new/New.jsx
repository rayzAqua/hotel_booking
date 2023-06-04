import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "example",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "example@gmail.com",
    },
    {
      id: "phoneNumber",
      label: "Phone",
      type: "text",
      placeholder: "0912345678",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "isAdmin",
      label: "Admin",
      type: "text",
    },
  ];

  const handleClick = async (e) => {
    e.preventDefault();

    // Check username field
    if (info.username) {
      if (!/^[a-zA-Z0-9\s]+$/.test(info.username)) {
        alert("Invalid username field. Only alphanumeric characters are allowed.");
        return;
      }
    } else {
      alert("Username field cannot be empty.");
      return;
    }

    // Check email field
    if (info.email) {
      if (!/^[^\s@]+@gmail\.com$/.test(info.email)) {
        alert("Email must be a valid Gmail address (example@gmail.com).");
        return;
      }
    } else {
      alert("Email field cannot be empty.");
      return;
    }

    // Check password field
    if (!info.password || info.password.length === 0) {
      alert("Password field cannot be empty.");
      return;
    }

    // Check phone field
    if (info.phoneNumber) {
      if (!/^\d{10}$/.test(info.phoneNumber)) {
        alert("Phone number must be 10 digits and contain only digits 0-9.");
        return;
      }
    } else {
      alert("Phone number field cannot be empty.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      let uploadRes;
      if (file) {
        uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dojl7z9k8/image/upload",
          data
        );
      }

      const { url } = uploadRes?.data;

      const newUser = {
        ...info,
        image: url,
      };

      const createdUser = await axios.post("/auth/register", newUser);
      console.log(createdUser);
      alert("Create User Successfully!");
      window.location.href = "http://localhost:3000/users"
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to create user: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to create user: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to create user: " + err.message);
      }
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
