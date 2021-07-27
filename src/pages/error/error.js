import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./error.css";

export default function Error() {
  return (
    <div>
      <Container className="error">
        <h1>404</h1>
        <h3>UH OH! You're Lost</h3>
        <h6>
          The page you are looking for does not exist. How you got here is a
          mystery.{" "}
        </h6>
        <h6>But you can click the button below to go back to the homepage.</h6>
        <div className="error_button_layout">
          <Button as={Link} to="/" className="error_button">
            Go Back to the right place
          </Button>
        </div>
      </Container>
    </div>
  );
}
