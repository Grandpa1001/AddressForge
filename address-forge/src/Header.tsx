// In your App.js or a component file

import React from 'react';
import logo from './Logo.png'
import './Header.css'; // Make sure to create a Header.css file with the styles

function Header() {
  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    console.log('Wallet Connect button clicked');
  };

  return (
    <header className="header">
      <img src={logo} alt="AddressForge Logo" className="logo" />
      <h1 className="header-title">AddressForge</h1>
   </header>
  );
}

export default Header;
