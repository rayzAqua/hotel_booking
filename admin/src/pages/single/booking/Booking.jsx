import "./booking.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/userBooking/BookingList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Booking = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/id=${id}`);

  console.log(path);
  console.log(id);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list);

  // Format start date
  const startDate = new Date(list.startDate);
  const formattedStartDate = startDate?.toLocaleString();
  // Format end date
  const endDate = new Date(list.endDate);
  const formattedEndDate = endDate?.toLocaleString();
  // Format create date
  const createDate = new Date(list.createdAt);
  const formattedCreateDate = createDate?.toLocaleString();

  // Format total price
  const formattedTotalPrice = parseInt(list?.totalPrice).toLocaleString("vi-VN");

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
              <h1 className="title">User Infomation</h1>
              <div className="item">
                <img
                  src={list.user?.image}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{list.user?.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{list.user?.email}</span>
                  </div>
                </div>
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <h1 className="title">Booking Infomation</h1>
              <div className="item1">
                <div className="details1">
                  <div className="detailItem1">
                    <span className="itemKey1">BookingID:</span>
                    <span className="itemValue1">{list?._id}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Hotel:</span>
                    <span className="itemValue1">{list.hotel?.name}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Room:</span>
                    <span className="itemValue1">{list.rooms?.map(({ name }) => name)}</span>
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
                    <span className="itemKey1">End:</span>
                    <span className="itemValue1">{formattedEndDate}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {loading ? (
          <div className="bottom"> Loading... </div>
        ) : (
          <div className="bottom">
            <h1 className="title">Booking Details</h1>
            <div className="item2">
              <div className="details2">
                <div className="detailItem2">
                  <span className="itemKey2">BookingID:</span>
                  <span className="itemValue2">{list._id}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Customer:</span>
                  <span className="itemValue2">{list.user?.name}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Email:</span>
                  <span className="itemValue2">{list.user?.email}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Hotel:</span>
                  <span className="itemValue2">{list.hotel?.name}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Type of hotel:</span>
                  <span className="itemValue2">{list.hotel?.type}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Hotel's phone:</span>
                  <span className="itemValue2">{list.hotel?.phone}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Address:</span>
                  <span className="itemValue2">{list.hotel?.address}, {list.hotel?.city}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Room:</span>
                  <span className="itemValue2">{list.rooms?.map(({ name }) => name)}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Type of room:</span>
                  <span className="itemValue2">{list.rooms?.map(({ type }) => type)}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Amount:</span>
                  <span className="itemValue2">{list.rooms?.map(({ quantity }) => quantity)}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Create At:</span>
                  <span className="itemValue2">{formattedCreateDate}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Start:</span>
                  <span className="itemValue2">{formattedStartDate}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">End:</span>
                  <span className="itemValue2">{formattedEndDate}</span>
                </div>
                <div className="detailItem2">
                  <span className="itemKey2">Totals:</span>
                  <span className="itemValue2">{formattedTotalPrice} VNĐ</span>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div >
  );
};

export default Booking;
