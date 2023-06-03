import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { userInputs } from "../../formSource.js";
import { bookingColumns } from "../../datatablesource.js";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      const updatedData = data.map((item) => {
        const startDateObject = new Date(item.startDate);
        const endDateObject = new Date(item.endDate);

        const formatOptions = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };

        const formattedStartDate = startDateObject.toLocaleDateString('en-US', formatOptions);
        const formattedEndDate = endDateObject.toLocaleDateString('en-US', formatOptions);

        return {
          ...item,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
      });

      setList(updatedData);
    }
  }, [data]);

  console.log(path);
  console.log(data);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: path !== "bookings" ? 150 : 80,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
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
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};



export default Datatable;
