import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ id, nombreProducto, descripcion, precio, categoria, urlImagen, estado, isAdmin, onEdit,  onDelete  }) => {
  return (
    <div className={`product-card ${estado ? '' : 'inactive'}`}>
      <img src={urlImagen} alt={nombreProducto} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{nombreProducto}</h3>
        <p className="product-description">{descripcion}</p>
        <p className="product-category">Categoría: {categoria}</p>
        <p className="product-price">Precio: ${precio}</p>
      </div>
      {isAdmin && (
                <div className="admin-actions">
                    <button className="edit-client-button" onClick={onEdit}>Editar</button>
                    <button className="delete-client-button" onClick={() => onDelete(id)}>Eliminar</button>
                </div>
            )}
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
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProductCard;
