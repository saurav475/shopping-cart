import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { IoMenu } from "react-icons/io5";
import '../styles/header.css';

const Header = () => {
  const { user, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container flex-between">
        <Link to="/" className="logo">
          ShopCart
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <IoMenu />
        </button>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          {isAdmin && (
            <Link to="/admin/products" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>
                Orders
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <FaUser /> Profile
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </nav>

        {!isAdmin && (
          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
