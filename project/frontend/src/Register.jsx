import React, { useState } from "react";

import { registerUser } from "./services/api";

import "./Movies.css";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // HANDLE REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const response = await registerUser({
        name,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", response);

      // ERROR HANDLING
      if (!response.success) {

        setError(
          response?.detail?.message ||
          response.message ||
          "Registration Failed"
        );

        return;
      }

      // SUCCESS
      setSuccess(response.message);

      // CLEAR FORM
      setName("");

      setEmail("");

      setPassword("");

    } catch (err) {

      console.log(err);

      setError("Registration Failed");

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="register-container">

      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <h2 className="register-heading">
          Register
        </h2>


        {/* SUCCESS */}
        {success && (
          <p className="register-success">
            {success}
          </p>
        )}


        {/* ERROR */}
        {error && (
          <p className="register-error">
            {error}
          </p>
        )}


        {/* LOADING */}
        {loading && (
          <p className="register-loading">
            Loading...
          </p>
        )}


        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="register-input"
          required
        />


        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="register-input"
          required
        />


        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="register-input"
          required
        />


        {/* BUTTON */}
        <button
          className="register-button"
          disabled={loading}
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

      </form>

    </div>
  );
}

export default Register;