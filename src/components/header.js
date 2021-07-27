import React, { useContext } from "react";
import { Context } from "../context/context";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.clear();
  };
  return (
    <div>
      <Navbar expand="lg" bg="transparent">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://img.icons8.com/plasticine/50/000000/cookie.png"
              alt="cookies"
            />
            <span className="navbar_title">Buy My Cookies</span>
          </Navbar.Brand>

          {user ? (
            <Nav className="ms-auto nav">
              <Link className="navLink">{`${user.username}`}</Link>
              <NavLink
                activeClassName="active"
                to="/"
                onClick={handleLogout}
                className="navLink"
              >
                Logout
              </NavLink>
            </Nav>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </div>
  );
}
