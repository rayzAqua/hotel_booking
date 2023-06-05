import "./room.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/userBooking/BookingList";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const Room = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);
  const [hotelList, setHotelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(path);
  console.log(id);

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

  let newRoom;
  hotelList.forEach((hotel) => {
    const room = hotel.rooms.find((roomId) => roomId === list._id);
    if (room) {
      newRoom = {
        hotelName: hotel.name,
        hotelAddress: hotel.address,
        hotelCity: hotel.city,
        hotelPhone: hotel.phone,
        ...list,
      };
    }
  });

  console.log(newRoom);

  // Format create date
  const createDate = new Date(newRoom?.createdAt);
  const formattedCreateDate = createDate?.toLocaleString();

  // Format total price
  const formattedTotalPrice = parseInt(newRoom?.price).toLocaleString("en-US");

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
              <h1 className="title">Room Introdution</h1>
              <div className="item">
                <img
                  src={newRoom?.photos || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">
                    {newRoom?.name}
                    <span className={`status ${newRoom?.isAvailable}`}>
                      {newRoom?.isAvailable ? "Vacant" : "Sold out"}
                    </span>
                  </h1>
                  <div className="detailItem">
                    <span className="itemValue">{newRoom?.description}</span>
                  </div>
                </div>
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <h1 className="title">Room Introduction</h1>
              <div className="item1">
                <div className="details1">
                  <div className="detailItem1">
                    <span className="itemKey1">Hotel:</span>
                    <span className="itemValue1">{newRoom?.hotelName}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Name:</span>
                    <span className="itemValue1">{newRoom?.name}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Type:</span>
                    <span className="itemValue1">{newRoom?.type}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Price:</span>
                    <span className="itemValue1">{formattedTotalPrice} $</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {loading ? (
          <div className="bottom"> Loading... </div>
        ) : (
          <div className="bottom">
            <h1 className="title">Room Details</h1>
            <div className="item2">
              <div className="details2">
                <div className="detailItem2">
                  <span className="itemKey2">Room ID:</span>
                  <span className="itemValue2">{newRoom?._id}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Hotel:</span>
                  <span className="itemValue2">{newRoom?.hotelName}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Address:</span>
                  <span className="itemValue2">{newRoom?.hotelAddress}, {newRoom?.hotelCity}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Phone:</span>
                  <span className="itemValue2">{newRoom?.hotelPhone}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Name:</span>
                  <span className="itemValue2">{newRoom?.name}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Type:</span>
                  <span className="itemValue2">{newRoom?.type}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Amount:</span>
                  <span className="itemValue2">{newRoom?.quantity}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Price:</span>
                  <span className="itemValue2">{formattedTotalPrice} $</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Create At:</span>
                  <span className="itemValue2">{formattedCreateDate}</span>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div >
  );
};

export default Room;
