import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div id='footer' className='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2 className="footer-logo">🛒 Princi Maligai</h2>
                    <p>Your trusted partner for fresh groceries in Tamil Nadu. We deliver farm-fresh vegetables, fruits, authentic rice varieties, and traditional snacks right to your doorstep across Chennai, Coimbatore, Madurai, Trichy, and Salem.</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+91 98765 43210</li>
                        <li>support@nammagrocery.com</li>
                    </ul>
                    <div className="delivery-cities">
                        <h3>We deliver to:</h3>
                        <p>Chennai • Coimbatore • Madurai • Trichy • Salem</p>
                    </div>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">© 2024 Princi Maligai - Fresh Groceries, Tamil Nadu's Favorite! All Rights Reserved.</p>

        </div>
    )
}

export default Footer;

