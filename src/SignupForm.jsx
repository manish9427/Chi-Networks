// SignupForm.js
import React, { useState } from "react";
import LoginForm from "./LoginForm"; // Import the LoginForm component

const SignupForm = ({ onSignup, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && password) {
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify({ username, password }));
      // Notify parent component about the signup and set user state
      onSignup({ username, password });
    } else {
      console.error("Username and password are required.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>

      {/* Show login option after successful signup */}
      <p>Already have an account? Login below:</p>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default SignupForm;
