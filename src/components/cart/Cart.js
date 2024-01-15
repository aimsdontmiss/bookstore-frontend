import { React, useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import cartIcon from '../../static/images/buttons/cartIcon.png';
import './cart.styles.scss';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import ClearButton from '../product/buttons/ClearButton';
import StoreContext from '../../context/StoreContext';
//import { addOrder } from '../../api/orderApi';


const Cart = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let {totalQuantity, items} = useContext(CartContext);
    let {handleClearCart} = useContext(StoreContext);



    return (
        <>
   
            <Button variant="primary" onClick={handleShow}  style={{ borderRadius: '7px' }}>
                <div className='cart-container'>
                    <img src={cartIcon} alt='shopping-cart-icon' />
                    <span className='cart-count'> {totalQuantity} </span>
                </div> 
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>My Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                {items.map((item) => (
                    <p key={item.id}>{item.title}: {item.qty}</p>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={(e) => handleClearCart(e)} style={{ borderRadius: '7px' }}>
                        Clear Cart
                    </Button>
                    {/* <ClearButton /> */}
                    <Button variant="primary" onClick={handleClose} style={{ borderRadius: '7px' }}>
                        <Link to='/my-order' style={{ textDecoration: 'none', color: 'inherit' }}>
                            Proceed
                        </Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cart;