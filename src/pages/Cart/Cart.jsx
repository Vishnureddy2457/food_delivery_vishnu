import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartitems, food_list, removefromcart, gettotalcartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);  // State to store the cart ID

  // Fetch the cart ID from the server when the component mounts
  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const response = await fetch('http://localhost:3001/cart');
        const data = await response.json();
        if (data.length > 0) {
          // If a cart exists, use the first cart ID
          setCartId(data[0].id);
        } else {
          // If no cart exists, create a new cart and use its ID
          const newCart = await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: [], totalAmount: 0 }),
          });
          const newCartData = await newCart.json();
          setCartId(newCartData.id);
        }
      } catch (error) {
        console.error('Error fetching cart ID:', error);
      }
    };

    fetchCartId();
  }, []);

  // Handle saving the cart data to the JSON server
  const handleSaveCartToServer = async () => {
    if (!cartId) return;  // Prevent saving if cartId is not set

    const cartData = food_list
      .filter((item) => cartitems[item._id] > 0)
      .map((item) => ({
        title: item.name,
        price: item.price,
        quantity: cartitems[item._id],
        total: item.price * cartitems[item._id],
      }));

    const totalAmount = gettotalcartAmount() + 2; // Adding delivery fee if necessary

    try {
      // Use PUT to update the cart data with the specific cart ID
      const response = await fetch(`http://localhost:3001/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cartData,
          totalAmount: totalAmount,
        }),
      });

      if (response.ok) {
        alert('Cart saved successfully!');
      } else {
        alert('Failed to save the cart.');
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = async (itemId) => {
    removefromcart(itemId);

    if (!cartId) return;  // Prevent saving if cartId is not set

    // Updating the cart data on the server after removal
    try {
      const response = await fetch(`http://localhost:3001/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: food_list.filter((item) => cartitems[item._id] > 0).map((item) => ({
            title: item.name,
            price: item.price,
            quantity: cartitems[item._id],
            total: item.price * cartitems[item._id],
          })),
          totalAmount: gettotalcartAmount() + 2, // Recalculate total
        }),
      });

      if (!response.ok) {
        alert('Failed to remove item from server.');
      }
    } catch (error) {
      console.error('Error removing item from server:', error);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>₹{item.price * cartitems[item._id]}</p>
                  <p onClick={() => handleRemoveFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-buttom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{gettotalcartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{gettotalcartAmount() === 0 ? 0 : 2}</p>
          </div>
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{gettotalcartAmount() === 0 ? 0 : gettotalcartAmount() + 2}</p>
          </div>
          <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
          <button onClick={handleSaveCartToServer}>Save Cart</button>
        </div>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promocode, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
