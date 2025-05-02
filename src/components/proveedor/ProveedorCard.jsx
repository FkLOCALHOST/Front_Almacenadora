import React from 'react';
import PropTypes from 'prop-types';

const ProveedorCard = ({ nombre, direccion, telefono, estado = true }) => {
  return (
    <div className={`proveedor-card${estado ? '' : ' proveedor-inactive'}`}>
      <div className="proveedor-details">
        <h3 className="proveedor-title">{nombre}</h3>
        <p className="proveedor-description">Dirección: {direccion}</p>
        <p className="proveedor-telefono">Teléfono: {telefono}</p>
      </div>
    </div>
  );
};

ProveedorCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  direccion: PropTypes.string.isRequired,
  telefono: PropTypes.number.isRequired,
  estado: PropTypes.bool,
};

export default ProveedorCard;
