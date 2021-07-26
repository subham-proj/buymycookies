import React from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Create an Account
              </h6>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="johndoe99" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 login_form_submit">
                <Button className="login_button" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <h6 className="login_form_text">
        Already have an account ?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#d57f3a" }}>
          {" "}
          &nbsp; Log in
        </Link>{" "}
      </h6>
    </div>
  );
}
