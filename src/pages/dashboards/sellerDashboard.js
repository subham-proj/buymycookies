import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./dashboards.css";
const api = process.env.REACT_APP_API;

export default function SellerDashboard() {
  // To assign all the posts in the database
  const [allPosts, setAllPosts] = useState([]);

  // Session's user details
  const { user } = useContext(Context);

  // function to fetch all the posts and assign them to allPosts
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(api + "/posts");
      setAllPosts(response.data);
    }
    fetchData();
  }, []);

  // Putting all the posts which belongs to session's user
  let posts = [];

  for (let i = 0; i < allPosts.length; i++) {
    if (user.username === allPosts[i].username) {
      posts.push(allPosts[i]);
    }
  }

  // function to delete post
  const handleDelete = async (e) => {
    try {
      await axios.delete(`${api}/posts/${e._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div>
      <Container className="seller_dashboard_layout">
        {/** looping in reverse order to get latest posts first */}
        {posts.reverse().map((e) => (
          <div className="seller_dashboard">
            <Card className="seller_card">
              <div>
                <img
                  src="https://via.placeholder.com/200x200/FFB6C1/000000"
                  title=""
                  alt="placeholder"
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
