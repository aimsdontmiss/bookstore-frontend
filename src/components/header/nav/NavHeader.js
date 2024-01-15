import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../../pages/LoginPage';
import { Container } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import './nav.css';
import CartContext from '../../../context/CartContext';
import StoreContext from '../../../context/StoreContext';


const NavHeader = () => {
  
  const history = useNavigate()
  
  let {user, logoutUser} = useContext(AuthContext);
  let {handleClearCart} = useContext(StoreContext);


  const handleLogout = (e) => {
    e.preventDefault();
    handleClearCart(e);
    logoutUser();
    history('/login')
  };


  return (

    <>
        <Container className='custom-header'>
          {user ? (
            <>
              <Link>{user.username}</Link> 
              <span> | </span>
              <Link onClick={handleLogout}>  
                Logout
              </Link>
            </>

          ) : (
            <>
              <Link to='/login'>Login</Link> 
              <span> | </span>
              <Link to='/register'>Register</Link>
            </>
              

          )}
                
        </Container>
      
        
    </>
  )
}

export default NavHeader;