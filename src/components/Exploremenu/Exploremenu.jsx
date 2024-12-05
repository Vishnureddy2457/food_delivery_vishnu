import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='exploremenu' id='exploremenu'>
      <h1>Explore our menu</h1>
      <p className='exploremenu-text'>Our menu offers fresh salads, soft rolls, and sweet desserts like cakes and puddings. Enjoy hearty sandwiches, creamy pasta, and flavorful noodles cooked to perfection. For vegetarians, our pure veg dishes are made with wholesome, fresh ingredients.</p>
      <div className="exploremenu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="exploremenu-list-item">
                    <img className={category===item.menu_name?"active":""}src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Exploremenu
