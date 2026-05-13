import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomestayDetails from "./pages/HomestayDetails";
import MyBookings from "./pages/MyBookings";
import Support from "./pages/Support";
import Footer from "./components/Footer";
import HostDashboard from "./pages/HostDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/homestay/:id"
          element={<HomestayDetails />}
        />

        <Route
          path="/mybookings"
          element={<MyBookings />}
        />

        <Route
          path="/support"
          element={<Support />}
        />
        <Route
          path="/host"
          element={<HostDashboard />}
        />

        {
        localStorage.getItem("role") === "admin" && (

         <Route
         path="/admin"
         element={<AdminDashboard />}
         />

        )
        } 

      </Routes>
      <Footer />

    </BrowserRouter>

  );

}

export default App;