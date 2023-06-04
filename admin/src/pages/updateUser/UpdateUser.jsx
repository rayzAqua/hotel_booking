import "./updateUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const UpdateUser = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[3];
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);

  console.log(path);
  console.log(id);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list);

  const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: list?.username,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: list?.email,
    },
    {
      id: "phoneNumber",
      label: "Phone",
      type: "text",
      placeholder: list?.phoneNumber,
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

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check username field
    if (info.username && !/^[a-zA-Z0-9\s]+$/.test(info.username)) {
      alert("Invalid username field. Only alphanumeric characters are allowed.");
      return;
    }

    // Check email field
    if (info.email && !/^[^\s@]+@gmail\.com$/.test(info.email)) {
      alert("Email must be a valid Gmail address (example@gmail.com).");
      return;
    }

    // Check phone field
    if (info.phoneNumber && !/^\d{10}$/.test(info.phoneNumber)) {
      alert("Phone number must be 10 digits and contain only digits 0-9.");
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

      const { url } = uploadRes?.data || {};

      const newUser = {
        ...info,
        image: url,
      };

      const updateUser = await axios.put(`/users/${id}`, newUser);
      console.log(updateUser);
      alert("Update successful");
      window.location.href = "http://localhost:3000/users"
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to update user: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to update user: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to update user: " + err.message);
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
        {loading ? (
          <div className="bottom">Loading...</div>
        ) : (
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file ? URL.createObjectURL(file) :
                    list?.image ? list.image :
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
          </div>)}
      </div>
    </div>
  );
};

export default UpdateUser;
