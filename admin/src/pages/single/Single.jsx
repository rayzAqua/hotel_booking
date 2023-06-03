import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Single = () => {
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
              <h1 className="title">Information</h1>
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
                  {/* <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">+1 2345 67 89</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">USA</span>
                  </div> */}
                </div>
              </div>
            </div>)}
          {loading ? (
            <div className="right"> Loading... </div>
          ) : (
            <div className="right">
              <h1 className="title">Booking</h1>
              <div className="item1">
                <img
                  src={list.hotel?.photos[0]}
                  alt=""
                  className="itemImg1"
                />

                <div className="details1">
                  <h1 className="itemTitle1">{list.user?.name}</h1>
                  <div className="detailItem1">
                    <span className="itemKey1">ID:</span>
                    <span className="itemValue1">{list._id}</span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Address:</span>
                    <span className="itemValue1">
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className="detailItem1">
                    <span className="itemKey1">Country:</span>
                    <span className="itemValue1">USA</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        {loading ? (
          <div className="bottom"> Loading... </div>
        ) : (
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <List data={list} />
          </div>)}
      </div>
    </div >
  );
};

export default Single;
