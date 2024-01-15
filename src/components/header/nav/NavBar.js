import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Cart from '../../cart/Cart';
import { Link } from 'react-router-dom';
import logoName from '../nav/logoName.png';
// import logoBrand from '../nav/logoBrand.png';
import logoShop from '../nav/logoShop.png';
import './nav.css';




const NavBar = () => {
  return (
    <>
      <div style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
        <Navbar className='mb-2 custom-navbar' collapseOnSelect expand='lg' variant='dark'>
          <Container>
            <Navbar.Brand href="/" className="ml-2 ml-md-auto">
              <div style={{ width: '150px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logoShop} alt='logo-brand' style={{ width: '80px', height: '66px', backgroundBlendMode: 'lighten' }} />
                <img src={logoName} alt='logo-name' style={{ maxWidth: '100%', maxHeight: '149%',  objectFit: 'contain'}}/>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='#features'>Features</Nav.Link>
                <Nav.Link href='/store'>Store</Nav.Link>  
              </Nav>
            </Navbar.Collapse>
            <Nav>
              <Link to='#'>
                <Cart /> 
              </Link>
            </Nav>
             
          </Container> 
        </Navbar>
      </div>
    </>
  )
}

export default NavBar;