import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FaSun, FaMoon } from "react-icons/fa";
import "./navBar.css";

const NavBar = ({ theme, toggleTheme }) => {
  const location = useLocation(); // Get current location
  const isLoginPage = location.pathname === "/auth/login"; // Check if on login page

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../logo.png" alt="Logo" /> {/* Corrected the path */}
      </div>
      <div className="navbar-right">
        {!isLoginPage && ( // Hide links if on login page
          <div className="navbar-links">
            <Link to="/trabajadores/obtenerTrabajadores">Trabajadores</Link>
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/bodega">Bodega</Link>
            <Link to="/productos/listarProductos">Producto</Link>
            <Link to="/clientes">Clientes</Link>
          </div>
        )}
        <div
          className="theme-toggle"
          onClick={toggleTheme}
          style={{ cursor: "pointer" }}
        >
          {theme === "light" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;