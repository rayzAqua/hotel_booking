export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    valueGetter: (params) => params.row.username,
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
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Hotel",
    width: 330,
    valueGetter: (params) => params.row.name,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg1" src={params.row.photos[0] || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          <div className="cellContent">{params.row.name}</div>
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 110,
  },
  {
    field: "title",
    headerName: "Title",
    width: 160,
  },
  {
    field: "city",
    headerName: "City",
    width: 120,
  },
  {
    field: "rooms",
    headerName: "Rooms",
    width: 120,
    valueGetter: (params) => params.row.rooms.length,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Name",
    width: 290,
    valueGetter: (params) => params.row.name,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg1" src={params.row.photos[0] || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          <div className="cellContent">{params.row.name}</div>
        </div>
      );
    },
  },
  {
    field: "hotelName",
    headerName: "Hotel",
    width: 300,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
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
    field: "user",
    headerName: "User",
    width: 150,
    valueGetter: (params) => params.row.user?.name,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.user?.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.user?.name}
        </div>
      );
    },
  },
  {
    field: "hotel",
    headerName: "Hotel",
    width: 300,
    valueGetter: (params) => params.row.hotel?.name,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.hotel?.name}
      </div>
    ),
  },
  {
    field: "hotel.type",
    headerName: "Type",
    width: 90,
    valueGetter: (params) => params.row.hotel?.type,
  },
  {
    field: "rooms",
    headerName: "Rooms",
    width: 160,
    valueGetter: (params) => params.row.rooms ? params.row.rooms.map((room) => room.name) : [],
    getApplyFilterFn: (filterModel, column) => {
      const filterValue = filterModel.value?.toLowerCase();
      return (params) => {
        const roomNames = params.row.rooms ? params.row.rooms.map((room) => room.name.toLowerCase()) : [];
        return roomNames.some((name) => name.includes(filterValue));
      };
    },
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      const roomNames1 = cellParams1.value;
      const roomNames2 = cellParams2.value;
      const sortedNames1 = roomNames1.sort();
      const sortedNames2 = roomNames2.sort();
      return sortedNames1.join("").localeCompare(sortedNames2.join(""));
    },
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.rooms ? params.row.rooms.map((room) => room.name).join("\n") : []}
      </div>
    ),
  },
  {
    field: "quantity",
    headerName: "Amount",
    width: 80,
    valueGetter: (params) => params.row.rooms ? params.row.rooms.map((room) => room.quantity) : [],
    getApplyFilterFn: (filterModel, column) => {
      const filterValue = filterModel.value;
      return (params) => {
        const roomQuantities = params.row.rooms ? params.row.rooms.map((room) => room.quantity) : [];
        return roomQuantities.some((quantity) => quantity.toString().includes(filterValue));
      };
    },
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      const roomQuantities1 = cellParams1.value;
      const roomQuantities2 = cellParams2.value;
      const sortedQuantities1 = roomQuantities1.sort((a, b) => a - b);
      const sortedQuantities2 = roomQuantities2.sort((a, b) => a - b);
      return sortedQuantities1[0] - sortedQuantities2[0];
    },
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        {params.row.rooms ? params.row.rooms.map((room) => room.quantity).join("\n") : []}
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
    width: 150,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        <div>{new Date(params.value).toLocaleString()}</div>
      </div>
    ),
  },
  {
    field: "endDate",
    headerName: "End",
    width: 150,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line" }}>
        <div>{new Date(params.value).toLocaleString()}</div>
      </div>
    ),
  },
];

export const eventColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "name",
    headerName: "Event",
    width: 300,
    valueGetter: (params) => params.row.name,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "eventType",
    headerName: "Type",
    width: 130,
  },
  {
    field: "location",
    headerName: "Location",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 130,
  },
];