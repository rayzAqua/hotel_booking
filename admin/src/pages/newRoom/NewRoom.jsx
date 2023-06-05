import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const { data, loading, error } = useFetch("/hotels");

  const roomInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Deluxe Room",
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: "VIP Room",
    },
    {
      id: "price",
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "10",
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "10",
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra ràng buộc không được bỏ trống
    if (
      !info.name || info.name.trim() === "" ||
      !info.type || info.type.trim() === "" ||
      !info.price || info.price.trim() === "" ||
      !info.quantity || info.quantity.trim() === "" ||
      !info.description || info.description.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Kiểm tra các ràng buộc khác
    if (!info.name?.match(/^[\w\s&]+$/)) {
      alert("Invalid input for Name. Only alphanumeric characters, spaces, and '&' are allowed.");
      return;
    }

    if (!info.type?.match(/^[\w\s]+$/)) {
      alert("Invalid input for Type. Only alphanumeric characters are allowed.");
      return;
    }

    if (!info.price?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (!info.quantity?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (info.description?.trim() === "") {
      alert("Description cannot be empty.");
      return;
    }

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dojl7z9k8/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      let newRoom;
      if (list && list.length > 0) {
        newRoom = {
          ...info,
          photos: list,
        };
      } else {
        newRoom = { ...info };
      }

      console.log(newRoom);

      const createdRoom = await axios.post(`/rooms/${hotelId}`, newRoom);
      console.log(createdRoom);
      alert("Create Room Successfully!");
      window.location.href = "http://localhost:3000/rooms"
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to create room: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to create room: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to create room: " + err.message);
      }
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "textarea" ? (
                    <textarea
                      id={input.id}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
