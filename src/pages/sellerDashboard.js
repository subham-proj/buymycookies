import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Context } from "../context/context";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SellerDashboard() {
  const [allPosts, setAllPosts] = useState([]);
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/posts");
      setAllPosts(response.data);
    }
    fetchData();
  }, []);

  let posts = [];

  for (let i = 0; i < allPosts.length; i++) {
    if (user.username === allPosts[i].username) {
      posts.push(allPosts[i]);
    }
  }

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/posts/${e._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div>
      <Container className="seller_dashboard_layout">
        {posts.reverse().map((e) => (
          <div className="seller_dashboard">
            <Card className="seller_card">
              <div>
                <img
                  src="https://via.placeholder.com/200x200/FFB6C1/000000"
                  title=""
                  alt=""
                />
              </div>
              <Card.Body>
                <h4>{e.title}</h4>
                <p>Posted On : {new Date(e.createdAt).toDateString()}</p>

                <span className="seller_dashboard_bid">
                  <h6>
                    Current highest bid :{" "}
                    <span className="seller_bid">₹ {e.current_bid}</span>
                  </h6>
                </span>

                <span className="seller_dashboard_card_buttons">
                  <span style={{ paddingRight: "20px" }}>
                    <Button as={Link} to={`/posts/${e._id}`} variant="warning">
                      Edit
                    </Button>
                  </span>
                  <span>
                    <Button variant="danger" onClick={() => handleDelete(e)}>
                      Delete
                    </Button>
                  </span>
                </span>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
}
