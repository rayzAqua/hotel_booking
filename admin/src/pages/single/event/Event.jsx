import "./event.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/userBooking/BookingList";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Event = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const eventPath = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/${eventPath}/id=${id}`);

  console.log(path);
  console.log(id);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list);

  // Format start date
  const startDate = new Date(list.date);
  const formattedStartDate = startDate?.toLocaleString();

  // Format create date
  const createDate = new Date(list.createdAt);
  const formattedCreateDate = createDate?.toLocaleString();

  // Format total price
  const formattedTotalPrice = parseInt(list?.price).toLocaleString("vi-VN");

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {loading ? (
            <div className="left"> Loading... </div>
          ) : (
            <div className="left">
              <div className="item">
                <img
                  src={list?.image}
                  alt=""
                  className="itemImg"
                />
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <Link to={`/${path}/${eventPath}/update/${id}`} style={{ textDecoration: "none" }}>
                <div className="editButton1">Edit</div>
              </Link>
              <div className="item1">
                <div className="details1">
                  <h1 className="itemTitle1">{list?.name}</h1>
                  <div className="detailItem1">
                    <span className="itemKey1">Event ID:</span>
                    <span className="itemValue1">{list?._id}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Type:</span>
                    <span className="itemValue1">{list?.eventType}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Location:</span>
                    <span className="itemValue1">{list?.location}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Create At:</span>
                    <span className="itemValue1">{formattedCreateDate}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Start:</span>
                    <span className="itemValue1">{formattedStartDate}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Price:</span>
                    <span className="itemValue1">{formattedTotalPrice} VND</span>
                  </div>    
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div >
  );
};

export default Event;
