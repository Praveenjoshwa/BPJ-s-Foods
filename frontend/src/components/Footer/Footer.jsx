import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div id='footer' className='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio expedita quaerat beatae deleniti! Itaque magnam placeat laborum obcaecati, fuga sunt, sequi ipsum, doloribus vitae incidunt repudiandae. Saepe, cum reiciendis.</p>
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
                    <li>+91 987456123</li>
                    <li>contact@toma.com</li>
                </ul>
            </div>
        </div>
            <hr />
        <p className="footer-copyright">Copyrights 2024 Toma.com -All Rights Reserverd</p>

    </div>
  )
}

export default Footer;
