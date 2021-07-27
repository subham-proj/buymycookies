import React, { useContext } from "react";
import { Context } from "../context/context";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.clear();
    window.location.replace("/");
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user ? (
              <Nav className="ms-auto nav">
                <NavLink activeClassName="active" to="/" className="navLink">
                  Home
                </NavLink>

                {user.account_type === "Both" ? (
                  <NavLink
                    activeClassName="active"
                    to="/seller_dashboard"
                    className="navLink"
                  >
                    Seller Dashboard
                  </NavLink>
                ) : (
                  ""
                )}

                {user.account_type === "Seller Only" ? (
                  ""
                ) : (
                  <NavLink
                    activeClassName="active"
                    to="/orders"
                    className="navLink"
                  >
                    My Orders
                  </NavLink>
                )}

                <NavLink
                  activeClassName="active"
                  to={`/users/@/${user.username}`}
                  className="navLink"
                >
                  Profile
                </NavLink>
                <NavLink
                  exact={true}
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
