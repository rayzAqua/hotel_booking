export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Title",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeoples",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "hotel",
    headerName: "Hotel",
    width: 210,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.hotel.name}
      </div>
    ),
  },
  {
    field: "hotel.type",
    headerName: "Type",
    width: 90,
    valueGetter: (params) => params.row.hotel.type,
  },
  {
    field: "rooms",
    headerName: "Rooms",
    width: 160,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.rooms.map((room) => room.name).join("\n")}
      </div>
    ),
  },
  {
    field: "quantity",
    headerName: "SL",
    width: 50,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.rooms.map((room) => room.quantity).join("\n")}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    width: 130,
    valueGetter: (params) => params.row.totalPrice,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {parseInt(params.value).toLocaleString("vi-VN")} VNĐ
      </div>
    ),
  },
  {
    field: "startDate",
    headerName: "Start",
    width: 100,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        <div>{new Date(params.value).toLocaleDateString()}</div>
        <div>{new Date(params.value).toLocaleTimeString()}</div>
      </div>
    ),
  },
  {
    field: "endDate",
    headerName: "End",
    width: 100,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        <div>{new Date(params.value).toLocaleDateString()}</div>
        <div>{new Date(params.value).toLocaleTimeString()}</div>
      </div>
    ),
  },
];

