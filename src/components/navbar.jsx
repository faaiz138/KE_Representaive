import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import logoimg from '../pages/Login/LOGO.png'
import { Link } from 'react-router-dom';
function TransparentNavbar() {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const appBarStyle = {
    backgroundColor: isSolid ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
    boxShadow: 'none',
    position: 'fixed',
    transition: 'background-color 0.3s ease',
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const logoStyle = {
    height: 40,
  };
  const loginLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    borderColor: '#fff',
    marginRight: 10,
    fontSize: '1.1rem',
  };
  const loginButtonStyle = {
    color: '#fff',
    borderColor: '#fff',
    marginRight: 10,
    fontSize: '1rem', // add font size to adjust button size
    width: '8%',
  };

  return (
    <AppBar position="fixed" style={appBarStyle}>
      <Toolbar style={toolbarStyle}>
        <img src= {logoimg} alt="Logo" style={logoStyle} />
        <div style={{ flexGrow: 1 }}></div>
        <Button variant="outlined" style={loginButtonStyle}>
        <Link to="/login" style={loginLinkStyle}>
          Login
        </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TransparentNavbar;
