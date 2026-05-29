import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  loginUser
} from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (!email.includes("@")) {
      setError("Enter valid email");
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

      await loginUser(
        email,
        password
      );

      toast.success(
        "Login Successful"
      );

      navigate("/movies");

    } catch (err) {

      console.log(err);

      setError(
        err.message ||
        "Login failed"
      );

      toast.error(
        err.message ||
        "Login failed"
      );

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
          <p className="error">
            {error}
          </p>
        )}

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
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
          required
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Please wait..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}

export default LoginPage;