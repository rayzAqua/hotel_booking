import "./hotelRoom.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const HotelRoom = ({ roomList, loading }) => {

  // Format create date
  const formattedCreateDate = (createdAt) => {
    const created = new Date(createdAt);
    return created.toLocaleString();
  } 

  const formattedTotalPrice = (cheapestPrice) => {
    const newPrice = parseInt(cheapestPrice)
    return newPrice.toLocaleString("en-US");
  } 

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Room ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Created At</TableCell>
            <TableCell className="tableCell">Expires</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="noBookingMessage">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    textAlign: "center",
                    padding: "16px",
                    backgroundColor: "#f8f8f8",
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Loading...
                </span>
              </TableCell>
            </TableRow>
          ) : roomList?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="noBookingMessage">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    textAlign: "center",
                    padding: "16px",
                    backgroundColor: "#f8f8f8",
                    color: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  This Hotel hasn't any room.
                </span>
              </TableCell>
            </TableRow>
          ) : (
            roomList?.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.type}</TableCell>
                <TableCell className="tableCell">{formattedTotalPrice(row.price)}</TableCell>
                <TableCell className="tableCell">{row.quantity}</TableCell>
                <TableCell className="tableCell">{formattedCreateDate(row.createdAt)}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.isAvailable}`}>
                    {row.isAvailable ? "Available" : "Not Available"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default HotelRoom;
