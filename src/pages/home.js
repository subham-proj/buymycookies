import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Container className="home-info">
        <Row>
          <Col lg={6}>
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_6xfdtlzb.json"
              background="transparent"
              speed="2"
              style={{ width: "100%", height: "100%" }}
              loop
              autoplay
            ></lottie-player>
          </Col>
          <Col lg={6} className="home-info-para">
            <p>
              <span className="title">Buy My Cookies</span> Inc. is an India
              multinational e-commerce corporation based in Kolkata, West
              Bengal, India that facilitates consumer-to-consumer and
              business-to-consumer sales through its website. Buy My Cookie was
              founded by <em>Subham Singh</em> in the July of 2021.
              <Row className="register_button">
                <Col className="button-style-2">
                  <Button as={Link} to="/login" className="signup_button">
                    Log in
                  </Button>
                </Col>
                <Col className="button-style-2">
                  <Button as={Link} to="/register" className="signup_button">
                    Join Now
                  </Button>
                </Col>
              </Row>
            </p>
          </Col>
        </Row>
      </Container>
      <div className="footerLayout">
        <footer className="footer">
          Copyright © {new Date().getFullYear()}, All Right Reserved Buy My
          Cookies
        </footer>
      </div>
    </div>
  );
}
