import React from 'react';
import logo from '../holberton-logo.png';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Holberton Logo" />
      <h1>School dashboard</h1>
    </header>
  );
}

export default Header;