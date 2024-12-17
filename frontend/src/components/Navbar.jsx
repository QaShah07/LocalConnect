import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../comp_css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");
  const name = localStorage.getItem("name");

  // Handle scrolling to add or remove styles dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("cartid");
    localStorage.removeItem("name");

    alert("Logout Successfully.");
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolling ? "navbar-scrolling" : ""}`}>
      {/* Logo Section */}
      <div className="logo" onClick={() => navigate("/")}>
        Local~Connect
      </div>

      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onClick={() => navigate("/product")}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {/* Icons Section */}
      <div className="iconbutton">
        {/* Cart Button */}
        <div
          className="cart-button"
          onClick={() => navigate("/user/cart")}
        >
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          <p>Cart</p>
        </div>

        {/* User Buttons */}
        {userId ? (
          <>
            {/* User Profile */}
            <div
              className="login-button"
              onClick={() => navigate("/user/order-details")}
            >
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              {name}
            </div>

            {/* Logout */}
            <div className="logout-button" onClick={handleLogoutClick}>
              Logout
            </div>
          </>
        ) : (
          <>
            {/* Login */}
            <div className="login-button" onClick={handleLoginClick}>
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              Login
            </div>

            {/* Sign In */}
            <div
              className="signin-button"
              onClick={() => navigate("/register-user")}
            >
              Sign In
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;