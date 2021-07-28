import React, { useContext, useState } from "react";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import { Context } from "../context/context";

import axios from "axios";

export default function Profile() {
  // states to for assigning profile data
  const [fullName, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [city, setCity] = useState("");
  const [nameOfBusiness, setNameOfBusiness] = useState("");
  const [GSTN, setGSTN] = useState("");

  // Session's user
  const { user, dispatch } = useContext(Context);
  // to update when edit button is clicked
  const [updateMode, setUpdateMode] = useState(false);

  // handling  profile update
  const handleUpdate = async () => {
    dispatch({ type: "UPDATE_START" });

    try {
      const res = await axios.put("/users/" + user._id, {
        userId: user._id,
        full_name: fullName ? fullName : user.full_name,
        username: username ? username : user.username,
        email: email ? email : user.email,
        contact: contact ? contact : user.contact,
        city: city ? city : user.city,
        name_of_business: nameOfBusiness
          ? nameOfBusiness
          : user.name_of_business,
        gstn: GSTN ? GSTN : user.gstn,
      });

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch({ type: "UPDATE_FAILED" });
    }
  };

  return (
    <div>
      <Container>
        <div className="avatar">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_xyadoh9h.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          />
        </div>
        <div className="profile_title">
          <h2>{user.full_name}</h2>
          <h4 className="text-muted">{user.username}</h4>
          <h4 className="text-muted">
            <img
              src="https://img.icons8.com/material-outlined/30/000000/lock--v1.png"
              alt="lock"
            />
            &nbsp;
            {user.account_type === "Both"
              ? "Seller and Buyer both authorization"
              : user.account_type === "Buyer Only"
              ? "Buyer authorization only"
              : "Seller authorization only"}
          </h4>
        </div>

        <div className="profile_card_layout">
          <Card className="profile_card">
            <Card.Body>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Full Name
                </Form.Label>
                {updateMode ? (
                  <Col sm={10} lg={6} md={6}>
                    <Form.Control
                      type="text"
                      placeholder={user.full_name}
                      onChange={(e) => setfullName(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col sm={10} lg={6} md={6}>
                    <p>{user.full_name}</p>
                  </Col>
                )}
              </Form.Group>
              <hr></hr>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                {updateMode ? (
                  <Col sm={10} lg={6} md={6}>
                    <Form.Control
                      type="text"
                      placeholder={user.username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col sm={10} lg={6} md={6}>
                    <p>{user.username}</p>
                  </Col>
                )}
              </Form.Group>
              <hr></hr>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                {updateMode ? (
                  <Col sm={10} lg={6} md={6}>
                    <Form.Control
                      type="email"
                      placeholder={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col sm={10} lg={6} md={6}>
                    <p>{user.email}</p>
                  </Col>
                )}
              </Form.Group>
              <hr></hr>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Contact
                </Form.Label>
                {updateMode ? (
                  <Col sm={10} lg={6} md={6}>
                    <Form.Control
                      type="number"
                      placeholder={user.contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col sm={10} lg={6} md={6}>
                    <p>{user.contact}</p>
                  </Col>
                )}
              </Form.Group>
              <hr></hr>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Location
                </Form.Label>
                {updateMode ? (
                  <Col sm={10} lg={6} md={6}>
                    <Form.Control
                      type="text"
                      placeholder={user.city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col sm={10} lg={6} md={6}>
                    <p>{user.city}</p>
                  </Col>
                )}
              </Form.Group>
              <hr></hr>

              {user.account_type === "Both" ||
              user.account_type === "Seller Only" ? (
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Business Name
                  </Form.Label>
                  {updateMode ? (
                    <Col sm={10} lg={6} md={6}>
                      <Form.Control
                        type="text"
                        placeholder={user.name_of_business}
                        onChange={(e) => setNameOfBusiness(e.target.value)}
                      />
                    </Col>
                  ) : (
                    <Col sm={10} lg={6} md={6}>
                      <p>{user.name_of_business}</p>
                    </Col>
                  )}
                </Form.Group>
              ) : (
                ""
              )}

              {user.account_type === "Both" ||
              user.account_type === "Seller Only" ? (
                <hr></hr>
              ) : (
                ""
              )}

              {user.account_type === "Both" ||
              user.account_type === "Seller Only" ? (
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    GSTIN Number
                  </Form.Label>
                  {updateMode ? (
                    <Col sm={10} lg={6} md={6}>
                      <Form.Control
                        type="text"
                        placeholder={user.gstn}
                        onChange={(e) => setGSTN(e.target.value)}
                      />
                    </Col>
                  ) : (
                    <Col sm={10} lg={6} md={6}>
                      <p>{user.gstn}</p>
                    </Col>
                  )}
                </Form.Group>
              ) : (
                ""
              )}

              {user.account_type === "Both" ||
              user.account_type === "Seller Only" ? (
                <hr></hr>
              ) : (
                ""
              )}

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ offset: 2 }}>
                  {!updateMode ? (
                    <Button
                      variant="danger"
                      onClick={() => setUpdateMode(true)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="profile_update_button">
                      <div style={{ paddingRight: "20px" }}>
                        <Button
                          onClick={handleUpdate}
                          variant="success"
                          size="md"
                        >
                          Save
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => setUpdateMode(false)}
                          size="md"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
