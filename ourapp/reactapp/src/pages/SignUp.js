import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";

export default function UserLanding() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const signUpUser = () => {
    // Your sign-in logic here
    // ...
  };

  useEffect(() => {
    // Your existing useEffect code
    // ...
  }, []);

  return (
    <main className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to HeartCoded</h1>
        <p className="hero-subtitle">Sign up to find your soulmate today!</p>
        
        <div className="user-init-container">
          <input
            className="user-init-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <input
            type="password"
            className="user-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set Password"
          />
          <input
            type="password"
            className="user-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button className="user-init-button" onClick={signUpUser}>
            Sign Up
          </button>
          
      
        </div>
      </div>
    </main>
  );
}