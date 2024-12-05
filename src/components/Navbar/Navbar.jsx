import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/storecontext';
import Loginpopup from '../Loginpopup/Loginpopup'; // Import the Loginpopup

const Navbar = () => {
  const [menu, setmenu] = useState('home');
  const { gettotalcartAmount } = useContext(StoreContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    setIsLoggedIn(true);
  };

  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
      <div className="navbar-menu-container">
        <ul className="navbar-menu">
          <Link to="/" onClick={() => setmenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
          <a href="#exploremenu" onClick={() => setmenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
          <a href="#About" onClick={() => setmenu('About')} className={menu === 'About' ? 'active' : ''}>About</a>
          <a href="#footer" onClick={() => setmenu('contact')} className={menu === 'contact' ? 'active' : ''}>Contact us</a>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/Cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={gettotalcartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {isLoggedIn ? (
          <div className="profile-icon">
            <Link to="/profile"><img src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzEucG5n.png" alt="Profile" /></Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>

      {showLogin && <Loginpopup setshowlogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
};

export default Navbar;
