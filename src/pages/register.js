import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [drop, setDrop] = useState("");
  const [fullName, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [accountType, setAccountType] = useState("");
  const [city, setCity] = useState("");
  const [nameOfBusiness, setNameOfBusiness] = useState("");
  const [GSTN, setGSTN] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await axios.get("/users");

    for (var x in user.data) {
      const eachUser = await axios.get("/users/" + x);

      if (
        eachUser.data.username === username ||
        eachUser.data.contact === contact
      ) {
        setUserExist(true);
        break;
      }
    }
    console.log(user);

    if (userExist === false) {
      if (password !== confirmPassword) {
        setIsNotValid(true);
      } else {
        try {
          const res = await axios.post("/auth/register", {
            full_name: fullName,
            username: username,
            email: email,
            contact: contact,
            password: password,
            city: city,
            name_of_business: nameOfBusiness,
            account_type: accountType,
            gstn: GSTN,
          });

          alert("User Registered Successfully");
          res.data && window.location.replace("/login");
        } catch (err) {
          alert("Username or Phone number already Exists");
          console.log(err);
        }
      }
    }
  };

  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h5 style={{ textAlign: "center", padding: "20px" }}>
                Create an Account
              </h5>

              <select
                required
                className="mb-3 dropdown_button"
                onChange={(e) => {
                  setDrop(e.target.value);
                  setAccountType(e.target.value);
                }}
              >
                <option value="">Account Type</option>
                <option value="Buyer Only">Buyer Only</option>
                <option value="Seller Only">Seller Only</option>
                <option value="Both">Both</option>
              </select>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setfullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[a-zA-Z0-9]{3,12}"
                  placeholder="johndoe99"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className="text-muted">
                  <Form.Text className="text-muted">
                    3-12 characters, only alphabets & numbers are allowed
                  </Form.Text>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Contact Number *</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  placeholder="987654321"
                  required
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-enter Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {isNotValid ? (
                <Alert variant="danger">Password does not match</Alert>
              ) : (
                ""
              )}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kolkata"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              {drop === "Seller Only" || drop === "Both" ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Name of Business</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Buy my cookies inc."
                    onChange={(e) => setNameOfBusiness(e.target.value)}
                  />
                </Form.Group>
              ) : (
                ""
              )}

              {drop === "Seller Only" || drop === "Both" ? (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>GSTIN number</Form.Label>
                  <Form.Control
                    type="text"
                    pattern="[a-zA-Z0-9]{8}"
                    onChange={(e) => setGSTN(e.target.value)}
                  />
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
