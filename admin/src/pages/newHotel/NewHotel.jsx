import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const hotelInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Your Hotel Name",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "97 Man Thien, Thu Duc",
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: "New York",
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: "Hotel Type",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "0912345678",
    },
    {
      id: "latitude",
      label: "Latitude",
      type: "text",
      placeholder: "10.0000",
    },
    {
      id: "longitude",
      label: "Longitude",
      type: "text",
      placeholder: "10.0000",
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: "Your hotel star",
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "description",
    },
    {
      id: "cheapestPrice",
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: "rating",
      label: "Rating",
      type: "text",
      placeholder: "4.6",
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();

    // Kiểm tra ràng buộc không được bỏ trống
    if (
      !info.name || info.name.trim() === "" ||
      !info.address || info.address.trim() === "" ||
      !info.city || info.city.trim() === "" ||
      !info.type || info.type.trim() === "" ||
      !info.phone || info.phone.trim() === "" ||
      !info.latitude || info.latitude.trim() === "" ||
      !info.longitude || info.longitude.trim() === "" ||
      !info.title || info.title.trim() === "" ||
      !info.description || info.description.trim() === "" ||
      !info.cheapestPrice || info.cheapestPrice.trim() === "" ||
      !info.rating || info.rating.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Kiểm tra các ràng buộc khác
    if (!info.name?.match(/^[\w\s&]+$/)) {
      alert("Invalid input for Name. Only alphanumeric characters, spaces, and '&' are allowed.");
      return;
    }

    if (!info.address?.match(/^[\w,\s]+$/)) {
      alert("Invalid input for Address. Only alphanumeric characters and ',' are allowed.");
      return;
    }

    if (!info.city?.match(/^[A-Za-z\s]+$/)) {
      alert("Invalid input for City. Only alphabetic characters are allowed.");
      return;
    }

    if (!info.type?.match(/^[\w\s]+$/)) {
      alert("Invalid input for Type. Only alphanumeric characters and space are allowed.");
      return;
    }

    if (!info.phone?.match(/^\d{10}$/)) {
      alert("Invalid input for Phone. Please enter a 10-digit number.");
      return;
    }

    if (!info.latitude?.match(/^\d+(\.\d+)?$/)) {
      alert("Invalid input for Latitude. Please enter a valid number. Only number and '.' are allowed.");
      return;
    }

    if (!info.longitude?.match(/^\d+(\.\d+)?$/)) {
      alert("Invalid input for Longitude. Please enter a valid number. Only number and '.' are allowed.");
      return;
    }

    if (!info.title?.match(/^[\w\s]+$/)) {
      alert("Invalid input for Title. Only alphanumeric characters are allowed.");
      return;
    }

    if (info.description?.trim() === "") {
      alert("Description cannot be empty.");
      return;
    }

    if (!info.cheapestPrice?.match(/^\d+$/)) {
      alert("Invalid input for Price. Only numeric characters are allowed.");
      return;
    }

    if (!info.rating.match(/^\d+(\.\d+)?$/)) {
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

      const createdHotel = await axios.post("/hotels", newhotel);
      console.log(createdHotel);
      alert("Create Hotel Successfully!");
      window.location.href = "http://localhost:3000/hotels"
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to create hotel: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to create hotel: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to create hotel: " + err.message);
      }
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
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

              {hotelInputs.map((input) => (
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

export default NewHotel;
