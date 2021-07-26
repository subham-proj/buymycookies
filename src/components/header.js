import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="https://img.icons8.com/plasticine/50/000000/cookie.png" />
            Buy My Cookies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav">
              <NavLink to="/seller_login" className="navLink">
                Seller Login
              </NavLink>
              <NavLink to="/login" className="navLink">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
