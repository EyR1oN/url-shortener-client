import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ShortUrlsTable from "./components/ShortUrlsTable";
import UrlDetailsPage from "./components/UrlDetailsPage";
import NavBar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shortUrlsTable" element={<ShortUrlsTable />} />
        <Route
          path="/about"
          element={
            JSON.parse(localStorage.getItem("user"))?.role ? (
              <About />
            ) : (
              <ShortUrlsTable />
            )
          }
        />
        <Route
          path="/shortUrlsTable/:id"
          element={
            JSON.parse(localStorage.getItem("user"))?.role ? (
              <UrlDetailsPage />
            ) : (
              <ShortUrlsTable />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
