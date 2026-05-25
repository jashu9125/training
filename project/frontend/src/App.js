import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./loginpage/LoginPage";
import Register from "./Register";
import Movies from "./Movies";

function App() {
  return (
    <BrowserRouter>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
     
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/movies"
          element={<Movies />}
        />

      </Routes>

    </BrowserRouter>
  );
}

const styles = {
  nav: {
    padding: "15px",
    background: "#222",
    display: "flex",
    gap: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default App;