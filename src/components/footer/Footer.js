import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './footer.css';



const Footer = () => {
  return (
    <>
      <footer className="custom-footer text-light py-4">
        <Container>
          <Row className='text-center'>
            <Col md={4}>
              <h4>About Us</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget leo vel libero volutpat vehicula.
              </p>
            </Col>
            <Col md={4}>
              <h4>Contact Us</h4>
              <address>
                Email: info@mybookstore.com
                <br />
                Phone: (123) 456-7890
              </address>
            </Col>
            <Col md={4}>
              <h4>Follow Us</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className="text-center small">
                &copy; {new Date().getFullYear()} Keisar's Bookstore. All rights
                reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer;