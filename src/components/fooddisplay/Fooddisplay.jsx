import { StoreContext } from '../../context/storecontext'
import Fooditem from '../Food-item/Food-item'
import './Fooddisplay.css'


import React, { useContext } from 'react'

const Fooddisplay = ({category}) => {

    const {food_list}=useContext(StoreContext)

  return (
    <div className='fooddisplay' id='fooddisplay'>
      <h2>Top Dishes near you</h2>
      <div className="fooddisplay-list">
        {food_list.map((item, index) => {
          if(category==='All' || item.category==category){

            return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>  
          }

        })}
      </div>
      <hr />
    </div>
  )
}

export default Fooddisplay
