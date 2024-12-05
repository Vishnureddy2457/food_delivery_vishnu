import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null); // To store user profile data
  const [orders, setOrders] = useState([]); // To store user orders (can be fetched or hardcoded)
  const [showOrders, setShowOrders] = useState(false); // Toggle orders view
  const navigate = useNavigate();

  // Fetch user data based on the email stored in localStorage
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    if (!loggedInEmail) {
      navigate("/"); // Redirect to home or login page if no email found
    } else {
      // Fetch the user data
      fetch(`http://localhost:3001/users?email=${loggedInEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setUserData(data[0]); // Set the user data (only one user with that email)
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));

      // You can also fetch orders for the user from a separate endpoint if needed
      fetch(`http://localhost:3001/orders?email=${loggedInEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data); // Set user orders
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [navigate]);

  // Logout function to remove email from localStorage and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="profile-container">
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}</h1>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>

          {/* Button to toggle order visibility */}
          <button onClick={() => setShowOrders(!showOrders)}>
            {showOrders ? "Hide Orders" : "View Orders"}
          </button>

          {/* Conditionally display orders */}
          {showOrders && (
            <div className="orders-section">
              <h2>Your Orders</h2>
              {orders.length === 0 ? (
                <p>You have no orders yet.</p>
              ) : (
                orders.map((order, index) => (
                  <div key={index} className="order-item">
                    <p>Order #{order.id}</p>
                    <p>Status: {order.status}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p> // Loading message while fetching data
      )}
    </div>
  );
};

export default Profile;
