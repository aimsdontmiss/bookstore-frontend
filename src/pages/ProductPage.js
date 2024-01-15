import { React, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CartContext, { addItem, removeItem } from '../context/CartContext';
import { useQuery } from 'react-query';
import { detailProduct } from '../api/productApi';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../static/css/pages.css';
import AddtcButton from '../components/product/buttons/AddtcButton';
import RemovetcButton from '../components/product/buttons/RemovetcButton';


function ProductPage() {
  
  const {id} = useParams();

  let {items, addItem, removeItem} = useContext(CartContext);

  // GATHERING PRODUCT DETAILS FROM API;
  

  const {data: product, isLoading, isError} = useQuery(
    ['product', id],
    () => detailProduct({id}), 
    {

      enabled: !!id, // Only fetch data when id is available

      staleTime: 1000 * 60 * 30, // 30 minutes

    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error fetching product details. {console.error(isError)}; {/* Display the error message */}
      </p>
    );
  }

  return (
    <>
      <div className='main'>
        <Container flex className='container' style={{ alignItems: 'center' }}>
          <Row>
            <Col md={6}>
              <Card key={id} className='box-element' style={{color: '#000'}}>
                <div className='product-img'>
                  <Card.Img className='mb-3' variant="top" 
                  src='https://picsum.photos/200/300/' 
                  alt={product.title} style={{
                    height: '400px', objectFit: 'cover' }}/>
                </div>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='box-element' style={{color: '#000'}}>
                <Card.Body>
                  <Card.Title>Product Details</Card.Title>
                  <Card.Text>{product.summary}</Card.Text>
                  {/* <Button onClick={() => addItem(product.id, product.title, product.price)} variant="primary" style={{ borderRadius: '7px' }}>Add to Cart</Button> */}
                  <AddtcButton product={product} />
                  {/* <Button onClick={() => removeItem( product.title )} variant="tertiary" style={{ borderRadius: '7px' }}>Remove</Button> */}
                  <RemovetcButton product={product} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
    </>
  )
}

export default ProductPage;

