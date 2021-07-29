import React, { useRef, useContext } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Context } from "../../context/context";
import axios from "axios";
import "./auth.css";

const api = process.env.REACT_APP_API;

export default function Login() {
  // assign username and password using useRef Hook (could have used useState hook also)
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(api + "/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // Handling case : Where to redirect after successful login attempt depending on user's authorization
      if (
        res.data.account_type === "Buyer Only" ||
        res.data.account_type === "Both"
      ) {
        window.location.replace("/dashboard");
      } else {
        window.location.replace("/seller_dashboard");
      }
    } catch (err) {
      // alerting for invalid login attempt
      alert("Invalid Credentials!!");
      dispatch({ type: "LOGIN_FAILED" });

      // reseting values for next attempt
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Enter your credentials here
              </h6>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe99"
                  ref={usernameRef}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 login_form_submit">
                <Button className="login_button" type="submit">
                  Log in
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <h6 className="login_form_text">
        <Link to="/login" style={{ textDecoration: "none", color: "#d57f3a" }}>
          Forgot Password
        </Link>{" "}
      </h6>

      <h6 className="login_form_text">
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#d57f3a" }}
        >
          {" "}
          &nbsp;&nbsp; Click here
        </Link>{" "}
      </h6>
    </div>
  );
}
