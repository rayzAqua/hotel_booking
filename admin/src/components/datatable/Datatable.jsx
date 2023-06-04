import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { userInputs } from "../../formSource.js";
import { bookingColumns } from "../../datatablesource.js";
import Skeleton from "react-loading-skeleton";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(path);
  console.log(data);

  useEffect(() => {
    const fetchHotelList = async () => {
      try {
        const response = await axios.get(`/hotels`);
        setHotelList(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setList(data);
    if (path === "rooms") {
      fetchHotelList();
    } else {
      if (hotelList.length > 0) {
        setHotelList([]);
      }
    }
  }, [data]);

  console.log(list);
  console.log(hotelList);

  const combinedArray = [];

  hotelList.forEach((hotel) => {
    hotel.rooms.forEach((roomId) => {
      const room = list.find((item) => item._id === roomId);
      if (room) {
        combinedArray.push({
          hotelId: hotel._id,
          hotelName: hotel.name,
          ...room
        });
      }
    });
  });

  console.log(combinedArray);

  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        const roomForDelete = combinedArray.find((item) => item._id == id);
        if (roomForDelete) {
          await axios.delete(`/${path}/${id}/${roomForDelete.hotelId}`);
        }
      } else {
        await axios.delete(`/${path}/${id}`);
      }
      setList(list.filter((item) => item._id !== id));
      alert("Delete successfully!");
    } catch (err) {
      if (err.response) {
        // Phản hồi từ server với mã lỗi
        console.log(err.response.data);
        console.log(err.response.status);
        alert("Failed to delete: " + err.response.data.message);
      } else if (err.request) {
        // Yêu cầu đã được gửi nhưng không nhận được phản hồi từ server
        console.log(err.request);
        alert("Failed to delete: No response from server");
      } else {
        // Có lỗi xảy ra trong quá trình gửi yêu cầu
        console.log("Error", err.message);
        alert("Failed to delete: " + err.message);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: path !== "bookings" ? 150 : 80,
      renderCell: (params) => {
        return (
          <div className="cellAction" onClick={() => console.log("Click!")}>
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Details</div>
            </Link>
            {path !== "bookings" && (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const listData = path === "rooms" ? combinedArray : list;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toLocaleUpperCase()}
        {path !== "bookings" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="skeleton-overlay"></div>
          <div className="skeleton-content">
            {[...Array(11)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton height={40} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DataGrid
          className="datagrid"
          rows={listData}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};



export default Datatable;
