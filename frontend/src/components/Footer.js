import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content grid grid-3">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>ShopCart is your one-stop destination for quality products at great prices.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Shop</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/">Help Center</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center mt-2">
          <p>&copy; 2024 ShopCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
