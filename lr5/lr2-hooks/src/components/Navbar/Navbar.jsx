import { useState, useEffect } from "react";
import "../Navbar/navbar.css";
import { Icon } from "@iconify/react";
import UserDropdown from "../Authorization/UserDropdown";
import { useCurrency, useCart, useUser } from '../../hooks/useAppContext';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Navbar({ toggleCart, onLoginClick, toggleHistory }) {
  const { currency, toggleCurrency } = useCurrency();
  const { selectedProducts } = useCart();
  const { currentUser, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");
    const navbg = document.querySelector(".nav-bg");

    const handleMenuToggle = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
      navbg.classList.toggle("active");
    };

    menuIcon.addEventListener("click", handleMenuToggle);

    return () => {
      menuIcon.removeEventListener("click", handleMenuToggle);
    };
  }, []);

  return (
    <>
      <div className="header">
        <Link to="/" className="logo">
          Fifth Lab
        </Link>
        <i className="bx bx-menu" id="menu-icon"></i>
        <nav className="navbar">
          <Link to="/all">All Products</Link>
          <Link to="/tshirts">T-Shirts</Link>
          <Link to="/hoodies">Hoodies</Link>
          <Link to="/accessories">Accessories</Link>
          <div className="history-icon" onClick={toggleHistory}>
            <Icon icon="mdi:history" width="24" height="24" />
          </div>
          {currentUser ? (
            <div className="user-menu">
              <a href="#" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {currentUser.name}
              </a>
              {isDropdownOpen && (
                <UserDropdown user={currentUser} onLogout={logout} />
              )}
            </div>
          ) : (
            <a href="#" onClick={onLoginClick}>
              Login
            </a>
          )}
          <div
            className="currency-toggle"
            onClick={(e) => {
              e.preventDefault(); // Prevents page reloads
              toggleCurrency();
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
								marginLeft: "10px",

              }}
            >
              <Icon
                icon={
                  currency === "USD"
                    ? "circle-flags:us"
                    : "emojione:flag-for-ukraine"
                }
                width="20"
                height="20"
                style={{ marginRight: 5 }}
              />
              <a href="" style={{ marginLeft: "0" }}>
                {currency}
              </a>
            </span>
          </div>
          <div className="cart-icon" onClick={toggleCart}>
            <Icon icon="tdesign:cart" width="30px" />
            {selectedProducts.length > 0 && (
              <span className="cart-count">{selectedProducts.length}</span>
            )}
          </div>
        </nav>
      </div>
      <div className="nav-bg"></div>
    </>
  );
}

Navbar.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  toggleHistory: PropTypes.func.isRequired
};

export default Navbar;
