import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/pages.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CartContext from '../context/CartContext';
import CheckoutForm from '../components/forms/CheckoutForm';

function CheckoutPage() {

  let {customer} = useContext(CartContext);
  

  return (
    <>
        <div className='main'>

          <Container flex className='container' style={{ alignItems: 'center' }}>
            <Link className="btn btn-outline-dark"
              style={{ marginBottom:'7px' }}
              to='/my-order'>
                  &#x2190;
                  My Order
            </Link>
            <Row>
              <Col md={6}>
                <Card className='box-element' style={{color: '#000'}}>
                  <Card.Body>
                    {customer? (
                      <Card.Title className='hidden'></Card.Title>
                    ) : <Card.Title style={{ marginInline: '7px' }}>
                          <div class="row">
                            <div id="user-info">
                              <p>Customer Information</p>
                              {/* <hr/> */}
                                <div class="col">
                                    <input required class="form-control" type="text" name="name" placeholder="Name..."/>
                                </div>
                                <div class="col">
                                    <input required class="form-control" type="email" name="email" placeholder="Email..."/>
                                </div>
                            </div>
                          </div>
                          <hr/>
                          <Button variant="primary" style={{ borderRadius: '7px', marginTop: '7px' }}>
                            Submit
                          </Button>
                        </Card.Title>
                    }
                    
                    <Card.Text>
                      <div id="shipping-info">
                        <hr/>
                        <p>Shipping Information</p>
                        <hr/>
                        <div class="col">
                            <input class="form-control" type="text" name="address" placeholder="Address.." />
                        </div>
                        <div class="col">
                            <input class="form-control" type="text" name="city" placeholder="City.." />
                        </div>
                        <div class="col">
                            <input class="form-control" type="text" name="province" placeholder="Province.." />
                        </div>
                        <div class="col">
                            <input class="form-control" type="text" name="postcode" placeholder="Postal Code/Zip Code.." />
                        </div>
                        <div class="col">
                            <input class="form-control" type="text" name="Country" placeholder="Country.." />
                        </div>

                        <hr />
                        <Button id="form-button" class=" btn btn-success btn-block" type="submit" value="Continue" style={{ borderRadius: '7px', marginTop: '7px' }}>
                          Submit
                        </Button>
                      </div>

                    </Card.Text>
                    <Card.Text>
                      {/* <CheckoutForm/> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className='box-element' style={{color: '#000'}}>
                  <Card.Body>
                    <Card.Title>
                      <p>Order Summary</p>
                      <hr/>
                    </Card.Title>
                    <Card.Text>
                      <div class="cart-row">
                        <div style={{ flex: 1 }}>
                          <p>image</p>
                        </div>
                        <div style={{ flex: 2 }}>
                          <p>title</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p>$ price</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p>x qty</p>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
    </>
  )
}

export default CheckoutPage;