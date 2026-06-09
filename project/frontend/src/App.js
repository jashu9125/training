import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./loginpage/LoginPage";
import Register from "./Register";
import Favorites from "./Favorites";
import MovieDetails from "./MovieDetails";
import ProtectedRoute from "./ProtectedRoute";
import Recommendations from "./Recommendations";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
      />

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
              <Dashboard />
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

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
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