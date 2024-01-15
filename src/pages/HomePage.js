import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../context/AuthContext';
import { detailCustomer } from '../api/customerApi';
import '../static/css/pages.css';
import CartContext from '../context/CartContext';



function HomePage() {

  // // Getting our initial customer value
  let {user} = useContext(AuthContext);
  // const user_id = String(user?.user_id);
  
  // const { data: customer } = useQuery(
  //   ['customer', user_id],
  //   () => detailCustomer({ user_id }),
  //   {
  //     enabled: !!user,

  //     staleTime: 1000 * 60 * 30, // 30 minutes

  //     onSuccess: (customer) => {
  //       console.log(customer); // Set the customer data when the query is successful
  //     },
  //   }
  // );

  let {customer} = useContext(CartContext);
  console.log(customer)
  
  return (
    <>
      <div className='main'>
        <div className='landing'>
          <header className='landing-header'>
          {user ? (
                <div> 
                  <h1>Welcome Home {user.username}</h1>
                  <p>Discover a world of knowledge with our vast collection of books.</p>
                  <a href='/store' className='cta-button'>Shop Now</a>
                </div>
              ) : (
                <div>
                  <h1>Welcome to Your Bookstore</h1>
                  <p>Discover a world of knowledge with our vast collection of books.</p>
                  <a href='/store' className='cta-button'>Shop Now</a>
                </div>
              )
          }
          </header>
        </div>
      </div>
    </>
  )
}

export default HomePage;