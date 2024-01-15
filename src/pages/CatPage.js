import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { listProduct } from '../api/productApi';
import ListProduct from '../components/product/ListProduct';
import '../static/css/pages.css'; 
import AuthContext from '../context/AuthContext';
import { detailCustomer } from '../api/customerApi';
import { addOrder, detailOrder } from '../api/orderApi';
import CartContext from '../context/CartContext';
import StoreContext from '../context/StoreContext';
 


  

const CatPage = () => {
        

    let {customer} = useContext(CartContext);
    let {order, productCat} = useContext(StoreContext);

    // Getting our customer value
    // let {user} = useContext(AuthContext);
    // const user_id = String(user?.user_id);


    // const { data: customer } = useQuery( 
    //     ['customer', user_id],
    //     () => detailCustomer({ user_id })
    // );
    // console.log('Customer:', customer);
 

    // const customer_id = String(customer?.id)

    // // // Getting or creating user order
    // const { data: existingOrder } = useQuery(
    //     ['existingOrder', customer_id],
    //     () => detailOrder({ customer_id: customer_id }),

    //     {
    //         enabled: !!customer,

    //         staleTime: 1000 * 60 * 5, // 5 minutes


    //         onSuccess: (existingOrder) => {
    //             console.log('Existing order found:', existingOrder);
    //         },

    //         onError: (error) => {
    //             console.error('error creating order:', error);
    //         }
    //     }
    // );


    console.log('Order: ', order)
    console.log('Customer: ', customer)
    

    
    return (
        <>
            <div className='main'>
                <Container>
                    <Row>
                    {productCat.map((product) => (
                        <Col lg={1} className='col-lg-4'>
                            <ListProduct key={product.id} product={product} />
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CatPage; 


