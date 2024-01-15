import React, { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import './index.css';
import CartContext from '../../context/CartContext';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/StoreContext';
import { addOrderItem, updateOrderItem  } from '../../api/orderItemApi';
import AddtcButton from './buttons/AddtcButton';



const ListProduct = ({ product }) => {

  
  
  return (
    <>
      <Card key={product.id} className='box-element' style={{color: '#000'}}>
        <div className='product-img'>
            <Card.Img className='mb-3' variant='top' src='https://picsum.photos/200/300/' alt='stock-product-image' />
          <Card.Body>
            <Card.Title>{product.title}, by {product.author}</Card.Title>
            <Card.Text>
              ${product.price}
            </Card.Text>
            <Button variant='secondary' style={{ marginRight: '10px', borderRadius: '7px' }}>
              <Link to={`/store/${product.id}`} style={{margin: 15, textDecoration: 'none', color:'inherit'}}>
                view
              </Link>
            </Button>
            <AddtcButton product={product} />
          </Card.Body>
        </div>
       </Card>
    </>
  )
}


export default ListProduct;

