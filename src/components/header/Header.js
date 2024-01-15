import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import NavHeader from './nav/NavHeader';
import NavBar from './nav/NavBar';
import './nav/nav.css';


function Header () {
  return (
    <>
      <header style={{ position: 'sticky', top: '-33px', zIndex: '1000' }}>
        <Stack>
          <div className="p-1 custom-header">
            <NavHeader />  
          </div>
          <div className="p-0">
            <NavBar />
          </div>
        </Stack>
      </header>
    </>
  )
}

export default Header;