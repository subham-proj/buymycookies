import axios from "axios";
import React, { useContext, useState } from "react";
import { Container, Card, Col, Row, Form, Button } from "react-bootstrap";
import { Context } from "../context/context";

export default function SellerDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msp, setMsp] = useState(0);
  const [cookiesType, setCookiesType] = useState("");
  const [Egg, setEgg] = useState(false);
  const [bakedTime, setBakedTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      description: description,
      username: user.username,
      city: user.city,
      msp: msp,
      current_bid: msp,
      no_of_bids: 0,
      cookies_type: cookiesType,
      egg: Egg,
      baked_time: bakedTime,
      bidding_end_date: endDate,
    };

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) {
      console.log(newPost);
    }
  };

  return (
    <div>
      <Container className="add_product_layout">
        <Card className="add_product">
          <Card.Title className="new_post">
            Post a new Cookie in the Store
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Product Title
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Cookie"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Product Description
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="This is a very tasty cookie made up of chocolate"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Minimum Selling Price
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <Form.Control
                    type="number"
                    placeholder="₹ 1000"
                    required
                    onChange={(e) => setMsp(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Type
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <select
                    required
                    onChange={(e) => setCookiesType(e.target.value)}
                  >
                    <option value="">Select ...</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Vanilla">Vanilla</option>
                    <option value="Oatmeal">Oatmeal</option>
                    <option value="Nutella">Nutella</option>
                  </select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Egg
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <input
                    type="radio"
                    name="egg"
                    value="Yes"
                    onChange={(e) => setEgg(true)}
                  />
                  <label style={{ padding: "10px" }}>Yes</label>

                  <input
                    type="radio"
                    name="egg"
                    value="No"
                    onChange={(e) => setEgg(false)}
                  />
                  <label style={{ padding: "10px" }}>No</label>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Baked time <br></br>(less than a)
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <select
                    required
                    onChange={(e) => setBakedTime(e.target.value)}
                  >
                    <option value="">Select ...</option>
                    <option value="a day ago">a day ago</option>
                    <option value="a week ago">a week ago</option>
                    <option value="a month ago">a month ago</option>
                  </select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Bidding end date
                </Form.Label>
                <Col sm={10} lg={6} md={6}>
                  <Form.Control
                    type="date"
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="success" size="lg">
                Post
              </Button>{" "}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
