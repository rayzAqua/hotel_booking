import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import User from "./pages/single/user/User";
import Booking from "./pages/single/booking/Booking";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns, bookingColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import UpdateUser from "./pages/updateUser/UpdateUser";
import Hotel from "./pages/single/hotel/Hotel";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";
import Room from "./pages/single/room/Room";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:userId"
                element={
                  <ProtectedRoute>
                    <UpdateUser title="Update User Infomation" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Hotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel title="Add New Hotel" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:hotelId"
                element={
                  <ProtectedRoute>
                    <UpdateHotel title="Update Hotel Infomation" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <Room />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:roomId"
                element={
                  <ProtectedRoute>
                    <UpdateHotel title="Update Room Infomation" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="bookings">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={bookingColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":bookingId"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
