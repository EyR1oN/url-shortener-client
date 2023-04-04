import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/shortUrlsTable">
          Short URL
        </Navbar.Brand>
        <Nav className="ms-3">
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="mx-2"
          >
            Logout
          </Button>
          <Button
            variant="outline-light"
            onClick={handleAbout}
            className="mx-2"
          >
            About
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
