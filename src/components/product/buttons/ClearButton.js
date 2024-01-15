import React from 'react';
import { deleteOrder } from '../../../api/orderApi';
import { useMutation } from 'react-query';
import { useContext } from 'react';
import StoreContext from '../../../context/StoreContext';
import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import CartContext from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';




const ClearButton = () => {

    const {handleClearCart} = useContext(StoreContext);


  return (
    <>
        <Button variant="warning" onClick={(e) => handleClearCart(e)} style={{ borderRadius: '7px' }}>
            Clear Cart
        </Button>
    </>
  )
}

export default ClearButton;