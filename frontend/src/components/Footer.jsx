import React from "react";
import { Link } from "react-router-dom";
import "../comp_css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>Consumer Policy</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Report Abuse & Takedown Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>Impact@eCommerceApp</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>E-Commerce</h4>
          <ul>
            <li>Product App</li>
            <li>Sell on our Website</li>
            <li>Media Reports</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Developer Profile</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/qa-shah/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/qa_shah7/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/share/1DJ8PHas37/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="mailto:shahiitp07@gmail.com" target="_blank" rel="noopener noreferrer">
                shahiitp07@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Subscribe</h3>
          <div className="subscribe-box">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <p>
            Register now to get updates on promotions and coupons
          </p>
          <p className="admin-link" >
            <Link to="/admin-Login"  style={{color:"white"}}>Admin Access</Link>
          </p>
        </div>
      </div>
      <div className="footer-images">
        {/* <div>
          <img src={footer1} alt="Footer 1" />
        </div>
        <div>
          <img src={footer2} alt="Footer 2" />
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
