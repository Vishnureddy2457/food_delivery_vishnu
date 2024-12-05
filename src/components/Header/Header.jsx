import React from 'react'
import './Header.css'
import Exploremenu from '../Exploremenu/Exploremenu'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header' id='/'>
      <div className="header-contents">
        <h2>Order for your favourite food</h2>
        <p>choose your fav food in array of dishes</p>
        <h3>Healthy Food</h3>
      </div>
    </div>
  )
}

export default Header
