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
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
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

      const { url } = uploadRes?.data || list?.image;

      const newUser = {
        ...info,
        image: url,
      };

      const updateUser = await axios.put(`/users/${id}`, newUser);
      console.log(updateUser);
      alert("Update successful");
    } catch (err) {
      console.log(err);
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
