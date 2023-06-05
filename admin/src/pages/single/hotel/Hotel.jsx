import "./hotel.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/userBooking/BookingList";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import HotelRoom from "../../../components/table/hotelRooms/HotelRoom";
import axios from "axios";

const Hotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(path);
  console.log(id);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const response = await axios.get(`/${path}/rooms/${id}`);
        setRoomList(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    setList(data);
    fetchBookingList();

  }, [data, path, id]);

  console.log(list);
  console.log(roomList);

  const formattedTotalPrice = parseInt(list?.cheapestPrice).toLocaleString("en-US");

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
              <Link to={`/${path}/update/${id}`} style={{ textDecoration: "none" }}>
                <div className="editButton">Edit</div>
              </Link>
              <h1 className="title">Hotel Introdution</h1>
              <div className="item">
                <img
                  src={list?.photos || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{list?.name}</h1>
                  <div className="detailItem">
                    <span className="itemValue">{list?.description}</span>
                  </div>
                </div>
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <h1 className="title">Details</h1>
              <div className="item1">
                <div className="details1">
                  <div className="detailItem1">
                    <span className="itemKey1">Hotel ID:</span>
                    <span className="itemValue1">{list?._id}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Type:</span>
                    <span className="itemValue1">{list?.type}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Phone:</span>
                    <span className="itemValue1">{list?.phone}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Address:</span>
                    <span className="itemValue1">{list?.address}, {list?.city}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Title:</span>
                    <span className="itemValue1">{list?.title}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Rooms:</span>
                    <span className="itemValue1">{list?.rooms?.length}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Rating:</span>
                    <span className="itemValue1">{list?.rating}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Cheapest Price:</span>
                    <span className="itemValue1">{formattedTotalPrice}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {loading ? (
          <div className="bottom"> Loading... </div>
        ) : (
          <div className="bottom">
            <h1 className="title">{list?.name}'s Room</h1>
            <HotelRoom roomList={roomList} loading={isLoading} />
          </div>)}
      </div>
    </div >
  );
};

export default Hotel;
