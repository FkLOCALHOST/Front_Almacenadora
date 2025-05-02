import React from "react";
import { Link } from 'react-router-dom';
import './404.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>Error 404</h1>
      <p>No se pudo encontrar la página que buscas.</p>
      <Link to="/home" className="back-home-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;