import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import "../assets/styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return isAuthenticated ? (
    <>
      {/* Navbar untuk Desktop */}
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/check-shipping">Cek Ongkir</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      {/* Navbar untuk Mobile */}
      <div className="mobile-navbar">
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/check-shipping" onClick={() => setIsMenuOpen(false)}>
              Cek Ongkir
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </>
  ) : null;
};

export default Navbar;
