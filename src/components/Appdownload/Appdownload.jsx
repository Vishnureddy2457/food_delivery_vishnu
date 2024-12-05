import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'

const Appdownload = () => {
  return (
    <div className='Appdownload' id='Appdownload'>
      <p>Better Experience Download <br /> Foody App</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default Appdownload
