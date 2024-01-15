import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import '../static/css/pages.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { detailCustomer } from '../api/customerApi';
import CartContext from '../context/CartContext';



function LoginPage() {

  let {loginUser, user} = useContext(AuthContext);
  let {clearCart} = useContext(CartContext);

  const [customer, setCustomer] = useState(null); // Initialize as null


  const { data, isSuccess } = useQuery(
    ['customer', user?.id], // Pass the user ID as a query key when user is available
    () => detailCustomer({ id: user?.id }), // Fetch the customer data when user is available
    {
      enabled: !!user, // Enable the query only when the user is available
      onSuccess: (data) => {
        setCustomer(data); // Set the customer data when the query is successful
      },
    }
  );


  const handleLogin = (e) => {
    e.preventDefault();
    clearCart();
    loginUser(e);
    console.log(customer);
  };
  

  return (
    <>
      <div className='main'>

        <Container>
          <h2>Login Page</h2>
          <br/>
          <form onSubmit={handleLogin}>
            <input type='text' name='username' placeholder='Enter Username' />
            <input type='password' name='password' placeholder='Enter Password' />  
            <input type='submit'/>
          </form> 
        </Container>
        
      </div>
   
        
    </>
  )
}

export default LoginPage;