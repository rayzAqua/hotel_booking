import "./user.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import BookingList from "../../../components/table/userBooking/BookingList";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const User = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  console.log(path);
  console.log(id);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const response = await axios.get(`/${path}/all-bookings/${id}`);
        setBookingList(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setList(data);
    fetchBookingList();
  }, [data, path, id]);

  console.log(list);
  console.log(bookingList);

  // Format create date
  const createDate = new Date(list?.createdAt);
  const formattedCreateDate = createDate?.toLocaleString();

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
              <h1 className="title">User Infomation</h1>
              <div className="item">
                <img
                  src={list?.image}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{list?.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{list?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Admin:</span>
                    <span className="itemValue">{list?.isAdmin ? "True" : "False"}</span>
                  </div>
                </div>
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <h1 className="title">User Infomation</h1>
              <div className="item1">
                <div className="details1">
                  <div className="detailItem1">
                    <span className="itemKey1">UserID:</span>
                    <span className="itemValue1">{list?._id}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Name:</span>
                    <span className="itemValue1">{list?.username}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Email:</span>
                    <span className="itemValue1">{list?.email}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Phone:</span>
                    <span className="itemValue1">{list?.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div >
        {loading ? (
          <div className="bottom">Loading...</div>
        ) : (
          <div className="bottom">
            <h1 className="title">{list?.username}'s Booking</h1>
            <BookingList bookingList={bookingList} loading={isLoading} />
          </div>)}
      </div >
    </div >
  );
};

export default User;
