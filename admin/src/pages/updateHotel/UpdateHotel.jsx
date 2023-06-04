import "./updateHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateHotel = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[3];
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);

  console.log(path);
  console.log(id);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list);

  const hotelInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: list?.name,
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: list?.address,
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: list?.city,
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: list?.type,
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: list?.phone,
    },
    {
      id: "latitude",
      label: "Latitude",
      type: "text",
      placeholder: list?.latitude,
    },
    {
      id: "longitude",
      label: "Longitude",
      type: "text",
      placeholder: list?.longitude,
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: list?.title,
    },
    {
      id: "description",
      label: "Description",
      type: "text",
      placeholder: list?.description,
    },
    {
      id: "cheapestPrice",
      label: "Price",
      type: "text",
      placeholder: list?.cheapestPrice,
    },
    {
      id: "rating",
      label: "Rating",
      type: "text",
      placeholder: list?.rating,
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra các ràng buộc khác
    if (info.name && !info.name.match(/^[\w\s&]+$/)) {
      alert("Invalid input for Name. Only alphanumeric characters, spaces, and '&' are allowed.");
      return;
    }

    if (info.address && !info.address.match(/^[\w,\s]+$/)) {
      alert("Invalid input for Address. Only alphanumeric characters and ',' are allowed.");
      return;
    }

    if (info.city && !info.city.match(/^[A-Za-z\s]+$/)) {
      alert("Invalid input for City. Only alphabetic characters are allowed.");
      return;
    }

    if (info.type && !info.type.match(/^[\w]+$/)) {
      alert("Invalid input for Type. Only alphanumeric characters are allowed.");
      return;
    }

    if (info.phone && !info.phone.match(/^\d{10}$/)) {
      alert("Invalid input for Phone. Please enter a 10-digit number.");
      return;
    }

    if (info.latitude && !info.latitude.match(/^\d+(\.\d+)?$/)) {
      alert("Invalid input for Latitude. Please enter a valid number. Only number and '.' are allowed.");
      return;
    }

    if (info.longitude && !info.longitude.match(/^\d+(\.\d+)?$/)) {
      alert("Invalid input for Longitude. Please enter a valid number. Only number and '.' are allowed.");
      return;
    }

    if (info.title && !info.title.match(/^[\w\s]+$/)) {
      alert("Invalid input for Title. Only alphanumeric characters are allowed.");
      return;
    }

    if (info.cheapestPrice && !info.cheapestPrice.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (info.rating && !info.rating.match(/^\d+(\.\d+)?$/)) {
      alert("Invalid input for Rating. Please enter a valid number. Only number and '.' are allowed.");
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

      let newhotel;

      if (list && list.length > 0) {
        newhotel = {
          ...info,
          photos: list,
        };
      } else {
        newhotel = { ...info };
      }

      console.log(newhotel);

      const updateHotel = await axios.put(`/hotels/${id}`, newhotel);
      console.log(updateHotel);
      alert("Update Hotel Successfully!");
      window.location.href = "http://localhost:3000/hotels"
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to update hotel: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to update hotel: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to update hotel: " + err.message);
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
                files
                  ? URL.createObjectURL(files[0]) :
                  list?.photos ? list.photos[0] :
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

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
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

export default UpdateHotel;
