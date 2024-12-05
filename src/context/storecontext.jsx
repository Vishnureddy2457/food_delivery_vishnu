import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const[cartitems,setcartitems]=useState({})

    const addtocart = (itemId) => {
        if(!cartitems[itemId]){
            setcartitems((prev)=>({...prev,[itemId]:1}))
        }else{
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removefromcart = (itemId) => {
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]
            -1
        }))
    }

    const gettotalcartAmount=()=>{
        let totalAmount = 0
        for(const item in cartitems){
            if(cartitems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item)
                totalAmount+=iteminfo.price*cartitems[item]

            }
        }
        return totalAmount;
    }

    const contextvalue = {
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotalcartAmount
    }

    return (
        <StoreContext.Provider value={contextvalue}>
        {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider