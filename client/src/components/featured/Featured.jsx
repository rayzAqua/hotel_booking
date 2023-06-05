import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  // const { data, loading, error } = useFetch(
  //   "/hotels/countByCity?cities=Hồ Chí Minh,Hà Nội,Đà Nẵng"
  // );
  // console.log(data);
  const loading = false;
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cdn3.dhht.vn/wp-content/uploads/2022/08/bia-landmark-81-o-dau-an-gi-choi-gi-cac-goc-chup-hinh-dep.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hồ Chí Minh</h1>
              <h2> 5 chỗ nghỉ</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://sunnyvali.vn/wp-content/uploads/2022/12/ho-guom-5.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h2>4 chỗ nghỉ</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://danangfantasticity.com/wp-content/uploads/2018/10/cau-rong-top-20-cay-cau-ky-quai-nhat-the-gioi-theo-boredom-therapy.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              <h2>6 chỗ nghỉ</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
