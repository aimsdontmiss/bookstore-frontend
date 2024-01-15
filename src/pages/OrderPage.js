import { React, useContext }  from 'react';
import CartContext from '../context/CartContext';
import '../static/css/pages.css';
import arrowUp from '../static/images/buttons/arrowUp.png';
import arrowDown from '../static/images/buttons/arrowDown.png';
import { Link } from 'react-router-dom';
import StoreContext from '../context/StoreContext';
import ArrowButton from '../components/product/buttons/ArrowButton';
import { useStripe } from '@stripe/react-stripe-js';
import { API_URL } from '../config';



function OrderPage() {


    const {
        items, 
        totalQuantity, 
        priceQuantity, 
        addItem,
        removeItem
        } = useContext(CartContext);
  
    const { order, addOrderItems, orderItem, fetchCSRFToken } = useContext(StoreContext);

    const order_id = order?.id;

    // const stripe = useStripe();

    // csrfToken = fetchCSRFToken();

    // const handleCheckout = async () => {
    //   // Call your backend API to create a checkout session
    //   const response = await fetch(`/create-checkout-session/${order_id}/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRFToken': csrfToken,
    //     },
    //   });
  
    //   const session = await response.json();
  
    //   // Redirect to Stripe Checkout
    //   const result = await stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });
  
    //   if (result.error) {
    //     // Handle any errors that occurred during redirect
    //     console.error(result.error.message);
    //   }
    // }

    // const addCombinedItem = async (order_id, id, title, price) => {
    //     product_id = id
    //     try {
    //       // Call addOrderItem function
    //       await addOrderItem(order_id, product_id);
      
    //       // Call addItem function
    //       await addItem(id, title, price);
      
    //       // You can add any additional logic here if needed
      
    //       console.log('Both addItem and addOrderItem executed successfully.');
    //     } catch (error) {
    //       console.error('Error in addCombinedItem:', error);
    //     }
    //   };
      
    
    
    // console.log('Order Items: ', orderItem)

    // const order_id = String(order?.id);

    // const addCombinedItem = async (id, title, price) => {

        
    //     try {

    //         // Call addItem function
    //         await addItem(id, title, price);
            
    //         // Call addOrderItem function
    //         await addOrderItems({order_id, product_id: id});

    //         // You can add any additional logic here if needed

    //         console.log('Both addItem and addOrderItem executed successfully.');
    //     } catch (error) {
    //         console.error('Error in addCombinedItem:', error);
    //     }
    //     };



    return (
      <>

        <div className='main'>
            <div className="box-element">
                <div className="cart-row">
                    <Link className="btn btn-outline-dark"
                        style={{maarginTop:'13px'}}
                        to='/store'>
                            &#x2190;
                            Continue Shopping
                    </Link>
                </div>
            
                <div className="cart-row">
                    <table className="table">
                        <tr>
                            <th className='th'><h5>Items:
                            <strong> {totalQuantity}</strong></h5></th>

                            <th className='th'><h5>Total:
                            <strong> ${priceQuantity}</strong></h5></th>

                            <th>
{/* 
                                <Link
                                to='/my-order/checkout'
                                style={{float:'center', paddingLeft:'5px'}}
                                className="btn btn-success">
                                    Checkout
                                </Link> */}

                                
                                {/* <Link
                                    to={`/create-checkout-session/${order_id}/`}
                                    style={{float:'center', paddingLeft:'5px'}}
                                    className="btn btn-success" method="POST">
                                    Checkout
                                </Link> */}
                                <form action={`${API_URL}create-checkout-session/${order_id}/`} method="POST">
                                    <button type="submit" style={{float:'center'}}
                                    class="btn btn-success hover-light">
                                        Checkout
                                    </button>
                                </form>
{/* 
                                <button type="button" onClick={handleCheckout} className="btn btn-success">
                                    Checkout
                                </button> */}

                            </th>

                        </tr>
                    </table>
                </div>    
            </div>
            <div className="box-element">
                <div className="cart-row">
                    <div className="col-lg-3"><strong>Item</strong></div>
                    <div className="col-lg-3"><strong >Price</strong></div>
                    <div className="col-lg-3"><strong >Quantity</strong></div>
                    <div className="col-lg-3"><strong >Total</strong></div>
                </div>
                
                {items.map((item, id) => (
                <div className="cart-row">
                    <div className="col-lg-3" key={id}>
                        <Link key={item.id} to={`/store/${item.id}`} style={{ textDecoration: 'none', color: 'maroon'}}>
                            {item.title}
                        </Link>
                        
                    </div>
                    <div className="col-lg-3" key={id}>${item.price}</div>
                    {/* <div className="col-lg-3" key={id}>                    
                        <button style={{ textDecoration: 'none', marginRight: '7px'}} onClick={() => removeItem( item.title )}>
                            <img src={arrowDown} className='chg-quantity' alt='remove-item-arrow'/>
                        </button>
                        {item.qty}
                        <button style={{ textDecoration: 'none', marginLeft: '7px'}} onClick={() => addItem(item.id, item.title, item.price)} >
                            <img src={arrowUp} className='chg-quantity' alt='add-item-arrow'/>
                        </button>
                    </div> */}
                    <ArrowButton key={id} product={item} />
                    <div className="col-lg-3" key={id}>${(item.price*item.qty).toFixed(2)}</div>
                </div>
                ))}
  
          </div>
        </div>
          
    </>
  )
}

export default OrderPage;