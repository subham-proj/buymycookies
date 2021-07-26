import React, { useState } from "react";
import { Card, Container, Form, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  const [drop, setDrop] = useState("");
  console.log(drop);
  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form>
              <h5 style={{ textAlign: "center", padding: "20px" }}>
                Create an Account
              </h5>
              <Dropdown className="mb-3">
                <Dropdown.Toggle className="dropdown_button">
                  {drop ? drop : "Account type"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => setDrop("Buyer Only")}>
                    Buyer Only
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setDrop("Seller Only")}>
                    Seller Only
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setDrop("Both")}>
                    Both
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[a-zA-Z0-9]{3,12}"
                  placeholder="John Doe"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="johndoe99" required />
                <Form.Text className="text-muted">
                  <Form.Text className="text-muted">
                    3-12 characters, only alphabets & numbers are allowed
                  </Form.Text>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  placeholder="987654321"
                  required
                />
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
              {drop === "Seller Only" || drop === "Both" ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Name of Business</Form.Label>
                  <Form.Control type="text" placeholder="Buy my cookies inc." />
                </Form.Group>
              ) : (
                ""
              )}

              {drop === "Seller Only" || drop === "Both" ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>GSTIN number</Form.Label>
                  <Form.Control
                    type="number"
                    pattern="[a-zA-Z0-9]{8}"
                    placeholder=""
                  />
                </Form.Group>
              ) : (
                ""
              )}

              {drop === "Seller Only" || drop === "Both" ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Kolkata" required />
                </Form.Group>
              ) : (
                ""
              )}

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
