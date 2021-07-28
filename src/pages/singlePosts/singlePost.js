import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Context } from "../../context/context";

import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Card,
  Modal,
  Alert,
} from "react-bootstrap";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/posts/" + path);
      const userNow = await axios.get("/users/@/" + user.username);
      setUserDetails(userNow.data);
      setPost(res.data);
    }
    fetchData();
  }, [path]);

  let toUpdate = false;

  if (user && post.username === user.username) {
    toUpdate = true;
  }
  // console.log(updateMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msp, setMsp] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${path}`, {
        username: user.username,
        title: title ? title : post.title,
        description: description ? description : post.description,
        msp: msp ? msp : post.msp,
        bidding_end_date: endDate ? endDate : post.bidding_end_date,
      });
      window.location.reload();
    } catch (err) {}
  };

  const [newBid, setNewBid] = useState(post.current_bid);
  const [alertError, setAlertError] = useState(false);

  const [show, setShow] = useState(false);
  const clearState = () => {
    setNewBid({ ...post.current_bid });
    setAlertError(false);
  };
  const handleClose = () => {
    setShow(false);

    clearState();
  };
  const handleShow = () => setShow(true);

  const handleNewBid = async () => {
    if (newBid > post.current_bid) {
      try {
        await axios.put(`/posts/newBid/${path}`, {
          current_bid: newBid,
        });
        window.location.reload();
      } catch (err) {}
    } else {
      setAlertError(true);
    }
  };

  return (
    <div>
      <Container>
        <Card className="card_post">
          <Card.Body>
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img
                      src="https://via.placeholder.com/300/09f/fff.pngC/O https://placeholder.com/"
                      alt="product_image"
                    />
                  </div>
                </div>
              </div>
              <div className="details col-md-6">
                {updateMode ? (
                  <Form.Control
                    type="text"
                    placeholder={post.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <h3 className="product-title">{post.title}</h3>
                )}
                <div className="rating">
                  {post.egg ? (
                    <span className="color-2 red"></span>
                  ) : (
                    <span className="color-2 green"></span>
                  )}

                  <span className="review-no">
                    {post.egg ? (
                      <b style={{ color: "red" }}>egg</b>
                    ) : (
                      <b style={{ color: "green" }}>eggless</b>
                    )}
                  </span>
                </div>
                {updateMode ? (
                  <Col sm={10} lg={12} md={12}>
                    <Form.Control
                      type="text"
                      placeholder={post.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                ) : (
                  <p className="product-description">{post.description}</p>
                )}

                <h5 className="price">
                  Minimum Selling Price:
                  {updateMode ? (
                    <span className="input">
                      <Form.Control
                        type="text"
                        placeholder={post.msp}
                        onChange={(e) => setMsp(e.target.value)}
                      />
                    </span>
                  ) : (
                    <span>&nbsp; ₹ {post.msp}</span>
                  )}
                </h5>

                <h5 className="sizes">
                  Type:
                  <span className="size bt" data-toggle="tooltip">
                    {post.cookies_type}
                  </span>
                </h5>
                <h5 className="colors">
                  Baked Time :
                  <span className="bt">&nbsp;&nbsp;{post.baked_time}</span>
                </h5>

                <h5 className="colors">
                  Bidding will end on :
                  {updateMode ? (
                    <Form.Control
                      type="date"
                      placeholder={post.bidding_end_date}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  ) : (
                    <span className="bt">
                      &nbsp;&nbsp;
                      {new Date(post.bidding_end_date).toDateString()}
                    </span>
                  )}
                </h5>

                <h5 className="price">
                  Current Highest Bid: <span>&nbsp; ₹ {post.current_bid}</span>
                </h5>
                <p className="vote">
                  <strong>{post.no_of_bids}</strong> bids till now!{" "}
                </p>
                <p className="vote">
                  <b>Posted By : </b>{" "}
                  {userDetails.name_of_business
                    ? userDetails.name_of_business
                    : userDetails.full_name +
                      " (" +
                      userDetails.username +
                      ")"}{" "}
                </p>
                <p className="vote">
                  <b>Posted On : </b> {new Date(post.createdAt).toDateString()}{" "}
                </p>
                <p className="vote">
                  <b>Location : </b> {post.city}{" "}
                </p>
                <div className="action">
                  {toUpdate ? (
                    updateMode ? (
                      <div>
                        <span style={{ paddingLeft: "20px" }}>
                          <Button variant="success" onClick={handleUpdate}>
                            Save
                          </Button>
                        </span>
                        <span style={{ paddingLeft: "20px" }}>
                          <Button
                            variant="danger"
                            onClick={() => setUpdateMode(false)}
                          >
                            Cancel
                          </Button>
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span style={{ paddingLeft: "20px" }}>
                          <Button
                            variant="warning"
                            onClick={() => setUpdateMode(true)}
                          >
                            Edit
                          </Button>
                        </span>
                        <span style={{ paddingLeft: "20px" }}>
                          <Button variant="danger" onClick={handleDelete}>
                            Delete
                          </Button>
                        </span>
                      </div>
                    )
                  ) : (
                    <div>
                      <span style={{ paddingLeft: "20px" }}>
                        <Button className="bid_now btn" onClick={handleShow}>
                          Make a bid
                        </Button>
                      </span>

                      <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={show}
                        onHide={handleClose}
                      >
                        <Modal.Header>
                          <Modal.Title style={{ fontWeight: "bold" }}>
                            Make a bid now
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4 style={{ paddingBottom: "20px", color: "red" }}>
                            Current Highest Bid :{" "}
                            <span className="bt">₹ {post.current_bid}</span>
                          </h4>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalEmail"
                          >
                            <Form.Label column sm={2}>
                              Your Bid
                            </Form.Label>
                            <Col sm={10} lg={6} md={6}>
                              <Form.Control
                                type="number"
                                min="`${post.current_bid}`"
                                placeholder={post.current_bid}
                                onChange={(e) => setNewBid(e.target.value)}
                              />
                            </Col>
                          </Form.Group>
                          {alertError ? (
                            <div>
                              <Alert variant="danger">Make a valid bid</Alert>
                              <p
                                className="text-muted"
                                style={{ textAlign: "center " }}
                              >
                                (Note : Make a bid more than the current bid
                                otherwise it will be an invalid bid)
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleNewBid} variant="success">
                            Place the Bid
                          </Button>
                          <Button onClick={handleClose} variant="danger">
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
