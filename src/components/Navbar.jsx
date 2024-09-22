import React, { useState, useEffect } from 'react';
import "../assets/navbar.css";
import { Icon } from "@iconify/react";
import UserDropdown from './UserDropdown';

function Navbar({ selectedCount, toggleCart, currentUser, onLoginClick, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navbg = document.querySelector('.nav-bg');

    const handleMenuToggle = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
      navbg.classList.toggle('active');
    };

    menuIcon.addEventListener('click', handleMenuToggle);

    return () => {
      menuIcon.removeEventListener('click', handleMenuToggle);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="#" className="logo">
          Second Lab
        </a>
        <i className="bx bx-menu" id="menu-icon"></i>
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">Collections</a>
          <a href="#">Merch</a>
          <a href="#">Hats</a>
          {currentUser ? (
            <div className="user-menu">
              <a href="#" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{currentUser.name}</a>
              {isDropdownOpen && <UserDropdown user={currentUser} onLogout={onLogout} />}
            </div>
          ) : (
            <a href="#" onClick={onLoginClick}>Login</a>
          )}
          <div className="cart-icon" onClick={toggleCart}>
            <Icon icon="tdesign:cart" width="30px" />
            {selectedCount > 0 && (
              <span className="cart-count">{selectedCount}</span>
            )}
          </div>
        </nav>
      </div>
      <div className="nav-bg"></div>
    </>
  );
}

export default Navbar;
