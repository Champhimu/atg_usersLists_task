import React from 'react'
import { Navbar} from 'react-bootstrap'
import Logo from '../images/Logo.png'

const Header = () => {
  
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#" className='me-auto'>
        <div style={{color: "#5C5D5D", marginLeft: '20%', fontSize: 'xx-large'}}>
        <span style={{ color: "#27A365" }}>ATG.</span>W
        <span>
          <img style={{ marginBottom: "5px" }} src={Logo} alt="logo" />
        </span>RLD
        </div>
      </Navbar.Brand>
    </Navbar>
    </>
  )
}

export default Header
