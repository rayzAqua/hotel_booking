import "./updateEvent.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const UpdateEvent = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const pathEvent = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[4];
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/${pathEvent}/id=${id}`);

  console.log(path);
  console.log(id);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const eventInputs = [
    {
      id: "name",
      label: "Event",
      type: "text",
      placeholder: list?.name,
    },
    {
      id: "eventType",
      label: "Type",
      type: "text",
      placeholder: list?.eventType,
    },
    {
      id: "location",
      label: "Location",
      type: "text",
      placeholder: list?.location,
    },
    {
      id: "date",
      label: "Date",
      type: "datetime-local",
    },
    {
      id: "price",
      label: "Price",
      type: "text",
      placeholder: list?.price,
    },
  ];

  const handleClick = async (e) => {
    e.preventDefault();

    if (info.name && !info.name?.match(/^[\w\s&]+$/)) {
      alert("Invalid input for Name. Only alphanumeric characters, spaces, and '&' are allowed.");
      return;
    }

    if (info.eventType && !/^[a-zA-Z0-9\s]+$/.test(info.eventType)) {
      alert("Invalid eventType field. Only alphanumeric characters are allowed.");
      return;
    }

    if (info.location && !info.location?.match(/^[\w,\s]+$/)) {
      alert("Invalid input for Location. Only alphanumeric characters and ',' are allowed.");
      return;
    }

    if (info.price && !info.price?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
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

      let newEvent;
      if (uploadRes && uploadRes.data && uploadRes.data.url) {
        const { url } = uploadRes.data;
        newEvent = {
          ...info,
          image: url,
        };
      } else {
        newEvent = {
          ...info,
        }
      }

      const updatedEvent = await axios.put(`/sites/event/${id}`, newEvent);
      console.log(updatedEvent);
      alert("Update Event Successfully!");
      window.location.href = `http://localhost:3000/sites/event/${id}`
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to create event: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to create event: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to create event: " + err.message);
      }
    }
  };

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

              {eventInputs.map((input) => (
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

export default UpdateEvent;
