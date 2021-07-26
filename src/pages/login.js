import React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Enter your credentials here
              </h6>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="johndoe99" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" />
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
