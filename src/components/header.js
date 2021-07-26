import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Navbar expand="lg" bg="transparent">
        <Container>
          <Navbar.Brand className="mx-auto" as={Link} to="/">
            <img
              src="https://img.icons8.com/plasticine/50/000000/cookie.png"
              alt="cookies"
            />
            <span className="navbar_title">Buy My Cookies</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
