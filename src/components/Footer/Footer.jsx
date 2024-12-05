import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1>FOODY</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio deserunt id quaerat mollitia reiciendis, beatae earum quia deleniti, est vitae provident fugiat quasi minima similique sunt laborum ducimus numquam iure.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+919234567892</li>
    <li>vishnu@gmail.com</li>
</ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">Copyright 2024 @ foody.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
