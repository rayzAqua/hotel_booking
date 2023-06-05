import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        {/* <span className="siDistance">{item.distance}m from center</span> */}
        <span className="siTaxiOp">Ưu đãi mùa du lịch</span>
        <span className="siSubtitle">Chỗ nghỉ Du lịch Bền vững</span>
        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOp">Miễn phí huỷ phòng</span>
        <span className="siCancelOpSubtitle">
          Bạn có thể huỷ sau, nên hãy đặt ngay hôm nay để có giá tốt !
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>{item.rating >= 4.8 ? "Xuất sắc" : "Tốt"}</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">VND {item.cheapestPrice * 23000}</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Xem chỗ trống</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
