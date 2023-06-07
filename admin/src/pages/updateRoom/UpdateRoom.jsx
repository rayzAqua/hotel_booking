import "./updateRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateRoom = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[3];
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const { data, loading, error } = useFetch("/hotels");
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log(path);
  console.log(id);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/${path}/id=${id}`);
        setRoom(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRoom();
  }, [data], [path], [id]);

  console.log(data);
  console.log(room);

  let roomWithHotel;
  Object.values(data).forEach((hotel) => {
    const isRoom = hotel.rooms.includes(room._id);
    if (isRoom) {
      roomWithHotel = {
        hotelName: hotel.name,
        ...room,
      };
    }
  });

  console.log(roomWithHotel);

  const formattedTotalPrice = parseInt(roomWithHotel?.price).toLocaleString("en-US");

  const roomInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: roomWithHotel?.name,
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: roomWithHotel?.type,
    },
    {
      id: "price",
      label: "Price",
      type: "text",
      placeholder: formattedTotalPrice,
    },
    {
      id: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: roomWithHotel?.quantity,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: roomWithHotel?.description,
    },
    {
      id: "hotelName",
      label: "Hotel",
      type: "text",
      placeholder: roomWithHotel?.hotelName,
    }
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra các ràng buộc khác
    if (info.name && !info.name?.match(/^[\w\s&]+$/)) {
      alert("Invalid input for Name. Only alphanumeric characters, spaces, and '&' are allowed.");
      return;
    }

    if (info.type && !info.type?.match(/^[\w\s]+$/)) {
      alert("Invalid input for Type. Only alphanumeric characters and space are allowed.");
      return;
    }

    if (info.price && !info.price?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (info.quantity && !info.quantity?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (info.description && info.description?.trim() === "") {
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

      const updatedRoom = await axios.put(`/rooms/${id}`, newRoom);
      console.log(updatedRoom);
      alert("Update Room Successfully!");
      window.location.href = `http://localhost:3000/rooms/${id}`
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to update room: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to update room: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to update room: " + err.message);
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
                  ? URL.createObjectURL(files[0]) :
                  room?.photos ? room.photos[0] :
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
                      readOnly={input.id === "hotelName" ? true : false}
                    />
                  )}
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

export default UpdateRoom;
