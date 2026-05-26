import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      // ✅ CORRECT LOGIN CALL
      const response = await loginUser(
        email,
        password
      );

      console.log(response);

      alert("Login Successful");

      navigate("/movies");

    } catch (err) {

      console.log(err);

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {loading && (
          <p>Loading...</p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}

export default LoginPage;