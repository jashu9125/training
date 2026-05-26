import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LoginPage from "./loginpage/LoginPage";

import Register from "./Register";

import Movies from "./Movies";

import Favorites from "./Favorites";

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";


function App() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  const isAuth =
    localStorage.getItem("token");


  return (

    <BrowserRouter>

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

      </Routes>

    </BrowserRouter>
  );
}

export default App;