import React, {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./loginpage/LoginPage";
import Register from "./Register";
import Movies from "./Movies";
import Favorites from "./Favorites";
import MovieDetails from "./MovieDetails";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

function App() {

  const [isAuth, setIsAuth] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    setIsAuth(!!token);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    setIsAuth(false);

    window.location.href = "/";
  };

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
      />

      <nav className="navbar">

        <Link
          to="/"
          className="nav-link"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="nav-link"
        >
          Register
        </Link>

        {isAuth && (
          <>

            <Link
              to="/movies"
              className="nav-link"
            >
              Movies
            </Link>

            <Link
              to="/favorites"
              className="nav-link"
            >
              Favorites
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          </>
        )}

      </nav>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:imdbID"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;