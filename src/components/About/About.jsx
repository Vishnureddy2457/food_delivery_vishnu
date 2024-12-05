import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container" id='About'>
      <h1>About Us</h1>
      <p className="about-description">
        All about the hub and the passionate people behind our food delivery service.
        Meet our team and learn more about us!
      </p>
      <div className="staff-container">
        <div className="staff-box">
          <img src="https://png.pngtree.com/png-vector/20210921/ourlarge/pngtree-flat-people-profile-icon-png-png-image_3947764.png" alt="Jason Strother" className="staff-photo" />
          <h2>Vishnu</h2>
          <p className="role">OWNER</p>
          <ul className="skills">
            <li>WEB DEVELOPER</li>
            <li>FULL STACK DEVELOPER</li>
          </ul>
        </div>
        <div className="staff-box">
          <img src="https://png.pngtree.com/png-vector/20210921/ourlarge/pngtree-flat-people-profile-icon-png-png-image_3947764.png" alt="Isaac Neale" className="staff-photo" />
          <h2>Surya</h2>
          <p className="role">Chef Extraordinaire</p>
          <ul className="skills">
            <li>Fencing (Left Hand)</li>
            <li>Fluent in 3 Languages</li>
            <li>Auctioneer</li>
          </ul>
        </div>
        <div className="staff-box">
          <img src="https://png.pngtree.com/png-vector/20210921/ourlarge/pngtree-flat-people-profile-icon-png-png-image_3947764.png" alt="Nathan Boaldin" className="staff-photo" />
          <h2>Sharath</h2>
          <p className="role">Food Enthusiast</p>
          <ul className="skills">
            <li>Speed Writing</li>
            <li>Cup Stacking</li>
          </ul>
        </div>
        <div className="staff-box">
          <img src="https://png.pngtree.com/png-vector/20210921/ourlarge/pngtree-flat-people-profile-icon-png-png-image_3947764.png" alt="Nathan Boaldin" className="staff-photo" />
          <h2>Karthik</h2>
          <p className="role">Delivery Coordinator</p>
          <ul className="skills">
            <li>Certified Nut Shucker</li>
            <li>Turtle Whisperer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
