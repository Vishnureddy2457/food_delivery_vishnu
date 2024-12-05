import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Loginpopup.css';
import { assets } from "../../assets/assets";
import Profile from "../../pages/Profile/Profile";

const Loginpopup = ({ setshowlogin, setIsLoggedIn }) => {
  const [currentstate, setcurrentstate] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store any error message
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate(); // Use navigate for redirecting to profile page

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setLoggedInEmail(storedEmail);
      setIsLoggedIn(true); // Set logged in state to true
    }
  }, [setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currentstate === "Sign Up" ? "http://localhost:3001/users" : "http://localhost:3001/users?email=" + email;

    const response = await fetch(url);
    const data = await response.json();

    if (currentstate === "Login") {
      const user = data.find((user) => user.email === email && user.password === password);
      if (user) {
        setLoggedInEmail(email);
        setIsLoggedIn(true); // Update login state
        setError(""); // Clear error
        localStorage.setItem("email", email); // Store the email in localStorage
        navigate("/profile"); // Redirect to the profile page using useNavigate
      } else {
        setError("Authentication failed! Invalid email or password.");
      }
    } else {
      const newUser = {
        email,
        password,
        username: email.split("@")[0] // Use part of email as a default username
      };

      const signupResponse = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (signupResponse.ok) {
        alert("Account created successfully!");
        setcurrentstate("Login");
      } else {
        alert("Error creating account.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    setLoggedInEmail("");
    setIsLoggedIn(false); // Set logged in state to false
    setEmail("");
    setPassword("");
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="Loginpopup">
      <form className="loginpopup-container" onSubmit={handleSubmit}>
        <div className="loginpopup-title">
          <h2>{currentstate}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="loginpopup-inputs">
          {currentstate === "Sign Up" && (
            <input type="text" placeholder="Enter Username" required />
          )}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {currentstate === "Sign Up" ? "Create Your Account" : "Login"}
        </button>
        <div className="Loginpopup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & Privacy policy</p>
        </div>
        {currentstate === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setcurrentstate("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrentstate("Login")}>Login Here</span>
          </p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      </form>
    </div>
  );
};

export default Loginpopup;
