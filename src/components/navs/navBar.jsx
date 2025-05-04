import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import "./navBar.css";

const NavBar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const trabajadorDetails = localStorage.getItem("Trabajador");
    if (trabajadorDetails) {
      const userDetails = JSON.parse(trabajadorDetails);
      if (userDetails && userDetails.userDetails) {
        const { role } = userDetails.userDetails;
        setIsAdmin(role === "ADMIN_ROLE");
      }
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../logo.png" alt="Logo" />
      </div>
      <div className="navbar-right">
        {!isLoginPage && (
          <div className="navbar-links">
            {isAdmin && (
              <Link to="/trabajadores/obtenerTrabajadores">Trabajadores</Link>
            )}
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/bodegas/listarBodegas">Bodega</Link>
            <Link to="/productos/listarProductos">Producto</Link>
            <Link to="/clientes/listarClientes">Clientes</Link>
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