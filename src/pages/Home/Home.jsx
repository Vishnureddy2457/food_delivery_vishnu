import React, { useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Fooddisplay from '../../components/fooddisplay/Fooddisplay'
import Appdownload from '../../components/Appdownload/Appdownload'
import About from '../../components/About/About'

const Home = () => {

const[category,setcategory]=useState("All")

  return (
    <div >
      <Header/>
      <Exploremenu category={category}  setcategory={setcategory}/>
      <Fooddisplay category={category}/>
      <About/>
      <Appdownload/>
    </div>
  )
}

export default Home
