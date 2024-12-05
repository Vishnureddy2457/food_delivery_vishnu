import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import Profile from './pages/Profile/Profile'

const App = () => {
  const [showlogin,setshowlogin]=useState(false)
  return (
    <>
    {showlogin?<Loginpopup setshowlogin={setshowlogin}/>:<></>}
      <div className='app'>
        <Navbar setshowlogin={setshowlogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/Profile" element={<Profile/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
