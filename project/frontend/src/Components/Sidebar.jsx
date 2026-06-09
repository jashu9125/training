import {
  FaHome,
  FaHeart,
  FaStar,
  FaSignOutAlt
} from "react-icons/fa";

import "../Dashboard.css";

import { Link } from "react-router-dom";

function Sidebar() {

  const logout = () => {

    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <div className="sidebar">

      <h2 className="logo">
        MovieFlix
      </h2>

      <Link to="/movies">
        <FaHome /> Home
      </Link>

      <Link to="/favorites">
        <FaHeart /> Favorites
      </Link>

      <Link to="/recommendations">
        <FaStar /> Recommendations
      </Link>

      <button
        className="logoutBtn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;