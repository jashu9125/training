import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleSubmit = (e) => {

    e.preventDefault();

    // Demo Login Validation
    if (email === "admin@gmail.com" && password === "123456") {

      alert("Login Successful!");

      // Navigate to Movies Page
      navigate("/movies");

    } else {

      alert("Invalid Email or Password");

    }
  };

  return (

    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default LoginPage;