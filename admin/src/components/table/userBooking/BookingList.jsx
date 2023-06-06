import "./bookingList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BookingList = ({ bookingList, loading }) => {

  const formattedTotalPrice = (cheapestPrice) => {
    const newPrice = parseInt(cheapestPrice)
    return newPrice.toLocaleString("vi-VN");
  } 

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Booking ID</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Room</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Total</TableCell>
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
          ) : bookingList?.length === 0 ? (
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
                  This customer hasn't any booking.
                </span>
              </TableCell>
            </TableRow>
          ) : (
            bookingList?.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">{row.hotel.name}</TableCell>
                <TableCell className="tableCell">{row.hotel.type}</TableCell>
                <TableCell className="tableCell">{row.rooms[0].name}</TableCell>
                <TableCell className="tableCell">{row.rooms[0].type}</TableCell>
                <TableCell className="tableCell">{row.rooms[0].quantity}</TableCell>
                <TableCell className="tableCell">{formattedTotalPrice(row.totalPrice)} VND</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.isExpires}`}>
                    {row.isExpires ? "Not Expires" : "Expires"}
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

export default BookingList;
