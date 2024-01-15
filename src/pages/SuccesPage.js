import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/pages.css';
import CartContext from '../context/CartContext';
import StoreContext from '../context/StoreContext';
import { Button } from 'react-bootstrap';


function SuccesPage() {

    let [reset, setReset] = useState(true);

    let {clearCart} = useContext(CartContext);
    let {handleClearCart} = useContext(StoreContext);

    
    useEffect(() => {
        if (reset) {
            clearCart();
            setReset(false);
        }
    }, [reset]);


  return (
    <>
        <div className='main'>
            <div className='landing'>
            <header className='landing-header'>
                <div>
                    <h1>Thank you for your order!</h1>
                    <p>You will receive an email confirmation shortly.</p>
                    <Button variant="primary" onClick={(e) => handleClearCart(e)} style={{ borderRadius: '7px' }}>
                        <Link to='/store' style={{ textDecoration: 'none', color: 'inherit' }}>
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            </header>
            </div>
        </div>
    </>
  )
}

export default SuccesPage

