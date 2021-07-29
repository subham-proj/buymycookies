import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";

const api = process.env.REACT_APP_API;

export default function Posts({ data }) {
  // for setting user details
  const [userDetails, setUserDetails] = useState([]);

  // function to fetch user of the post and set to setUserDetails
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(api + "/users/@/" + data.username);
      setUserDetails(response.data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <div className="blog-grid">
        <div className="blog-img">
          <img
            src="https://via.placeholder.com/400x200/FFB6C1/000000"
            title=""
            alt=""
          />
        </div>

        <div className="blog-info">
          <h5>{data.title}</h5>
          <p className="text_description">{data.description}</p>
          <div className="blockquote-footer">
            <p style={{ paddingTop: "30px", paddingBottom: "10px" }}>
              <img
                src="https://img.icons8.com/material-sharp/20/000000/user.png"
                alt="cover"
              />{" "}
              {userDetails.name_of_business
                ? userDetails.name_of_business
                : userDetails.full_name + " (" + userDetails.username + ")"}
            </p>
            <p>Posted On : {new Date(data.createdAt).toDateString()}</p>
          </div>
          <div className="btn-bar">
            <Button as={Link} to={`/posts/${data._id}`} className="bid_button">
              Bid Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
