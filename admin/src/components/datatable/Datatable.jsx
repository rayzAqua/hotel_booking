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

  useEffect(() => {
      setList(data); 
  }, [data]);

  console.log(path);
  console.log(data);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      alert("Delete successfully!");
    } catch (err) { }
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
          rows={list}
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
