import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/storecontext';
import '../Cart/Cart.css';

const PlaceOrder = () => {
  const { gettotalcartAmount } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the JSON server when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/cart');
        if (response.ok) {
          const data = await response.json();
          setCartItems(data); // Set the cart items in the state
        } else {
          console.error('Failed to fetch cart items.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const totalAmount = gettotalcartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 2;
    const finalTotal = totalAmount + deliveryFee;

    const orderData = {
      ...formData,
      cartTotal: finalTotal,
      cartItems: cartItems // Add the fetched cart items here
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="placeorder">
      <div className="placeorder-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>

      <div className="placeorder-right">
        <h2>Cart Total</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${gettotalcartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${gettotalcartAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>${gettotalcartAmount() === 0 ? 0 : gettotalcartAmount() + 2}</p>
        </div>
        <hr />
        <button onClick={handlePlaceOrder}>Proceed To Payment</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
