import React, {
  useState
} from "react";

import {
  toast
} from "react-toastify";

import {
  registerUser
} from "./services/api";

import "./Movies.css";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (name.trim().length < 3) {
      setError(
        "Name must be minimum 3 characters"
      );
      return;
    }

    if (!email.includes("@")) {
      setError(
        "Enter valid email"
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be minimum 6 characters"
      );
      return;
    }

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const response =
        await registerUser({
          name,
          email,
          password
        });

      if (!response.success) {

        setError(
          response.message
        );

        return;
      }

      setSuccess(
        response.message
      );

      toast.success(
        "Registration Successful"
      );

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {

      console.log(err);

      setError(
        err.message ||
        "Registration Failed"
      );

      toast.error(
        err.message
      );

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

        {success && (
          <p className="register-success">
            {success}
          </p>
        )}

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <label>Name</label>

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

        <label>Email</label>

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

        <label>Password</label>

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

        <button
          className="register-button"
          disabled={loading}
        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

      </form>

    </div>
  );
}

export default Register;