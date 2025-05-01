import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ nombreProducto, descripcion, precio, categoria, urlImagen, estado }) => {
  return (
    <div className={`product-card ${estado ? '' : 'inactive'}`}>
      <img src={urlImagen} alt={nombreProducto} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{nombreProducto}</h3>
        <p className="product-description">{descripcion}</p>
        <p className="product-category">Categoría: {categoria}</p>
        <p className="product-price">Precio: ${precio.toFixed(2)}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  nombreProducto: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  categoria: PropTypes.string.isRequired,
  urlImagen: PropTypes.string.isRequired,
  estado: PropTypes.bool.isRequired,
};

export default ProductCard;
