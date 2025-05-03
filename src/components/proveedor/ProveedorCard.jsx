import React from 'react';
import PropTypes from 'prop-types';

const ProveedorCard = ({ 
    id,
    nombre, 
    direccion, 
    telefono, 
    isAdmin,
    onEdit,
    onDelete,
  }) => {

  return (
    <div className="proveedor-card"> {/* Clase CSS fija */}
      <div className="proveedor-details">
        <h3 className="proveedor-title">{nombre}</h3>
        <p className="proveedor-description">Dirección: {direccion}</p>
        <p className="proveedor-telefono">Teléfono: {telefono}</p>
      </div>
      {isAdmin && (
        <div className="proveedor-actions">
          <button className="edit-proveedor-button" onClick={onEdit}>Editar</button>
          <button className="delete-proveedor-button" onClick={() => onDelete(id)}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

ProveedorCard.propTypes = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
  telefono: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProveedorCard;
